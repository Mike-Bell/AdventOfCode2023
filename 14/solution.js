const parseInput = input => input.split('\r\n').map(row => row.split(''));

const runPart1 = input => {
   const maxR = input.length;
   const maxC = input[0].length;
   let totalWeight = 0;
   for (let c = 0; c < maxC; c++) {
      let stoppingPoint = 0;
      for (let r = 0; r < maxR; r++) {
         const symbol = input[r][c];
         if (symbol === '#') {
            stoppingPoint = r + 1;
         } else if (symbol === 'O') {
            totalWeight += maxR - stoppingPoint;
            stoppingPoint++;
         }
      }
   }

   return totalWeight;
};

const runPart2 = input => {
   const maxR = input.length;
   const maxC = input[0].length;
   const ids = [];
   for (let i = 0; i < 1000000000; i++) {
      for (let c = 0; c < maxC; c++) {
         let stoppingPoint = 0;
         for (let r = 0; r < maxR; r++) {
            const symbol = input[r][c];
            if (symbol === '#') {
               stoppingPoint = r + 1;
            } else if (symbol === 'O') {
               input[r][c] = '.';
               input[stoppingPoint][c] = 'O';
               stoppingPoint++;
            }
         }
      }

      for (let r = 0; r < maxR; r++) {
         let stoppingPoint = 0;
         for (let c = 0; c < maxC; c++) {
            const symbol = input[r][c];
            if (symbol === '#') {
               stoppingPoint = c + 1;
            } else if (symbol === 'O') {
               input[r][c] = '.';
               input[r][stoppingPoint] = 'O';
               stoppingPoint++;
            }
         }
      }

      for (let c = 0; c < maxC; c++) {
         let stoppingPoint = maxR - 1;
         for (let r = maxR - 1; r >= 0; r--) {
            const symbol = input[r][c];
            if (symbol === '#') {
               stoppingPoint = r - 1;
            } else if (symbol === 'O') {
               input[r][c] = '.';
               input[stoppingPoint][c] = 'O';
               stoppingPoint--;
            }
         }
      }

      let id = '';
      for (let r = 0; r < maxR; r++) {
         let stoppingPoint = maxC - 1;
         for (let c = maxC - 1; c >= 0; c--) {
            const symbol = input[r][c];
            if (symbol === '#') {
               stoppingPoint = c - 1;
            } else if (symbol === 'O') {
               input[r][c] = '.';
               input[r][stoppingPoint] = 'O';
               id += `${r},`;
               stoppingPoint--;
            }
         }
         id += ';';
      }

      const lastId = ids.indexOf(id);
      if (lastId !== -1) {
         const period = i - lastId;
         i += period * Math.floor((1000000000 - i) / (i - lastId));
      }
      ids.push(id);
   }

   let totalWeight = 0;
   for (let c = 0; c < maxC; c++) {
      for (let r = 0; r < maxR; r++) {
         const symbol = input[r][c];
         if (symbol === 'O') {
            totalWeight += maxR - r;
         }
      }
   }

   return totalWeight;
};

module.exports = {parseInput, runPart1, runPart2};