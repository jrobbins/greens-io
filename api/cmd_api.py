import flask
import logging

from api import basehandlers
from sim import arena
from sim import commands
from sim import tasks


class CommandAPI(basehandlers.APIHandler):

  def do_post(self, arena_id=None, player_id=None):
    a = arena.get_arena(arena_id)
    if not a:
      flask.abort(404, 'no such arena')
    
    token = self.get_param('token')
    if not player_id in a.roster:
      flask.abort(404, 'Player not found')
    if not a.authenticate(player_id, token):
      flask.abort(403, 'Secret does not match')
    a.record_contact(player_id)

    cmd = self.get_param('cmd')
    # TODO: arguments
    
    commands.process_cmd(a, player_id, cmd)
    tasks.do_tasks(a)
    return {'message': 'OK'}

