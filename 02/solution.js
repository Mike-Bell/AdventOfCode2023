const parseInput = input => input.split('\r\n');

const runPart1 = input => input.map(row => {
   const cubeMap = {
      red: 0,
      blue: 0,
      green: 0
   };
   const [first, second] = row.split(': ');
   const id = Number(first.split('Game ').at(-1));
   const draws = second.split('; ');
   draws.forEach(draw => {
      const combos = draw.split(', ');
      combos.forEach(c => {
         const [num, color] = c.split(' ');
         cubeMap[color] = Math.max(cubeMap[color], Number(num));
      });
   });
   return cubeMap.red <= 12 && cubeMap.green <= 13 && cubeMap.blue <= 14 ? id : 0;
}).reduce((acc, curr) => acc + curr, 0);

const runPart2 = input => input.map(row => {
   const cubeMap = {
      red: 0,
      blue: 0,
      green: 0
   };
   const [, second] = row.split(': ');
   const draws = second.split('; ');
   draws.forEach(draw => {
      const combos = draw.split(', ');
      combos.forEach(c => {
         const [num, color] = c.split(' ');
         cubeMap[color] = Math.max(cubeMap[color], Number(num));
      });
   });
   return cubeMap.red * cubeMap.green * cubeMap.blue;
}).reduce((acc, curr) => acc + curr, 0);

module.exports = {parseInput, runPart1, runPart2};