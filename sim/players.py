import logging
import secrets
import time


SKINS = [
  'red', 'blue', 'green', 'gold', 'orange', 'navy', 'brown',
  'pink', 'purple', 'gray', 'magenta', 'teal']


# This is the most that can be on this server.
MAX_PLAYERS = 10



roster = {}
next_player_id = 1000
next_skin = 0


class Player:
  
  def __init__(self, nick, now=None):
    global next_player_id
    global next_skin
    
    self.player_id = next_player_id
    next_player_id += 1
    self.nick = nick
    self.skin = SKINS[next_skin]
    next_skin = (next_skin + 1) % len(SKINS)
    self.token = secrets.token_urlsafe(16)
    self.score = 0
    self.last_contact = now or time.time()
  


def enroll_player(p):
  roster[p.player_id] = p


def unenroll_player(player_id):
  del roster[player_id]


def record_contact(player_id):
  if player_id in roster:
    logging.info('Record_Contact %r %r', player_id, int(time.time()))
    roster[player_id].last_contact = int(time.time())


def get_player(player_id):
  return roster.get(player_id)


def authenticate(player_id, token):
  player = get_player(player_id)
  return player.token == token


def get_all():
  return roster.values()
