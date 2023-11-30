const clamp = require('./clamp');

describe('clamp', () => {
   it('clamps to upperbound', () => {
      expect(clamp(10, 1, 5)).toBe(5);
   });

   it('clamps to lowerbound', () => {
      expect(clamp(-50, 1, 5)).toBe(1);
   });

   it('returns number if number is in bounds', () => {
      expect(clamp(3, 1, 5)).toBe(3);
   });
});