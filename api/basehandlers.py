import json
import logging

import flask
import flask.views

import settings


# Our API responses are prefixed with this ro prevent attacks that
# exploit <script src="...">.
XSSI_PREFIX = ")]}'\n"


class APIHandler(flask.views.MethodView):

  @property
  def request(self):
    return flask.request

  def abort(self, status, msg=None, **kwargs):
    """Support webapp2-style, e.g., self.abort(400)."""
    if msg:
      if status == 500:
        logging.error('ISE: %s' % msg)
      else:
        logging.info('Abort %r: %s' % (status, msg))
      flask.abort(status, description=msg, **kwargs)
    else:
      flask.abort(status, **kwargs)

  def redirect(self, url):
    """Support webapp2-style, e.g., return self.redirect(url)."""
    return flask.redirect(url)

  def get_param(
      self, name, default=None, required=True, validator=None, allowed=None):
    """Get the specified JSON parameter."""
    json_body = self.request.get_json(force=True, silent=True) or {}
    val = json_body.get(name, default)
    if required and val is None:
      self.abort(400, msg='Missing parameter %r' % name)
    if val and validator and not validator(val):
      self.abort(400, msg='Invalid value for parameter %r' % name)
    if val and allowed and val not in allowed:
      self.abort(400, msg='Unexpected value for parameter %r' % name)
    return val

  def get_int_param(
      self, name, default=None, required=True, validator=None, allowed=None):
    """Get the specified integer JSON parameter."""
    val = self.get_param(
        name, default=default, required=required, validator=validator,
        allowed=allowed)
    if val and type(val) != int:
      self.abort(400, msg='Parameter %r was not an int' % name)
    return val

  def get_bool_param(self, name, default=False, required=False):
    """Get the specified boolean JSON parameter."""
    val = self.get_param(name, default=default, required=required)
    if type(val) != bool:
      self.abort(400, msg='Parameter %r was not a bool' % name)
    return val

  def get_headers(self):
    """Add CORS and Chrome Frame to all responses."""
    headers = {
        'Strict-Transport-Security':
            'max-age=63072000; includeSubDomains; preload',
        'X-UA-Compatible': 'IE=Edge,chrome=1',
        }
    return headers

  def defensive_jsonify(self, handler_data):
    """Return a Flask Response object with a JSON string prefixed with junk."""
    body = json.dumps(handler_data)
    return flask.current_app.response_class(
        XSSI_PREFIX + body,
        mimetype=flask.current_app.config['JSONIFY_MIMETYPE'])

  def get(self, *args, **kwargs):
    """Handle an incoming HTTP GET request."""
    logging.info('GET %r', flask.request.full_path)
    headers = self.get_headers()
    handler_data = self.do_get(*args, **kwargs)
    return self.defensive_jsonify(handler_data), headers

  def post(self, *args, **kwargs):
    """Handle an incoming HTTP POST request."""
    logging.info('POST %r', flask.request.full_path)
    json_body = self.request.get_json(force=True, silent=True) or {}
    logging.info('POST data is:')
    for k, v in json_body.items():
      logging.info('%r: %s', k, repr(v)[:settings.MAX_LOG_LINE])

    headers = self.get_headers()
    handler_data = self.do_post(*args, **kwargs)
    return self.defensive_jsonify(handler_data), headers
  
  def _get_valid_methods(self):
    """For 405 responses, list methods the concrete handler implements."""
    valid_methods = ['GET']
    if self.do_post.__code__ is not APIHandler.do_post.__code__:
      valid_methods.append('POST')
    if self.do_patch.__code__ is not APIHandler.do_patch.__code__:
      valid_methods.append('PATCH')
    if self.do_delete.__code__ is not APIHandler.do_delete.__code__:
      valid_methods.append('DELETE')
    return valid_methods

  def do_get(self, **kwargs):
    """Subclasses should implement this method to handle a GET request."""
    # Every API handler must handle GET.
    raise NotImplementedError()


def FlaskApplication(import_name, routes, pattern_base=''):
  """Make a Flask app and add routes and handlers that work like webapp2."""
  app = flask.Flask(import_name)

  for i, rule in enumerate(routes):
    pattern = rule[0]
    handler_class = rule[1]
    defaults = rule[2] if len(rule) > 2 else None
    classname = handler_class.__name__
    app.add_url_rule(
        pattern_base + pattern,
        endpoint=classname + str(i),  # We don't use it, but it must be unique.
        view_func=handler_class.as_view(classname),
        defaults=defaults)

  return app
