import logging
import dataclasses

from api import basehandlers
from sim import story


class StoryAPI(basehandlers.APIHandler):

  def do_get(self):
    chapters_list = [
      dataclasses.asdict(chap)
      for chap in story.CHAPTERS]
    return {
      'chapters': chapters_list,
    }

