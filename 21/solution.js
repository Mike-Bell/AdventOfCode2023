const parseInput = input => {
   const rows = input.split('\r\n');
   let start = [-1, -1];
   const maxR = rows.length - 1;
   const maxC = rows[0].length - 1;
   const grid = new Array(maxR + 1);
   for (let r = 0; r <= maxR; r++) {
      const row = rows[r];
      const rowToPush = new Array(maxC + 1);
      for (let c = 0; c <= maxC; c++) {
         const char = row[c];
         if (char === 'S') {
            start = [r, c];
         }
         rowToPush[c] = char !== '#';
      }
      grid[r] = rowToPush;
   }
   return {grid, start, maxR, maxC};
};

const runPart1 = input => {
   const {grid, start, maxR, maxC} = input;
   const traveled = new Array(maxR + 1);

   for (let r = 0; r <= maxR; r++) {
      traveled[r] = new Array(maxC + 1);
   }

   traveled[start[0]][start[1]] = true;

   const maxSteps = 64;
   let states = [start];

   let targets = 0;
   for (let i = 0; i <= maxSteps; i++) {
      const nextStates = [];
      const isEven = i % 2 === 0;
      while (states.length > 0) {
         const [r, c] = states.pop();

         if (isEven) {
            targets++;
         }

         for (const d of [-1, 1]) {
            let nextR = r + d;
            let nextC = c;
            if (nextR >= 0 && nextR <= maxR && nextC >= 0 && nextC <= maxC && grid[nextR][nextC] && !traveled[nextR][nextC]) {
               traveled[nextR][nextC] = true;
               nextStates.push([nextR, nextC]);
            }

            nextR = r;
            nextC = c + d;
            if (nextR >= 0 && nextR <= maxR && nextC >= 0 && nextC <= maxC && grid[nextR][nextC] && !traveled[nextR][nextC]) {
               traveled[nextR][nextC] = true;
               nextStates.push([nextR, nextC]);
            }
         }
      }
      states = nextStates;
   }

   return targets;
};

const runPart2 = input => {
   const {grid, start, maxR, maxC} = input;
   const distances = new Array(maxR + 1);

   for (let r = 0; r <= maxR; r++) {
      distances[r] = new Array(maxC + 1).fill(-1);
   }

   distances[start[0]][start[1]] = 0;

   let states = [start];

   let i = -1;
   while (states.length > 0) {
      i++;
      const nextStates = [];
      while (states.length > 0) {
         const [r, c] = states.pop();

         for (const d of [-1, 1]) {
            let nextR = r + d;
            let nextC = c;
            if (nextR >= 0 && nextR <= maxR && nextC >= 0 && nextC <= maxC && grid[nextR][nextC] && distances[nextR][nextC] === -1) {
               distances[nextR][nextC] = i + 1;
               nextStates.push([nextR, nextC]);
            }

            nextR = r;
            nextC = c + d;
            if (nextR >= 0 && nextR <= maxR && nextC >= 0 && nextC <= maxC && grid[nextR][nextC] && distances[nextR][nextC] === -1) {
               distances[nextR][nextC] = i + 1;
               nextStates.push([nextR, nextC]);
            }
         }
      }
      states = nextStates;
   }

   const steps = 26501365;
   const gardenJumps = Math.floor(steps / (maxR + 1));
   const remainder = steps - gardenJumps * (maxR + 1);
   const realDistances = distances.flat().filter(d => d !== -1);
   const evenDistances = realDistances.filter(d => d % 2 === 0);
   const oddDistances = realDistances.filter(d => d % 2 === 1);
   const evenRemainders = evenDistances.filter(d => d > remainder);
   const oddRemainders = oddDistances.filter(d => d > remainder);
   const ans = Math.pow((gardenJumps + 1), 2) * oddDistances.length
      + Math.pow(gardenJumps, 2) * evenDistances.length
      - (gardenJumps + 1) * oddRemainders.length
      + gardenJumps * evenRemainders.length;

   return ans;
};

module.exports = {parseInput, runPart1, runPart2};