import flask
import logging

from api import basehandlers
from sim import arena
from sim import players
from sim import tasks

class CommandAPI(basehandlers.APIHandler):

  def do_post(self, player_id=None):
    token = self.get_param('token')
    if not player_id in players.roster:
      flask.abort(404, 'Player not found')
    if not players.authenticate(player_id, token):
      flask.abort(403, 'Secret does not match')
    players.record_contact(player_id)

    cmd = self.get_param('cmd')
    # TODO: arguments
    
    arena.process_cmd(player_id, cmd)
    tasks.do_tasks()
    return {'message': 'OK'}

