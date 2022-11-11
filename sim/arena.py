import logging
import dataclasses
from sim import utils
from sim import chapters


@dataclasses.dataclass
class TeamResources:
  day: int = 0
  greens: int = 0

  # Tests box
  cases: int = 0
  test_files: int = 0
  coverage_criteria: int = 10
  runs_per_hour: int = 0
  greens_per_hour: int = 0
  automation: int = 0

  # Product box
  functions: int = 1200
  source_files: int = 95
  defects: int = 0

  # Machines box
  cycles: int = 1000

  # People box
  engineers: int = 0
  recruiters: int = 0
  productity: float = 1.0
  defect_rate: float = 0.1

  # Theory box
  languages: int = 0


@dataclasses.dataclass
class PlayerSkills:
  tech_test_file: int = 0
  tech_source_file: int = 0
  learn_html: int = 0
  learn_css: int = 0
  learn_cron: int = 0
  tech_show_defects: int = 0
  learn_cpp: int = 0
  learn_java: int = 0
  learn_javascript: int = 0


def make_initial_team_resources():
  # A dataclass of resource values
  return TeamResources()


def make_initial_player_skills():
  # A dataclass of skill values
  return PlayerSkills()


def make_initial_news():
  return [(1, ['snip', 'snap'])]


rz = make_initial_team_resources()
sz = make_initial_player_skills()  # TODO: per player
nz = make_initial_news()


def get_team_resources():
  return rz


def get_player_skills():
  return sz


def get_news():
  return nz


xxUPGRADES = {
  # order_name:       (prereq, cost, incr)
  'Learn HTML':       (None,     10, None),
  'Learn CSS':        (None,     10, None),
  'Learn JavaScript': (None,     10, 'languages'),
  'Learn Java':       (None,     10, 'languages'),
  'Learn cron':       (None,    300, 'automation'),
  }

def process_orders(player_id, orders):
  logging.info('process_orders %r %r', player_id, orders)

  if orders == 'Poke around':
    rz.greens += 1
    return

  if orders == 'Run tests':
    rz.greens += rz.cases
    return

  if orders == 'Create test case':
    rz.cases += 1
    return

  if (orders == 'Create test file' and
      rz.languages):
    rz.cases += 10
    rz.test_files += 1
    return

  if orders == 'Create function':
    rz.functions += 1
    return

  if (orders == 'Create source file' and
      rz.languages):
    rz.functions += 10
    rz.source_files += 1
    return

  if orders in chapters.ALL_UPGRADES:
    up = chapters.ALL_UPGRADES[orders]
    snake = utils.to_snake_case(orders)
    if (not getattr(sz, snake) and
        rz.greens >= up.cost and
        (not up.prereq or getattr(sz, up.prereq) or
         getattr(rz. up.prereq))):
      setattr(sz, snake, 1)
      rz.greens -= up.cost
      if up.incr:
        setattr(rz, up.incr, getattr(rz, up.incr) + 1)
  


