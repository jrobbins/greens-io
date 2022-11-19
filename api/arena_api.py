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
    skills_dict = dataclasses.asdict(player_skills) if player_skills else {}
    for skill, value in skills_dict.items():
      if (skill not in combined_resources or
          value > combined_resources[skill]):
        combined_resources[skill] = value
    news = arena.get_recent_news()
    return {
      'resources': combined_resources,
      'news': news,
    }

