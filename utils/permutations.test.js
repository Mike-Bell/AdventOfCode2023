const permutations = require('./permutations');

describe('permutations', () => {
   it('works', () => {
      const ps = permutations([1, 2, 3]);
      expect(ps.length).toBe(6);
      expect(ps.filter(p => p[0] === 1 && p[1] === 2 && p[2] === 3).length).toBe(1);
      expect(ps.filter(p => p[0] === 1 && p[1] === 3 && p[2] === 2).length).toBe(1);
      expect(ps.filter(p => p[0] === 2 && p[1] === 1 && p[2] === 3).length).toBe(1);
      expect(ps.filter(p => p[0] === 2 && p[1] === 3 && p[2] === 1).length).toBe(1);
      expect(ps.filter(p => p[0] === 3 && p[1] === 2 && p[2] === 1).length).toBe(1);
      expect(ps.filter(p => p[0] === 3 && p[1] === 1 && p[2] === 2).length).toBe(1);
   });
});