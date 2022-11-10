import logging
import collections
import dataclasses


@dataclasses.dataclass
class Resources:
  day: int = 0
  greens: int = 100000

  # Tests box
  cases: int = 200
  coverage_criteria: int = 10
  runs_per_hour: int = 9999
  greens_per_hour: int = 9999
  run_tests: str = 'continuously'

  # Product box
  functions: int = 1200
  source_files: int = 95
  defects: int = 0

  # People box
  engineers: int = 1
  recruiters: int = 0
  productity: float = 1.0
  defect_rate: float = 0.1

  # Techs
  write_code: int = 0
  show_defects: int = 0
  lang_cpp: int = 0

  def asdict(self):
    return dataclasses.asdict(self)


def make_initial_resources():
  # A dict of resource name to value
  return Resources()


def make_initial_snippets():
  return [(1, ['snip', 'snap'])]


rz = make_initial_resources()
sz = make_initial_snippets()


def get_resources():
  return rz


def get_snippets():
  return sz


def get_available_upgrades():
  avail = ['learn java']
  return avail





def process_orders(player_id, orders):
  logging.info('process_orders %r %r', player_id, orders)

