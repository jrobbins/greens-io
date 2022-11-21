import logging
import math
import time

from sim import story
from sim import arena
from sim import utils


# If we have not heard from a player in 200 seconds, forget them.
PLAYER_TIMEOUT = 20



def do_automation(a):
  rz = a.resources
  if rz.day >= rz.maxdays:
    rz.day = rz.maxdays
    return

  new_cases = int(rz.engineers * rz.productivity)
  new_features = int(rz.engineers * rz.productivity / 10)
  if rz.tech_leads:
    new_features += rz.managers

  new_defects = int((new_cases + new_features) * rz.defect_rate)
  # rz.defects += new_defects
  max_cases_coverage = (10 if not rz.coverage_criteria
                        else rz.features * rz.coverage_criteria)
  max_cases_files = rz.test_files * 100
  rz.max_features = rz.use_cases * (rz.languages or 1) * (rz.algorithms or 1)
  rz.max_cases = min(max_cases_coverage, max_cases_files)
  rz.cases = min(rz.cases + new_cases, rz.max_cases)
  rz.test_coverage = rz.cases

  if (rz.prioritization and
      rz.cases + new_cases > rz.max_cases):
    new_features += (rz.cases + new_cases - rz.max_cases)
  
  rz.features = min(rz.features + new_features, rz.max_features)
  rz.feature_completeness = rz.features

  rz.engineers = min(rz.engineers + rz.recruiters,
                     10 + rz.managers * 10)
  if rz.peer_reviews:
    a.maybe_promote_to_manager()
  if rz.leadership_summit:
    a.maybe_promote_to_vp()

  if rz.outsourced_hr and rz.recruiters:
    if rz.hour == 0:
      rz.recruiters += 1

  if rz.automation:
    rz.greens += rz.greens_per_hour
    rz.runs_per_hour = min(rz.cases, rz.cycles)
    rz.greens_per_hour = max(0, rz.runs_per_hour - rz.defects)

  rz.cpus += rz.ops_bots
  rz.servers += rz.ops_bots // 10
  if rz.self_replicating_bots:
    rz.ops_bots = int(rz.ops_bots * 1.05)

  rz.hour += 1
  if rz.hour >= 8:
    rz.day = utils.next_weekday(rz.day)
    rz.hour = 0
    rz.test_files += rz.engineers // 10
    rz.use_cases += rz.engineers // 100

  if rz.day >= rz.maxdays:
    rz.day = rz.maxdays
    if not rz.final_email:
      a.add_news(
        rz.day, story.make_final_email())
      rz.final_email = 1

  new_chapter = min(
    int(math.log10(rz.greens or 1) / 2),
    len(story.CHAPTERS) - 1)
  if new_chapter > rz.chapter:
    rz.chapter = new_chapter
    if new_chapter in story.ALL_EMAILS:
      a.add_news(
        rz.day, story.ALL_EMAILS[new_chapter])


def process_next_task(a):
  try:
    callback, args = a.task_queue.pop(0)
    callback(*args)
  except IndexError:
    pass



STEP_DURATION_SECS = (20 * 60) / (8 * 5 * 52)

def maybe_generate_tasks(a, now=None):
  now = now or time.time()
  if now > a.last_time + STEP_DURATION_SECS:
    logging.info('Left over tasks: %d', len(a.task_queue))
    while len(a.task_queue) > 0:
      process_next_task(a)
    a.task_queue.append((do_automation, tuple([a])))
    remove_expired(a)
    a.last_time += STEP_DURATION_SECS
    if a.last_time + STEP_DURATION_SECS < now:
      a.last_time = now


def do_tasks(a):
  # process_next_task(a)
  # process_next_task(a)
  maybe_generate_tasks(a)


def remove_expired(a):
  min_last_contact = int(time.time()) - PLAYER_TIMEOUT
  for player_id in a.roster:
    if a.roster[player_id].last_contact < min_last_contact:
      logging.info('Goodbye ' + a.roster[player_id].nick)
      a.unenroll_player(player_id)

