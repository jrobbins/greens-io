import logging
import dataclasses
from sim import arena
from sim import story
from sim import utils


def process_cmd(player_id, cmd):
  a = arena.main_arena
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
    rz.cases += 1
    return

  if (cmd == 'Create test file' and
      rz.languages):
    rz.test_files += 1
    return

  if (cmd == 'Create test suite' and
      rz.languages):
    rz.test_suites += 1
    return

  if (cmd == 'Define feature' and
      sz.spec_writing):
    rz.features += 1
    return

  if (cmd == 'Define use case' and
      sz.use_case_workshop):
    rz.use_cases += 1
    return

  if (cmd == 'Define user journey' and
      sz.user_journey_workshop):
    rz.features += 50
    rz.use_cases += 10
    rz.user_journeys += 1
    return

  if (cmd == 'Define product' and
      sz.product_workshop):
    rz.features += 500
    rz.use_cases += 70
    rz.user_journeys += 10
    rz.products += 1
    return

  if (cmd == 'Define category' and
      sz.category_workshop):
    rz.features += 5000
    rz.use_cases += 600
    rz.user_journeys += 70
    rz.products += 8
    rz.categories += 1
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
    arena.maybe_promote_to_manager(a)
    return
  
  if cmd == 'Promote to VP':
    arena.maybe_promote_to_vp(a)
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
    rz.cycles += 500
    rz.cpus += 5
    rz.servers += 1

  if cmd == 'Deploy cluster':
    rz.cycles += 5000
    rz.cpus += 50
    rz.servers += 5
    rz.clusters += 1

  if cmd == 'Build datacenter':
    rz.cycles += 15000 * 50
    rz.cpus += 150 * 50
    rz.servers += 15 * 50
    rz.clusters += 3 * 50
    rz.datacenters += 1

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
  
