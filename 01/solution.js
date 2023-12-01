const parseInput = input => input.split('\r\n');

const runPart1 = input => input.map(row => row.split('')).map(row => {
   const nums = row.filter(c => !isNaN(Number(c)));
   return Number(nums.at(0) + nums.at(-1));
}).reduce((acc, curr) => acc + curr, 0);

const numberStrs = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const runPart2 = input => input.map(row => {
   const nums = [];

   for (let i = 0; i < row.length; i++) {
      if (!isNaN(Number(row.at(i)))) {
         nums.push(row.at(i));
         continue;
      }

      for (const numberStr of numberStrs) {
         if (row.slice(i, i + numberStr.length) === numberStr) {
            nums.push(`${numberStrs.indexOf(numberStr) + 1}`);
            break;
         }
      }
   }

   return Number(nums.at(0) + nums.at(-1));
}).reduce((acc, curr) => acc + curr, 0);

module.exports = {parseInput, runPart1, runPart2};