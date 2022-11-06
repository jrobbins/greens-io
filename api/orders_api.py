import flask
import logging

from api import basehandlers
from sim import arena
from sim import players
from sim import tasks

class OrdersAPI(basehandlers.APIHandler):

  def do_post(self, player_id=None):
    token = self.get_param('token')
    if not player_id in players.roster:
      flask.abort(404, 'Player not found')
    if not players.authenticate(player_id, token):
      flask.abort(403, 'Secret does not match')
    players.record_contact(player_id)

    orders = self.get_param('orders')
    # TODO: arguments
    # Note there is no security or orders.

    
    arena.process_orders(orders)
    tasks.do_tasks()
    return {'message': 'OK'}

