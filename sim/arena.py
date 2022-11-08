import logging
import collections
import dataclasses


@dataclasses.dataclass
class Resources:
  greens: int = 100000
  cases: int = 200
  functions: int = 1200
  coverage_criteria: int = 10
  runs_per_hour: int = 9999
  greens_per_hour: int = 9999
  run_tests: str = 'continuously'
  day: int = 0
  defects: int = 0
  engineers: int = 1
  recruiters: int = 0
  productity: float = 1.0
  defect_rate: float = 0.1

  def asdict(self):
    return dataclasses.asdict(self)


def make_initial_resources():
  # A dict of resource name to value
  return Resources()


def make_initial_techs():
  return {
    'languages': ['C++'],
  }

def make_initial_snippets():
  return [(1, ['snip', 'snap'])]


rz = make_initial_resources()
tz = make_initial_techs()
sz = make_initial_snippets()


def get_resources():
  return rz


def get_techs():
  return tz


def get_snippets():
  return sz


def get_available_upgrades():
  avail = ['learn java']
  return avail





def process_orders(player_id, orders):
  logging.info('process_orders %r %r', player_id, orders)

