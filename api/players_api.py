import flask
import logging

from api import basehandlers
from sim import arena


class PlayersAPI(basehandlers.APIHandler):

  def do_get(self, arena_id=None, player_id=None):
    a = arena.get_arena(arena_id)
    if not a:
      flask.abort(404, 'no such arena')
    if player_id:
      p = a.get_player(player_id)
      return serialize_player(p)
    else:
      pl = a.get_all_players()
      return [serialize_player(p) for p in pl]

  def do_post(self, arena_id=None, player_id=None):
    a = arena.get_arena(arena_id)
    if not a:
      flask.abort(404, 'no such arena')
    if player_id:
      flask.abort(400, 'client should not create player IDs')

    nick = self.get_param('nick', '').strip()
    if msg := validate_nick(nick):
      flask.abort(400, msg)
    
    p = a.enroll_player(nick)
    return serialize_player(p, include_token=True)


def serialize_player(p, include_token=False):
  if p is None:
    return None

  result = {
    'player_id': p.player_id,
    'nick': p.nick,
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

