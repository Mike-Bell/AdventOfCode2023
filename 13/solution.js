const parseInput = input => input.split('\r\n\r\n').map(pattern => pattern.split('\r\n').map(row => row.split('').map(c => c === '#' ? 1 : 0)));

const runPart1 = input => input.map(pattern => {
   const maxR = pattern.length;
   const maxC = pattern[0].length;
   const rowMatches = Array(maxR).fill(0).map(() => []);
   for (let r = 0; r < maxR; r++) {
      for (let r2 = r + 1; r2 < maxR; r2++) {
         let isMatch = true;
         for (let c = 0; c < maxC; c++) {
            if (pattern[r][c] !== pattern[r2][c]) {
               isMatch = false;
               break;
            }
         }
         if (isMatch) {
            rowMatches[r].push(r2);
         }
      }
   }

   for (let r = 0; r < maxR - 1; r++) {
      let isReflection = true;
      for (let d = 0; r - d >= 0 && r + 1 + d < maxR; d++) {
         if (!rowMatches[r - d].includes(r + 1 + d)) {
            isReflection = false;
            break;
         }
      }
      if (isReflection) {
         return (r + 1) * 100;
      }
   }

   const columnMatches = Array(maxC).fill(0).map(() => []);
   for (let c = 0; c < maxC; c++) {
      for (let c2 = c + 1; c2 < maxC; c2++) {
         let isMatch = true;
         for (let r = 0; r < maxR; r++) {
            if (pattern[r][c] !== pattern[r][c2]) {
               isMatch = false;
               break;
            }
         }
         if (isMatch) {
            columnMatches[c].push(c2);
         }
      }
   }

   for (let c = 0; c < maxC - 1; c++) {
      let isReflection = true;
      for (let d = 0; d <= c && c - d >= 0 && c + 1 + d < maxC; d++) {
         if (!columnMatches[c - d].includes(c + 1 + d)) {
            isReflection = false;
            break;
         }
      }
      if (isReflection) {
         return c + 1;
      }
   }
   throw new Error('Failed to find match');
}).reduce((acc, curr) => acc + curr);

const runPart2 = input => input.map(pattern => {
   const maxR = pattern.length;
   const maxC = pattern[0].length;
   const rowDiffs = Array(maxR).fill(0).map(() => Array(maxR).fill(0));
   for (let r = 0; r < maxR; r++) {
      for (let r2 = r + 1; r2 < maxR; r2++) {
         let diffs = 0;
         for (let c = 0; c < maxC; c++) {
            if (pattern[r][c] !== pattern[r2][c]) {
               diffs++;
               if (diffs > 1) {
                  break;
               }
            }
         }
         rowDiffs[r][r2] = diffs;
      }
   }

   for (let r = 0; r < maxR - 1; r++) {
      let diffs = 0;
      for (let d = 0; r - d >= 0 && r + 1 + d < maxR; d++) {
         diffs += rowDiffs[r - d][r + 1 + d];
         if (diffs > 1) {
            break;
         }
      }
      if (diffs === 1) {
         return (r + 1) * 100;
      }
   }

   const columnDiffs = Array(maxC).fill(0).map(() => Array(maxC).fill(0));
   for (let c = 0; c < maxC; c++) {
      for (let c2 = c + 1; c2 < maxC; c2++) {
         let diffs = 0;
         for (let r = 0; r < maxR; r++) {
            if (pattern[r][c] !== pattern[r][c2]) {
               diffs++;
               if (diffs > 1) {
                  break;
               }
            }
         }
         columnDiffs[c][c2] = diffs;
      }
   }

   for (let c = 0; c < maxC - 1; c++) {
      let diffs = 0;
      for (let d = 0; d <= c && c - d >= 0 && c + 1 + d < maxC; d++) {
         diffs += columnDiffs[c - d][c + 1 + d];
         if (diffs > 1) {
            break;
         }
      }
      if (diffs === 1) {
         return c + 1;
      }
   }
   throw new Error('Failed to find match');
}).reduce((acc, curr) => acc + curr);

module.exports = {parseInput, runPart1, runPart2};