import logging
import dataclasses
from sim import arena
from sim import story
from sim import utils


def process_cmd(a, player_id, cmd):
  rz = a.resources
  logging.info('process_cmd %r %r', player_id, cmd)
  if player_id not in a.roster:
    raise ValueError('unknown player %r' % player_id)
  p = a.roster[player_id]
  sz = p.skills

  if cmd == 'Poke around':
    rz.greens += 1
    return

  if cmd == 'Run tests':
    rz.greens += rz.cases
    return

  if cmd == 'Create test case':
    rz.cases += (rz.productivity or 1)
    return

  if (cmd == 'Create test file' and
      rz.languages):
    rz.cases += 10 * (rz.productivity or 1)
    rz.test_files += (rz.productivity or 1)
    return

  if (cmd == 'Create test suite' and
      rz.languages):
    rz.cases += 30 * (rz.productivity or 1)
    rz.test_files += 20 * (rz.productivity or 1)
    rz.test_suites += 1 * (rz.productivity or 1)
    return

  if (cmd == 'Define feature' and
      sz.spec_writing):
    rz.features += (rz.productivity or 1)
    return

  if (cmd == 'Define use case' and
      sz.use_case_workshop):
    rz.use_cases += (rz.productivity or 1)
    return

  if (cmd == 'Define user journey' and
      sz.user_journey_workshop):
    rz.features += 50 * (rz.productivity or 1)
    rz.use_cases += 10 * (rz.productivity or 1)
    rz.user_journeys += 1 * (rz.productivity or 1)
    return

  if (cmd == 'Define product' and
      sz.product_workshop):
    rz.features += 150 * (rz.productivity or 1)
    rz.use_cases += 50 * (rz.productivity or 1)
    rz.user_journeys += 10 * (rz.productivity or 1)
    rz.products += (rz.productivity or 1)
    return

  if (cmd == 'Define category' and
      sz.category_workshop):
    rz.features += 500 * (rz.productivity or 1)
    rz.use_cases += 150 * (rz.productivity or 1)
    rz.user_journeys += 15 * (rz.productivity or 1)
    rz.products += 5 * (rz.productivity or 1)
    rz.categories += (rz.productivity or 1)
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
    a.maybe_promote_to_manager()
    return
  
  if cmd == 'Promote to VP':
    a.maybe_promote_to_vp()
    return

  if cmd == 'Acquire small company':
    rz.products += 1
    rz.senior_vps += 1
    rz.vps += 8
    rz.managers += 70
    rz.engineers += 600

  if cmd == 'Acquire large company':
    rz.categories += 1
    rz.products += 10
    rz.senior_vps += 10
    rz.vps += 80
    rz.managers += 700
    rz.engineers += 6000

  if cmd == 'Add CPU':
    rz.cycles += 100
    rz.cpus += 1

  if cmd == 'Add server':
    rz.cycles += 500
    rz.cpus += 5
    rz.servers += 1

  if cmd == 'Deploy cluster':
    rz.cycles += 5000
    rz.cpus += 50
    rz.servers += 5
    rz.clusters += 1

  if cmd == 'Build data center':
    rz.cycles += 5000 * 10
    rz.cpus += 50 * 10
    rz.servers += 5 * 10
    rz.clusters += 1 * 10
    rz.data_centers += 1

  if cmd == 'Build ops bots':
    rz.ops_bots += 234

  if cmd in story.ALL_UPGRADES:
    up = story.ALL_UPGRADES[cmd]
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
      news_item = f'{p.nick} earned "{cmd}"'
      a.add_news(rz.day, news_item)
  
