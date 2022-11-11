// A chapter is basically a set of available upgrades.
// Players progress to a higher chapter when they get 100x greens.

const K = 1000;
const M = 1000 * K;
const B = 1000 * M;
const T = 1000 * B;


// greens < 100.
const CHAP_1 = {
  ceo_message: 'Welcome',
  upgrades: [
    {cost: 10, name: 'Learn HTML'},
    {cost: 10, name: 'Learn CSS'},
    {cost: 10, name: 'Learn JavaScript'},
    {cost: 20, name: 'Linear search', prereq: 'languages'},
    {cost: 20, name: 'Recursion', prereq: 'languages'},
  ],
}


// 100 <= greens < 10,000.
const CHAP_2 = {
  ceo_message: 'Promo',
  upgrades: [
    {cost: 100, name: 'Learn Java'},
    {cost: 100, name: 'Learn Python'},
    {cost: 100, name: 'Learn AppScript'},
    {cost: 100, name: 'Binary search', prereq: 'languages'},
    {cost: 100, name: 'Bubble sort', prereq: 'languages'},
    {cost: 3*K, name: 'Learn cron'},
  ],
}


// 10,000 <= greens < 1,000,000.
const CHAP_3 = {
  ceo_message: 'Teamwork',
  upgrades: [
    {cost: 30*K, name: 'Learn C'},
    {cost: 30*K, name: 'Learn Go'},
    {cost: 30*K, name: 'Learn TypeScript'},
    {cost: 100*K, name: 'Shell sort', prereq: 'languages'},
    {cost: 100*K, name: 'Pointers', prereq: 'learn_c'},
  ],
}

export const CHAPTERS = [CHAP_1, CHAP_2, CHAP_3];
