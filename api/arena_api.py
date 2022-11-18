import logging
import dataclasses

from api import basehandlers
from sim import arena
from sim import players
from sim import tasks


class ArenaAPI(basehandlers.APIHandler):

  def do_get(self, player_id):
    players.record_contact(player_id)
    tasks.do_tasks()
    team_resources = arena.get_team_resources()
    player_skills = arena.get_player_skills(player_id)
    combined_resources = dataclasses.asdict(team_resources)
    combined_resources.update(dataclasses.asdict(player_skills))
    news = arena.get_recent_news()
    return {
      'resources': combined_resources,
      'news': news,
    }

