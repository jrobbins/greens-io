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
  automation: int = 0
  tech_show_defects: int = 0
  learn_cpp: int = 0
  learn_java: int = 0
  learn_javascript: int = 0
  learn_appscript: int = 0
  learn_python: int = 0

  linear_search: int = 0
  recursion: int = 0
  binary_search: int = 0
  bubble_sort: int = 0
  hashing: int = 0


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


def process_cmd(player_id, cmd):
  logging.info('process_cmd %r %r', player_id, cmd)

  if cmd == 'Poke around':
    rz.greens += 1
    return

  if cmd == 'Run tests':
    rz.greens += rz.cases
    return

  if cmd == 'Create test case':
    rz.cases += 1
    return

  if (cmd == 'Create test file' and
      rz.languages):
    rz.cases += 10
    rz.test_files += 1
    return

  if cmd == 'Create function':
    rz.functions += 1
    return

  if (cmd == 'Create source file' and
      rz.languages):
    rz.functions += 10
    rz.source_files += 1
    return

  if cmd in chapters.ALL_UPGRADES:
    up = chapters.ALL_UPGRADES[cmd]
    snake = utils.to_snake_case(cmd)
    combined_resources = dataclasses.asdict(sz)
    combined_resources.update(dataclasses.asdict(rz))
    already_know = combined_resources.get(snake)
    can_afford = rz.greens >= up.cost
    satisfied = (not up.prereq or
                 combined_resources.get(up.prereq))
    if not already_know and can_afford and satisfied:
      setattr(sz, snake, 1)
      rz.greens -= up.cost
      if up.incr:
        setattr(rz, up.incr, getattr(rz, up.incr) + 1)
  


