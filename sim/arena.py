import logging
import collections
import random


def make_initial_resources():
  # A dict of resource name to value
  return {
    'greens_ever': 123456789,
    'greens': 9999,
    'hours': 888,
  }

def make_initial_techs():
  return {
    'languages': ['C++'],
  }

def make_initial_snippets():
  return [(1, ['snip', 'snap'])]


rz = make_initial_resources()
tz = make_initial_techs()
sz = make_initial_snippets()


def get_resources():
  return rz


def get_techs():
  return tz


def get_snippets():
  return sz


def get_available_upgrades():
  avail = ['learn java']
  return avail





def process_orders(player_id, orders):
  logging.info('process_orders %r %r', player_id, orders)

