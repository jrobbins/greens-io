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
    Based on documentation on MDN, what HTML element would you
    use to indicate a foreign phrase in an English sentence?
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

TEST_RUNNER = Upgrade(
  20, 'Test Runner',
  quiz=Quiz('''
    What does a test runner program do?
    |  Traverse a source tree to discover test files
    |  Execute test cases
    |  Catch uncaught exceptions
    |  Output a test run report
    |X All of the above
    |  None of the above
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
    |  None of the above
  '''))

LEARN_PYTHON = Upgrade(
  100, 'Learn Python', incr='languages',
  quiz=Quiz('''
    Which of the following is NOT generally associated with Python?
    |  Duck typing
    |  Camel case
    |  Pandas
    |  Walrus operator
    |  Snake case
    |X Betta fish testing
  '''))

LEARN_BASIC = Upgrade(
  100, 'Learn BASIC', incr='languages',
  quiz=Quiz('''
    Which of the following is NOT a BASIC keyword?
    |  LET
    |  GOTO
    |  PRINT
    |  GOSUB
    |  DIM
    |X BOOT
    |  REM
  '''))

BINARY_SEARCH = Upgrade(
  100, 'Binary Search', incr='algorithms', prereq='languages',
  quiz=Quiz('''
    If you were doing a binary search of these choices, you would first look
    |  Here
    |  Here
    |  Here
    |X Here
    |  Here
    |  Here
    |  Here
  '''))

BUBBLE_SORT = Upgrade(
  100, 'Bubble Sort', incr='algorithms', prereq='languages',
  quiz=Quiz('''
    Bubble Sort is called "Bubble Sort" because bubbles:
    |  Burst
    |  Bounce
    |X Rise
    |  Drift
    |  Expand
    |  Distort
  '''))

AUTOMATION = Upgrade(
  1*K, 'Automation', prereq='languages', incr='automation',
  quiz=Quiz('''
    A "deamon" is a program that:
    |  Dwells in the lowest levels of the OS
    |X Runs continuously
    |  Requires a signature
    |  Rules the game grid
    |  Spawns zombie processess
    |X Lurks in the background
    |  Checks British spelling 
  '''))

LEARN_C = Upgrade(
  2*K, 'Learn C', incr='languages',
  quiz=Quiz('''
    The C programming language was developed by:
    |  Bell Harbor
    |  Taco Bell
    |  Kristen Bell
    |  Bell Gardens
    |X Bell Labs
    |  Blue Bell
    |  Saved by the Bell
  '''))

INSERTION_SORT = Upgrade(
  5*K, 'Insertion Sort', incr='algorithms', prereq='languages',
  quiz=Quiz('''
    Insertion Sort's main use is:
    |  Sorting unicode strings
    |  Initiating the "post office protocol"
    |  When you know the items are already sorted
    |  Compressing audio files
    |X Teaching the concept of invariants
  '''))



# greens < 100.
CHAP_1 = Chapter(
  ceo_message = 'Welcome',
  upgrades = [
    LEARN_HTML,
    LEARN_CSS,
    LEARN_JAVASCRIPT,
    TEST_RUNNER,
    LINEAR_SEARCH,
    RECURSION,
    Upgrade(100, 'Function coverage', prereq='languages',
            incr='coverage_criteria'),
  ],
)


# 100 <= greens < 10,000.
CHAP_2 = Chapter(
  ceo_message = 'Promo',
  upgrades = [
    LEARN_JAVA,
    LEARN_PYTHON,
    LEARN_BASIC,
    BINARY_SEARCH,
    BUBBLE_SORT,
    AUTOMATION,
    LEARN_C,
    INSERTION_SORT,
    Upgrade(3*K, 'Spec writing'),
    Upgrade(4*K, 'IDEs', prereq='languages', incr='productity'),
    Upgrade(4*K, 'Version control', prereq='languages', incr='productity'),
    Upgrade(4*K, 'Statement coverage', prereq='languages',
            incr='coverage_criteria'),
    Upgrade(5*K, 'Parsing', prereq='learn_c', incr='algorithms'),
    Upgrade(6*K, 'Use case workshop', prereq='spec_writing'),
  ],
)


# 10,000 <= greens < 1,000,000.
CHAP_3 = Chapter(
  ceo_message = 'Teamwork',
  upgrades = [
    Upgrade( 10*K, 'Learn Go', incr='languages'),
    Upgrade( 10*K, 'Learn TypeScript', incr='languages'),
    Upgrade( 10*K, 'Branch coverage', prereq='languages',
             incr='coverage_criteria'),
    Upgrade( 15*K, 'Waterfall model'),
    Upgrade( 30*K, 'Promo process'),
    Upgrade( 30*K, 'Test driven development'),
    Upgrade( 50*K, 'Peer reviews', incr='peer_reviews'),
    Upgrade( 60*K, 'Multi-processing', incr='multi_processing'),
    Upgrade(100*K, 'Agile', incr='productity'),
    Upgrade(100*K, 'Shell sort', prereq='languages', incr='algorithms'),
    Upgrade(100*K, 'Shortest path', prereq='dynamic_programming',
            incr='algorithms'),
    Upgrade(300*K, 'Risk management'),
    Upgrade(300*K, 'Outsourced HR', incr='outsourced_hr'),
    Upgrade(500*K, 'Testing lab'),
    Upgrade(600*K, 'User journey workshop', prereq='use_case_workshop'),
  ],
)


