import logging
import dataclasses

from api import basehandlers
from sim import chapters


class ChaptersAPI(basehandlers.APIHandler):

  def do_get(self):
    chapters_list = [
      dataclasses.asdict(chap)
      for chap in chapters.CHAPTERS]
    return {
      'chapters': chapters_list,
    }

