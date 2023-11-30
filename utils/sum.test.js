const sum = require('./sum');

describe('clamp', () => {
   it('sums things', () => {
      expect(sum([5, 0, -1, 2])).toBe(6);
   });
});