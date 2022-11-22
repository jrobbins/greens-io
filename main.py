import logging
import flask

import settings
from api import basehandlers
from api import arena_api
from api import cmd_api
from api import players_api
from api import story_api


api_routes = [
    ('/story', story_api.StoryAPI),
    ('/players/<int:arena_id>', players_api.PlayersAPI),
    ('/players/<int:arena_id>/<string:player_id>',
     players_api.PlayersAPI),
    ('/cmds/<int:arena_id>/<int:player_id>', cmd_api.CommandAPI),
    ('/arenas', arena_api.ArenaAPI),
    ('/arenas/<int:arena_id>/<int:player_id>', arena_api.ArenaAPI),
    ]

app = basehandlers.FlaskApplication(
    __name__, api_routes, '/api/v0')


page_views = 0

@app.route("/hello")
def hello_world():
    global page_views
    page_views += 1
    return "<p>Hello, World!</p>  page_views is %d" % page_views


@app.route('/node_modules/<path:filename>')
def node_modules(filename):
    logging.info('request for node_modules %r' % filename)
    return flask.send_from_directory(
        app.root_path + '/node_modules/', filename)


@app.route('/', defaults={'path': ''})
@app.route("/<string:path>") 
@app.route('/<path:path>')
def spa_pages(path):
    logging.info('serving spa page: %r', path)
    return app.send_static_file("index.html")
