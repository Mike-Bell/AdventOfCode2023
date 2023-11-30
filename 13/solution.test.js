const {runPart1, runPart2, parseInput} = require('./solution');

describe('part1', () => {
   it('works', () => {
      expect(runPart1(parseInput('INPUT'))).toBe('INPUT');
   });
});

describe('part2', () => {
   it('works', () => {
      expect(runPart2(parseInput('INPUT'))).toBe('INPUT');
   });
});