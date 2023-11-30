const parseInput = input => input.split('\r\n').map(row => {
   const [a, b] = row.split(' | ');
   const winners = a.split(': ')[1].split(' ').filter(n => n);
   const mine = b.split(' ').filter(n => n);
   return [winners, mine];
});

const runPart1 = input => input.map(row => row[1].filter(n => row[0].includes(n)))
   .reduce((acc, curr) => acc + (curr.length === 0 ? 0 : Math.pow(2, curr.length - 1)), 0);

const runPart2 = input => {
   const cardNums = Array(input.length).fill(1);
   const nWinners = Array(input.length).fill(0).map((_, i) => input[i][1].filter(n => input[i][0].includes(n)).length);
   for (let i = 0; i < input.length; i++) {
      for (let j = 1; j <= nWinners[i]; j++) {
         cardNums[i + j] += cardNums[i];
      }
   }
   return cardNums.reduce((acc, curr) => acc + curr, 0);
};

module.exports = {parseInput, runPart1, runPart2};