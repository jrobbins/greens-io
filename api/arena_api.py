import logging
import dataclasses

from api import basehandlers
from sim import arena
from sim import tasks


class ArenaAPI(basehandlers.APIHandler):

  def do_get(self, arena_id, player_id):
    a = arena.get_arena(arena_id)
    if not a:
      flask.abort(404, 'no such arena')
    a.record_contact(player_id)
    tasks.do_tasks(a)
    p = a.get_player(player_id)
    combined_resources = dataclasses.asdict(a.resources)
    skills_dict = dataclasses.asdict(p.skills) if p else {}
    for skill, value in skills_dict.items():
      if (skill not in combined_resources or
          value > combined_resources[skill]):
        combined_resources[skill] = value
    news = a.get_recent_news()
    return {
      'resources': combined_resources,
      'news': news,
    }

  def do_post(self):
    arena_name = self.get_param('arena')
    arena_id = arena.create_arena(arena_name)
    return {
      'arena_id': arena_id,
    }

