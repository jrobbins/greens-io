import logging
import dataclasses
import secrets
import time
from typing import Any

from sim import story
from sim import utils


@dataclasses.dataclass
class TeamResources:
  hour: int = 0
  day: int = 1
  maxdays: int = 365
  greens: int = 0
  chapter: int = -1  # zero-based
  final_email: int = 0

  # Tests box
  cases: int = 5
  test_coverage: int = 5  # always == cases
  max_cases: int = 50
  test_files: int = 5
  test_suites: int = 0
  coverage_criteria: int = 0
  runs_per_hour: int = 0
  greens_per_hour: int = 0
  automation: int = 0

  # Product box
  tech_stack: int = 0
  features: int = 20
  feature_completeness: int = 20  # always == features
  max_features: int = 20
  use_cases: int = 20
  user_journeys: int = 1
  products: int = 1
  categories: int = 1
  defects: int = 0

  # Team box
  peer_reviews: int = 0
  leadership_summit: int = 0
  outsourced_hr: int = 0
  prioritization: int = 0

  # Machines box
  multi_processing: int = 0
  cycles: int = 1000
  cpus: int = 0
  servers: int = 0
  clusters: int = 0
  data_centers: int = 0
  ops_bots: int = 0
  self_replicating_bots: int = 0

  # Team box
  engineers: int = 0
  recruiters: int = 0
  managers: int = 0
  vps: int = 0
  senior_vps: int = 0
  tech_leads: int = 0
  productivity: int = 1
  defect_rate: float = 0.1

  # Theory box
  languages: int = 0
  algorithms: int = 0
  paradigms: int = 0
  realities: int = 0


@dataclasses.dataclass
class PlayerSkills:
  test_runner: int = 0
  automation: int = 0

  ides: int = 0
  version_control: int = 0
  style_guide: int = 0
  lint: int = 0
  recruiting: int = 0
  feature_coverage: int = 0
  statement_coverage: int = 0
  branch_coverage: int = 0
  condition_coverage: int = 0
  boundary_conditions: int = 0
  fuzzing: int = 0
  path_coverage: int = 0

  spec_writing: int = 0
  use_case_workshop: int = 0
  user_journey_workshop: int = 0
  product_workshop: int = 0
  category_workshop: int = 0

  recruiting: int = 0
  tech_leads: int = 0
  prioritization: int = 0
  synergy: int = 0
  deal_making: int = 0

  learn_html: int = 0
  learn_css: int = 0
  learn_cpp: int = 0
  learn_java: int = 0
  learn_javascript: int = 0
  learn_basic: int = 0
  learn_python: int = 0
  learn_c: int = 0
  learn_go: int = 0
  learn_typescript: int = 0
  learn_shell: int = 0
  learn_forth: int = 0
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
  bubble_sort: int = 0
  insertion_sort: int = 0
  shell_sort: int = 0
  recursion: int = 0
  binary_search: int = 0
  hashing: int = 0
  quicksort: int = 0
  parsing: int = 0
  shortest_path: int = 0
  bin_packing: int = 0
  breadth_first_search: int = 0
  min_max_search: int = 0
  a_star_search: int = 0

  waterfall_model: int = 0
  agile: int = 0
  risk_management: int = 0
  test_driven_development: int = 0
  promo_process: int = 0
  peer_reviews: int = 0
  leadership_summit: int = 0

  
  multi_processing: int = 0
  testing_lab: int = 0  
  cloud_computing: int = 0  
  warehouse_computing: int = 0  
  ops_bots: int = 0
  self_replicating_bots: int = 0



next_player_id = 1000


class Player:
  
  def __init__(self, nick, now=None):
    global next_player_id
    
    self.player_id = next_player_id
    next_player_id += 1
    self.nick = nick
    self.token = secrets.token_urlsafe(16)
    self.skills = PlayerSkills()
    self.last_contact = now or time.time()
  


@dataclasses.dataclass
class Arena:
  team_name: str
  last_time: int = 0
  resources: TeamResources = None
  news: list[dict[int, list[Any]]] = None
  roster: dict[int, Player] = None
  task_queue: list[Any] = None

  def __init__(self, team_name):
    self.team_name = team_name
    day = utils.next_weekday(0)
    self.resources = TeamResources(day=day)
    self.news = []
    self.roster = {}
    self.task_queue = []

  def enroll_player(self, nick):
    p = Player(nick)
    self.roster[p.player_id] = p
    self.add_news(self.resources.day, nick + ' has joined the game.')
    return p

  def get_player(self, player_id):
    return self.roster.get(player_id)

  def unenroll_player(self, player_id):
    if player_id in self.roster:
      self.add_news(
        self.resources.day,
        self.roster[player_id].nick + ' has left the game.')
      del self.roster[player_id]

  def record_contact(self, player_id):
    if player_id in self.roster:
      logging.info('Record_Contact %r %r', player_id, int(time.time()))
      self.roster[player_id].last_contact = int(time.time())
      
  def authenticate(self, player_id, token):
    p = self.get_player(player_id)
    return p.token == token

  def get_all_players(self):
    return self.roster.values()

  def add_news(self, day, item):
    if self.news == [] or self.news[-1][0] != day:
      self.news.append((day, [item]))
    else:
      self.news[-1][1].append(item)

  def get_recent_news(self):
    return self.news[-2:]

  def maybe_promote_to_manager(self):
    rz = self.resources
    if (rz.engineers > 0 and rz.managers + 1 < 10 + rz.vps * 10 and
        rz.engineers > rz.managers * 6):
      rz.engineers -= 1
      rz.managers += 1
      rz.test_suites += 1
      rz.features += 100
      rz.use_cases += 10
      rz.user_journeys += 1

  def maybe_promote_to_vp(self):
    rz = self.resources
    if (rz.managers > 0 and rz.vps + 1 < 10 + rz.senior_vps * 10 and
        rz.managers > rz.vps * 6):
      rz.managers -= 1
      rz.vps += 1
      rz.features += 1000
      rz.use_cases += 100
      rz.user_journeys += 10
      rz.products += 1



main_arena = Arena('My team')
main_arena_id = 'My team'
multiverse = {
  main_arena_id: main_arena,
}


def get_arena(arena_id):
  return multiverse.get(arena_id)


