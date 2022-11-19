import logging
import math
import time

from sim import story
from sim import players
from sim import arena
rz = arena.rz
nz = arena.nz
from sim import utils


task_queue = []  # A list of pairs (callback, args)


# If we have not heard from a player in 200 seconds, forget them.
PLAYER_TIMEOUT = 200



def do_automation():
  if rz.day >= rz.maxdays:
    rz.day = rz.maxdays
    return

  new_cases = int(rz.engineers * rz.productity)
  new_functions = int(rz.engineers * rz.productity / 10)

  new_defects = int((new_cases + new_functions) * rz.defect_rate)
  # rz.defects += new_defects
  max_cases = rz.functions * rz.coverage_criteria
  rz.cases = min(rz.cases + new_cases, max_cases)
  rz.functions += new_functions

  rz.engineers = min(rz.engineers + rz.recruiters,
                     10 + rz.managers * 10)
  if rz.peer_reviews:
    arena.maybe_promote_to_manager()
  if rz.leadership_summit:
    arena.maybe_promote_to_vp()

  if rz.outsourced_hr and rz.recruiters:
    if rz.hour == 0:
      rz.recruiters += 1

  if rz.automation:
    rz.greens += rz.greens_per_hour
    rz.runs_per_hour = min(rz.cases, rz.cycles)
    rz.greens_per_hour = max(0, rz.runs_per_hour - rz.defects)

  rz.hour += 1
  if rz.hour >= 8:
    rz.day = utils.next_weekday(rz.day)
    rz.hour = 0
    rz.test_files += rz.engineers // 10
    rz.use_cases += rz.engineers // 100

  if rz.day >= rz.maxdays:
    rz.day = rz.maxdays
    if not rz.final_email:
      arena.add_news(
        nz, rz.day, story.make_final_email())
      rz.final_email = 1

  new_chapter = min(
    int(math.log10(rz.greens or 1) / 2),
    len(story.CHAPTERS) - 1)
  if new_chapter > rz.chapter:
    rz.chapter = new_chapter
    if new_chapter in story.ALL_EMAILS:
      arena.add_news(
        nz, rz.day, story.ALL_EMAILS[new_chapter])


def process_next_task():
  try:
    callback, args = task_queue.pop(0)
    callback(*args)
  except IndexError:
    pass



STEP_DURATION_SECS = (20 * 60) / (8 * 5 * 52)
last_time = 0

def maybe_generate_tasks(now=None):
  global last_time
  now = now or time.time()
  if now > last_time + STEP_DURATION_SECS:
    logging.info('Left over tasks: %d', len(task_queue))
    while len(task_queue) > 0:
      process_next_task()
    task_queue.append((do_automation, tuple()))
    remove_expired()
    last_time += STEP_DURATION_SECS
    if last_time + STEP_DURATION_SECS < now:
      last_time = now


def do_tasks():
  # process_next_task()
  # process_next_task()
  maybe_generate_tasks()


def remove_expired():
  min_last_contact = int(time.time()) - PLAYER_TIMEOUT
  for player_id in list(players.roster):
    if players.roster[player_id].last_contact < min_last_contact:
      logging.info('Goodbye ' + players.roster[player_id].nick)
      players.unenroll_player(player_id)

