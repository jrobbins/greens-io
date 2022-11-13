import flask
import logging

from api import basehandlers
from sim import arena
from sim import players

class PlayersAPI(basehandlers.APIHandler):

  def do_get(self, player_id=None):
    if player_id:
      p = players.get_player(player_id)
      return serialize_player(p)
    else:
      pl = players.get_all()
      return [serialize_player(p) for p in pl]

  def do_post(self, player_id=None):
    if player_id:
      flask.abort(400, 'client should not create player IDs')

    nick = self.get_param('nick', '').strip()
    if msg := validate_nick(nick):
      flask.abort(400, msg)
    
    p = players.Player(nick)
    players.enroll_player(p)
    arena.spawn_player(p)
    return serialize_player(p, include_token=True)


def serialize_player(p, include_token=False):
  if p is None:
    return None

  result = {
    'player_id': p.player_id,
    'nick': p.nick,
    'score': p.score,
    'skin': p.skin,
    }
  if include_token:
    result['token'] = p.token
  return result


def validate_nick(nick):
  if not nick:
    return 'empty nick'
  if len(nick) > 25:
    return 'nick too long'
  # TODO: regex
  # TODO: bad words
  # TODO: conflict
  return None

