import logging
from api import basehandlers
from sim import arena
from sim import players
from sim import tasks


class ArenaAPI(basehandlers.APIHandler):

  def do_get(self, player_id):
    players.record_contact(player_id)
    tasks.do_tasks()
    resources = arena.get_resources()
    techs = arena.get_techs()
    snippets = arena.get_snippets()
    upgrades = arena.get_available_upgrades()
    return {
      'resources': resources.asdict(),
      'techs': techs,
      'snippets': snippets,
      'upgrades': upgrades,
    }

