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
class Quiz:
  text: str


@dataclasses.dataclass
class Upgrade:
  cost: int
  name: str
  prereq: str = ''
  incr: str = ''
  snake: str = ''
  quiz: Quiz = None


@dataclasses.dataclass
class Chapter:
  ceo_message: str
  upgrades: list[Upgrade]


LEARN_HTML = Upgrade(
  10, 'Learn HTML',
  quiz=Quiz('''
    Based on documentation on MDN, what HTML tag would you use
    to indicate an Italian phrase in an English sentence?
    |  Emphasis
    |  Italic
    |X Idiomatic text
    |  Italiano
  '''))

LEARN_CSS = Upgrade(
  10, 'Learn CSS',
  quiz=Quiz('''
    According to MDN, CSS provides this many different kinds
    of units for length:
    |  8
    |  14
    |X 17
    |  21
  '''))

LEARN_JAVASCRIPT = Upgrade(
  10, 'Learn JavaScript', incr='languages',
  quiz=Quiz('''
    According to github project wtfjs, which of the following
    expressions evaluates to true?
    |  +true
    |X parseInt(1 / 1999999) == 5
    |  ![] + []
    |  NaN === NaN
  '''))

LINEAR_SEARCH = Upgrade(
  20, 'Linear Search', incr='algorithms', prereq='languages',
  quiz=Quiz('''
    "It's always in the last place you look" is true because:
    |  People are not computers
    |X You stop looking when you find it
    |  Gaslighting gnomes
    |  This is the worst timeline
  '''))

RECURSION = Upgrade(
  30, 'Recursion', incr='algorithms', prereq='languages',
  quiz=Quiz('''
    What does a tail-recursive function do to unwind:
    |  Light reading
    |  Random walks
    |  Goat yoga
    |X Nothing
  '''))

LEARN_JAVA = Upgrade(
  100, 'Learn Java', incr='languages',
  quiz=Quiz('''
    The mascot of the Java programming language is
    |X A "software agent" with a red nose
    |  A garbage collection truck
    |  Bob, the factory factory builder
    |  A solo jazz coffee cup
  '''))

LEARN_PYTHON = Upgrade(
  100, 'Learn Python', incr='languages',
  quiz=Quiz('''
    Which of the following is NOT generally associated with Python?
    |X Betta fish
    |  Duck typing
    |  Camel case
    |  Pandas
    |  Walrus operator
    |  Snake case
  '''))



# greens < 100.
CHAP_1 = Chapter(
  ceo_message = 'Welcome',
  upgrades = [
    LEARN_HTML,
    LEARN_CSS,
    LEARN_JAVASCRIPT,
    Upgrade(20, 'Test runner'),
    LINEAR_SEARCH,
    RECURSION,
  ],
)


# 100 <= greens < 10,000.
CHAP_2 = Chapter(
  ceo_message = 'Promo',
  upgrades = [
    LEARN_JAVA,
    LEARN_PYTHON,
    Upgrade(100, 'Learn AppScript', incr='languages'),
    Upgrade(100, 'Binary search', prereq='languages'),
    Upgrade(100, 'Bubble sort', prereq='languages'),
    Upgrade(1*K, 'Learn C', incr='languages'),
    Upgrade(3*K, 'Automation', prereq='languages', incr='automation'),
    Upgrade(5*K, 'Shell sort', prereq='languages'),
    Upgrade(5*K, 'Pointers', prereq='learn_c'),
  ],
)


# 10,000 <= greens < 1,000,000.
CHAP_3 = Chapter(
  ceo_message = 'Teamwork',
  upgrades = [
    Upgrade( 10*K, 'Learn Go', incr='languages'),
    Upgrade( 10*K, 'Learn TypeScript', incr='languages'),
    Upgrade( 15*K, 'Waterfall model'),
    Upgrade( 30*K, 'Promo process'),
    Upgrade( 30*K, 'Test driven development'),
    Upgrade( 50*K, 'Peer reviews', incr='peer_reviews'),
    Upgrade( 60*K, 'Multi-processing', incr='multi_processing'),
    Upgrade(100*K, 'Agile', incr='productity'),
    Upgrade(300*K, 'Risk management'),
    Upgrade(300*K, 'Outsourced HR', incr='outsourced_hr'),
    Upgrade(500*K, 'Testing lab'),
    Upgrade(100*K, 'Shell sort', prereq='languages'),
    Upgrade(100*K, 'Shortest path', prereq='dynamic_programming'),
  ],
)


# 1,000,000 <= greens < 100,000,000.
CHAP_4 = Chapter(
  ceo_message = 'Balance',
  upgrades = [
    Upgrade( 1*M, 'Learn Lisp', incr='languages'),
    Upgrade( 2*M, 'Leadership summit', incr='leadership_summit'),
    Upgrade( 5*M, 'Cloud computing', incr='cloud_computing'),
    Upgrade(10*M, 'Von Neumann Machine', incr='van_neumonn_machine'),
    Upgrade(20*M, 'Shell sort', prereq='languages'),
    Upgrade(20*M, 'Bin packing', prereq='dynamic_programming'),
    Upgrade(50*M, 'Warehouse computing', incr='warehouse_computing'),
  ],
)

    
CHAPTERS = [CHAP_1, CHAP_2, CHAP_3]


ALL_UPGRADES = {
  up.name: up
  for chap in CHAPTERS
  for up in chap.upgrades}
