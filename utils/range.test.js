const range = require('./range');

describe('range', () => {
   it('works with 1 arg', () => {
      expect(range(4)).toStrictEqual([0, 1, 2, 3]);
   });

   it('works with 2 args', () => {
      expect(range(1, 4)).toStrictEqual([1, 2, 3]);
   });
});