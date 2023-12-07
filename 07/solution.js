const faceToNum = {T: 10, J: 11, Q: 12, K: 13, A: 14};
const parseInput = input => input.split('\r\n').map(row => {
   const [a, b] = row.split(' ');
   return {
      nums: a.split('').map(n => faceToNum[n] || Number(n)),
      bet: Number(b)
   };
});

const runPart1 = input => {
   for (const obj of input) {
      const counts = {};
      for (const n of obj.nums) {
         counts[n] = (counts[n] || 0) + 1;
      }
      const matches = Object.values(counts).sort((a, b) => b - a);
      const firstRank = matches[0];
      const secondRank = matches[1] || 0;
      if (firstRank === 5) {
         obj.typeRank = 6;
      } else if (firstRank === 4) {
         obj.typeRank = 5;
      } else if (firstRank === 3 && secondRank === 2) {
         obj.typeRank = 4;
      } else if (firstRank === 3) {
         obj.typeRank = 3;
      } else if (firstRank === 2 && secondRank === 2) {
         obj.typeRank = 2;
      } else if (firstRank === 2) {
         obj.typeRank = 1;
      } else {
         obj.typeRank = 0;
      }
   }

   input.sort((a, b) => {
      if (a.typeRank !== b.typeRank) {
         return a.typeRank - b.typeRank;
      }
      for (let i = 0; i < 5; i++) {
         if (a.nums[i] !== b.nums[i]) {
            return a.nums[i] - b.nums[i];
         }
      }
      return 0;
   });

   return input.map((obj, i) => obj.bet * (i + 1)).reduce((acc, curr) => acc + curr, 0);
};

const runPart2 = input => {
   for (const obj of input) {
      const counts = {};
      let jokers = 0;
      for (const n of obj.nums) {
         if (n !== 11) {
            counts[n] = (counts[n] || 0) + 1;
         } else {
            jokers++;
         }
      }
      const matches = Object.values(counts).sort((a, b) => b - a);
      const firstRank = (matches[0] || 0) + jokers;
      const secondRank = matches[1] || 0;
      if (firstRank === 5) {
         obj.typeRank = 6;
      } else if (firstRank === 4) {
         obj.typeRank = 5;
      } else if (firstRank === 3 && secondRank === 2) {
         obj.typeRank = 4;
      } else if (firstRank === 3) {
         obj.typeRank = 3;
      } else if (firstRank === 2 && secondRank === 2) {
         obj.typeRank = 2;
      } else if (firstRank === 2) {
         obj.typeRank = 1;
      } else {
         obj.typeRank = 0;
      }
   }

   input.sort((a, b) => {
      if (a.typeRank !== b.typeRank) {
         return a.typeRank - b.typeRank;
      }
      for (let i = 0; i < 5; i++) {
         const aNum = a.nums[i] === 11 ? 0 : a.nums[i];
         const bNum = b.nums[i] === 11 ? 0 : b.nums[i];
         if (aNum !== bNum) {
            return aNum - bNum;
         }
      }
      return 0;
   });

   return input.map((obj, i) => obj.bet * (i + 1)).reduce((acc, curr) => acc + curr, 0);
};

module.exports = {parseInput, runPart1, runPart2};