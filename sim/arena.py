import logging
import dataclasses
from sim import utils
from sim import chapters


@dataclasses.dataclass
class TeamResources:
  hour: int = 0
  day: int = 0
  greens: int = 0

  # Tests box
  cases: int = 5
  test_files: int = 5
  test_suites: int = 0
  coverage_criteria: int = 10
  runs_per_hour: int = 0
  greens_per_hour: int = 0
  automation: int = 0

  # Product box
  functions: int = 6200
  source_files: int = 18
  source_trees: int = 0
  defects: int = 0

  # Team box
  peer_reviews: int = 0
  leadership_summit: int = 0
  outsourced_hr: int = 0

  # Machines box
  multi_processing: int = 0
  cycles: int = 1000
  cpus: int = 0
  servers: int = 0
  racks: int = 0
  data_centers: int = 0
  von_neumann_machine: int = 0

  # People box
  engineers: int = 0
  recruiters: int = 0
  managers: int = 0
  vps: int = 0
  senior_vps: int = 0
  productity: int = 1
  defect_rate: float = 0.1

  # Theory box
  languages: int = 0
  algorithms: int = 0
  paradigms: int = 0
  realities: int = 0


@dataclasses.dataclass
class PlayerSkills:
  tech_test_file: int = 0
  tech_source_file: int = 0

  test_runner: int = 0
  automation: int = 0
  tech_show_defects: int = 0

  learn_html: int = 0
  learn_css: int = 0
  learn_cpp: int = 0
  learn_java: int = 0
  learn_javascript: int = 0
  learn_appscript: int = 0
  learn_python: int = 0
  learn_c: int = 0
  learn_go: int = 0
  learn_typescript: int = 0
  learn_shell: int = 0
  learn_http: int = 0
  learn_php: int = 0
  learn_pascal: int = 0
  learn_perl: int = 0
  learn_lisp: int = 0
  learn_awk: int = 0
  learn_objective_c: int = 0
  learn_kotlin: int = 0
  learn_markdown: int = 0
  learn_fortran: int = 0
  learn_prolog: int = 0
  learn_ruby: int = 0
  learn_swift: int = 0
  learn_vhdl: int = 0
  learn_postscript: int = 0
  learn_forth: int = 0
  learn_rust: int = 0

  linear_search: int = 0
  recursion: int = 0
  binary_search: int = 0
  bubble_sort: int = 0
  hashing: int = 0
  shell_sort: int = 0
  pointers: int = 0
  shortest_path: int = 0
  bin_packing: int = 0
  dynamic_programming: int = 0

  waterfall_model: int = 0
  agile: int = 0  # ??
  risk_management: int = 0
  test_driven_development: int = 0
  promo_process: int = 0
  peer_reviews: int = 0
  leadership_summit: int = 0

  
  multi_processing: int = 0
  testing_lab: int = 0  
  cloud_computing: int = 0  
  warehouse_computing: int = 0  
  von_neumann_machine: int = 0


def make_initial_team_resources():
  # A dataclass of resource values
  return TeamResources()


def make_initial_player_skills():
  # A dataclass of skill values
  return PlayerSkills()


def make_initial_news():
  return [(1, ['snip', 'snap'])]


rz = make_initial_team_resources()
all_sz: dict[int, PlayerSkills] = {}
nz = make_initial_news()


def spawn_player(p):
  all_sz[p.player_id] = make_initial_player_skills()


def get_team_resources():
  return rz


def get_player_skills(player_id):
  return all_sz.get(player_id)


def get_news():
  return nz


def maybe_promote_to_manager():
  if (rz.engineers > 0 and rz.managers + 1 < 10 + rz.vps * 10 and
      rz.engineers > rz.managers * 6):
    rz.engineers -= 1
    rz.managers += 1
    rz.test_suites += 1


def maybe_promote_to_vp():
  if (rz.managers > 0 and rz.vps + 1 < 10 + rz.senior_vps * 10 and
      rz.managers > rz.vps * 6):
    rz.managers -= 1
    rz.vps += 1
    rz.source_trees += 1


def process_cmd(player_id, cmd):
  logging.info('process_cmd %r %r', player_id, cmd)
  if player_id not in all_sz:
    raise ValueError('unknown player %r' % player_id)
  sz = all_sz[player_id]

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

  if cmd == 'Hire engineer':
    rz.engineers = min(
      rz.engineers + 1,
      10 + rz.managers * 10)
    return

  if cmd == 'Hire recruiter':
    rz.recruiters = min(
      rz.recruiters + 1,
      max(2, rz.managers))
    return

  if cmd == 'Promote to manager':
    maybe_promote_to_manager()
    return
  
  if cmd == 'Promote to VP':
    maybe_promote_to_vp()
    return

  if cmd == 'Acquire small company':
    rz.vp += 1
    rz.managers += 10
    rz.engineers += 100

  if cmd == 'Acquire large company':
    rz.vp += 10
    rz.managers += 100
    rz.engineers += 1000

  if cmd == 'Add CPU':
    rz.cycles += 100
    rz.cpus += 1

  if cmd == 'Add server':
    rz.cycles += 1000
    rz.cpus += 10
    rz.servers += 1

  if cmd == 'Add rack':
    rz.cycles += 20000
    rz.cpus += 200
    rz.servers += 20

  if cmd == 'Build datacenter':
    rz.cycles += 20000 * 2000
    rz.cpus += 200 * 2000
    rz.servers += 20 * 2000
    rz.datacenters += 1

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
  