# 1,000,000 <= greens < 100,000,000.
CHAP_4 = Chapter(
  ceo_message = 'Smarter',
  upgrades = [
    Upgrade( 1*M, 'Learn Lisp', incr='languages'),
    Upgrade( 2*M, 'Leadership summit', incr='leadership_summit'),
    Upgrade( 3*M, 'Condition coverage', prereq='languages',
             incr='coverage_criteria'),
    Upgrade( 5*M, 'Cloud computing'),
    Upgrade(10*M, 'Von Neumann Machine', incr='van_neumonn_machine'),
    Upgrade(20*M, 'Quicksort', prereq='languages', incr='algorithms'),
    Upgrade(20*M, 'Bin packing', prereq='dynamic_programming', incr='algorithms'),
    Upgrade(50*M, 'Warehouse computing'),
  ],
)

    
CHAPTERS = [CHAP_1, CHAP_2, CHAP_3, CHAP_4]


ALL_UPGRADES = {
  up.name: up
  for chap in CHAPTERS
  for up in chap.upgrades}


WELCOME_EMAIL = {
  'from': 'The CEO',
  'to': 'New hires',
  'subject': 'Welcome aboard',
  'body': [
    """Congratulations on passing your interviews and welcome 
    to the company!""",
    """As you may have read in the press, our products have 
    suffered some recent failures due to software defects. 
    The board has made it clear to me that signigicant 
    change is needed.  And we have exactly one calendar year
    to do it.  That's why you're all 
    here.""",
    """Every single one of you has been recruited because of 
    your single-minded obsession with tesing.  I need you
    to reach way down into your inner-most self, grab that
    testing energy with both hands and ride it like a
    stampede of greased elephants galloping down a steep hill
    during a hurricane. Don't stop for nothing or nobody.""",
    "Let's get down to work!"],
  }

PROMO_EMAIL = {
  'from': 'The CEO',
  'to': 'Top Performers',
  'subject': 'Chance for promo',
  'body': [
    """You could be  on your way to your first promotion!""",
    """We knew that you had passion, but you are demonstrating
    that you also have problem-solving abilities.  That's
    perfect, because we have a lot -- and I mean a LOT -- 
    of problems.""",
    """The promo committee will be expecting you to round out
    your skillset by learning as many languages and algorithms
    as you possibly can in the remainder of the quarter.""",
    """Given your track record so far, I'm expecting you to
    exceeed all expectations.  Even mine!"""],
  }

TEAMWORK_EMAIL = {
  'from': 'The CEO',
  'to': 'Team leads',
  'subject': 'Teamwork makes the dream work',
  'body': [
    """Teamwork is essential for success in today's dog-eat-dog
    competitive landscape.  If you're not moving your team
    forward, then you're pulling it backwards.  And, do
    you know what "team" spelled backwards is?""",
    """Meat!""",
    """Each of you brings unique value to the team.  You're
    one-in-a-million and there is no one like you.  That's
    why we need a bunch more people exactly like you.""",
    """Your drive, determination, and fierce intelect make
    you a force to be reckoned with.  There is no force in
    the universe more powerful than the raw ambition
    of a few determined, obsessive, dedicated... slightly
    unbalanced.... individuals.""",
    """Except, for butts-in-seats."""],
  }

SMARTER_EMAIL = {
  'from': 'The CEO',
  'to': 'Team leads',
  'subject': 'Work smarter, not harder',
  'body': [
    """There was once a young lumberjack with mighty arms who set
    out to chop down more trees than anyone else in the
    crew.  On the first day he impressed everyone.   On the second
    day, he worked harder, but chopped fewer.  On the third
    day he wore himself out for the fewest logs.""",
    """Finally, a wise old lumberjack gave him some valuable advice:
    "Son, that's a chainsaw." """,
    """Innovate!"""],
  }


ALL_EMAILS = {
  0: WELCOME_EMAIL,
  1: PROMO_EMAIL,
  2: TEAMWORK_EMAIL,
  3: SMARTER_EMAIL,
  }


def make_final_email():
  return {
    'from': 'The CEO',
    'to': 'Everyone',
    'subject': 'One heck of a year!',
    'body': [
      """Wow... just wow.""",
      """I did not see that coming.  If you had told me at the
      start of the year that we would be where we are right now
      I would have--""",
      """Well, let's be honest.  I wouldn't change a thing.""",
      """The highlight for me was that day when I thought that
      we had aleady come so far and there was no way to take
      things farther.  But, you proved me wrong.""",
      """You. Kept. Going.""",
      """Good luck with whatever comes next for you!"""],
  }
  
