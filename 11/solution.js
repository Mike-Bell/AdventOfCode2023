const parseInput = input => input.split('\r\n').map(row => row.split('').map(c => c === '#' ? 1 : 0));

const runPart1 = input => {
   const galaxies = [];
   const maxR = input.length;
   const maxC = input[0].length;
   const rowIsExpanded = Array(maxR).fill(true);
   const colIsExpanded = Array(maxC).fill(true);
   for (let r = 0; r < maxR; r++) {
      for (let c = 0; c < maxC; c++) {
         if (input[r][c]) {
            rowIsExpanded[r] = false;
            colIsExpanded[c] = false;
            galaxies.push([r, c]);
         }
      }
   }

   const adjustedRows = [];
   let curR = 0;
   for (let r = 0; r < rowIsExpanded.length; r++) {
      adjustedRows[r] = curR;
      curR += rowIsExpanded[r] ? 2 : 1;
   }

   const adjustedCols = [];
   let curC = 0;
   for (let c = 0; c < colIsExpanded.length; c++) {
      adjustedCols[c] = curC;
      curC += colIsExpanded[c] ? 2 : 1;
   }

   for (const galaxy of galaxies) {
      galaxy[0] = adjustedRows[galaxy[0]];
      galaxy[1] = adjustedCols[galaxy[1]];
   }

   let sum = 0;
   for (let i = 1; i < galaxies.length; i++) {
      for (let j = 0; j < i; j++) {
         sum += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1]);
      }
   }

   return sum;
};

const runPart2 = input => {
   const galaxies = [];
   const maxR = input.length;
   const maxC = input[0].length;
   const rowIsExpanded = Array(maxR).fill(true);
   const colIsExpanded = Array(maxC).fill(true);
   for (let r = 0; r < maxR; r++) {
      for (let c = 0; c < maxC; c++) {
         if (input[r][c]) {
            rowIsExpanded[r] = false;
            colIsExpanded[c] = false;
            galaxies.push([r, c]);
         }
      }
   }

   const adjustedRows = [];
   let curR = 0;
   for (let r = 0; r < rowIsExpanded.length; r++) {
      adjustedRows[r] = curR;
      curR += rowIsExpanded[r] ? 1000000 : 1;
   }

   const adjustedCols = [];
   let curC = 0;
   for (let c = 0; c < colIsExpanded.length; c++) {
      adjustedCols[c] = curC;
      curC += colIsExpanded[c] ? 1000000 : 1;
   }

   for (const galaxy of galaxies) {
      galaxy[0] = adjustedRows[galaxy[0]];
      galaxy[1] = adjustedCols[galaxy[1]];
   }

   let sum = 0;
   for (let i = 1; i < galaxies.length; i++) {
      for (let j = 0; j < i; j++) {
         sum += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1]);
      }
   }

   return sum;
};

module.exports = {parseInput, runPart1, runPart2};