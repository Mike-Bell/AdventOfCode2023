const parseInput = input => input.split('\r\n');

const runPart1 = input => {
   const symbols = [];
   const numbers = [];
   for (let r = 0; r < input.length; r++) {
      const row = input[r];
      let parsingNumber = false;
      for (let c = 0; c < row.length; c++) {
         const val = row[c];
         if (!isNaN(Number(val))) {
            if (parsingNumber) {
               numbers.at(-1).val += val;
            } else {
               parsingNumber = true;
               numbers.push({val: val, pos: [r, c]});
            }
            continue;
         } else if (val !== '.') {
            symbols.push([r, c]);
         }
         parsingNumber = false;
      }
   }

   let sum = 0;
   for (const num of numbers) {
      if (symbols.some(([symbolR, symbolC]) =>
         symbolR <= num.pos[0] + 1
            && symbolR >= num.pos[0] - 1
            && symbolC >= num.pos[1] - 1
            && symbolC <= num.pos[1] + 1 + num.val.length - 1
      )) {
         sum += Number(num.val);
      }
   }
   return sum;
};

const runPart2 = input => {
   const symbols = [];
   const numbers = [];
   for (let r = 0; r < input.length; r++) {
      const row = input[r];
      let parsingNumber = false;
      for (let c = 0; c < row.length; c++) {
         const val = row[c];
         if (!isNaN(Number(val))) {
            if (parsingNumber) {
               numbers.at(-1).val += val;
            } else {
               parsingNumber = true;
               numbers.push({val: val, pos: [r, c]});
            }
            continue;
         } else if (val !== '.') {
            symbols.push([r, c]);
         }
         parsingNumber = false;
      }
   }

   let sum = 0;
   for (const [symbolR, symbolC] of symbols) {
      const adjacentNums = numbers.filter(num =>
         symbolR <= num.pos[0] + 1
            && symbolR >= num.pos[0] - 1
            && symbolC >= num.pos[1] - 1
            && symbolC <= num.pos[1] + 1 + num.val.length - 1
      );
      if (adjacentNums.length === 2) {
         sum += Number(adjacentNums[0].val) * Number(adjacentNums[1].val);
      }
   }
   return sum;
};

module.exports = {parseInput, runPart1, runPart2};