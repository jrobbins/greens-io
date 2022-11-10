import logging
import collections
import dataclasses


@dataclasses.dataclass
class Resources:
  day: int = 0
  greens: int = 0
  unspent_greens: int = 0

  # Tests box
  cases: int = 0
  test_files: int = 0
  coverage_criteria: int = 10
  runs_per_hour: int = 0
  greens_per_hour: int = 0

  # Product box
  functions: int = 1200
  source_files: int = 95
  defects: int = 0

  # Machines box
  cycles: int = 0

  # People box
  engineers: int = 0
  recruiters: int = 0
  productity: float = 1.0
  defect_rate: float = 0.1

  # Theory box
  languages: int = 1

  # Techs
  tech_write_code: int = 0
  tech_test_file: int = 0
  tech_source_file: int = 0
  tech_cron: int = 0
  tech_show_defects: int = 0
  tech_cpp: int = 0
  tech_java: int = 0

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
  avail = ['Learn java']
  return avail


def process_orders(player_id, orders):
  logging.info('process_orders %r %r', player_id, orders)
  # TODO: limit to one order per person per second.

  if orders == 'Poke around':
    rz.greens += 1
    rz.unspent_greens += 1
    return

  if orders == 'Run tests':
    rz.greens += rz.cases
    rz.unspent_greens += rz.cases
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

  if (orders == 'Learn java' and
      not rz.tech_java):
    rz.languages += 1
    rz.tech_java = 1
    return


