# A chapter is basically a set of available upgrades.
# Players progress to a higher chapter when they get 100x greens.

import dataclasses

# Units
K = 1000
M = 1000 * K
B = 1000 * M
T = 1000 * B

# Dictionary keys
CEO_MESSAGE = 'ceo_message'
UPGRADES = 'upgrades'

@dataclasses.dataclass
class Upgrade:
  cost: int
  name: str
  prereq: str = ''
  incr: str = ''
  snake: str = ''


@dataclasses.dataclass
class Chapter:
  ceo_message: str
  upgrades: list[Upgrade]


# greens < 100.
CHAP_1 = Chapter(
  ceo_message = 'Welcome',
  upgrades = [
    Upgrade(10, 'Learn HTML'),
    Upgrade(10, 'Learn CSS'),
    Upgrade(10, 'Learn JavaScript', incr='languages'),
    Upgrade(20, 'Linear search', prereq='languages'),
    Upgrade(20, 'Recursion', prereq='languages'),
  ],
)


# 100 <= greens < 10,000.
CHAP_2 = Chapter(
  ceo_message = 'Promo',
  upgrades = [
    Upgrade(100, 'Learn Java'),
    Upgrade(100, 'Learn Python'),
    Upgrade(100, 'Learn AppScript'),
    Upgrade(100, 'Binary search', prereq='languages'),
    Upgrade(100, 'Bubble sort', prereq='languages'),
    Upgrade(3*K, 'Learn cron'),
  ],
)


# 10,000 <= greens < 1,000,000.
CHAP_3 = Chapter(
  ceo_message = 'Teamwork',
  upgrades = [
    Upgrade( 30*K, 'Learn C'),
    Upgrade( 30*K, 'Learn Go'),
    Upgrade( 30*K, 'Learn TypeScript'),
    Upgrade(100*K, 'Shell sort', prereq='languages'),
    Upgrade(100*K, 'Pointers', prereq='learn_c'),
  ],
)

CHAPTERS = [CHAP_1, CHAP_2, CHAP_3]


ALL_UPGRADES = {
  up.name: up
  for chap in CHAPTERS
  for up in chap.upgrades}
