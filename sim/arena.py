import logging
import collections
import dataclasses


@dataclasses.dataclass
class Resources:
  day: int = 0
  greens: int = 0

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
  cycles: int = 1000

  # People box
  engineers: int = 0
  recruiters: int = 0
  productity: float = 1.0
  defect_rate: float = 0.1

  # Theory box
  languages: int = 0

  # Techs
  tech_test_file: int = 0
  tech_source_file: int = 0
  learn_html: int = 0
  learn_css: int = 0
  learn_cron: int = 0
  tech_show_defects: int = 0
  learn_cpp: int = 0
  learn_java: int = 0
  learn_javascript: int = 0

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


def process_orders(player_id, orders):
  logging.info('process_orders %r %r', player_id, orders)
  # TODO: limit to one order per person per second.

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

  if (orders == 'Learn HTML' and
      not rz.learn_html and
      rz.greens > 10):
    rz.learn_html = 1
    rz.greens -= 10
    return

  if (orders == 'Learn CSS' and
      not rz.learn_css and
      rz.greens > 10):
    rz.learn_css = 1
    rz.greens -= 10
    return

  if (orders == 'Learn JavaScript' and
      not rz.learn_javascript and
      rz.greens > 10):
    rz.languages += 1
    rz.learn_javascript = 1
    rz.greens -= 10
    return

  if (orders == 'Learn cron' and
      not rz.learn_cron and
      rz.greens > 300):
    rz.languages += 1
    rz.learn_cron = 1
    rz.greens -= 300
    return

  if (orders == 'Learn Java' and
      not rz.learn_java and
      rz.greens > 10):
    rz.languages += 1
    rz.learn_java = 1
    rz.greens -= 10
    return


