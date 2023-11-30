const parseInput = input => input.split('\r\n').map(row => row.split('').map(Number));

const runPart1 = input => {
   const maxR = input.length - 1;
   const maxC = input[0].length - 1;

   const turns = [[1, 3], [0, 2], [1, 3], [0, 2]];

   const nextDr = dir => {
      if (dir === 0) {
         return -1;
      } else if (dir === 2) {
         return 1;
      }
      return 0;
   };

   const nextDc = dir => {
      if (dir === 1) {
         return 1;
      } else if (dir === 3) {
         return -1;
      }
      return 0;
   };

   const visited = Array(maxR + 1);
   for (let r = 0; r <= maxR; r++) {
      visited[r] = Array(maxC + 1);
      for (let c = 0; c <= maxC; c++) {
         visited[r][c] = Array(4);
         for (let d = 0; d < 4; d++) {
            visited[r][c][d] = [];
         }
      }
   }

   const statesForHeats = [[[0, 0, 1, 0]]];
   for (let h = 0; h < Infinity; h++) {
      const states = statesForHeats[h];
      if (!states) {
         continue;
      }

      while (states.length > 0) {
         const [r, c, dir, moved] = states.pop();
         if (visited[r][c][dir][moved]) {
            continue;
         }

         visited[r][c][dir][moved] = true;

         if (r === maxR && c === maxC) {
            return h;
         }

         if (moved < 3) {
            const nextR = r + nextDr(dir);
            const nextC = c + nextDc(dir);
            if (nextR >= 0 && nextC >= 0 && nextR <= maxR && nextC <= maxC) {
               const nextHeat = h + input[nextR][nextC];
               statesForHeats[nextHeat] = statesForHeats[nextHeat] || [];
               statesForHeats[nextHeat].push([nextR, nextC, dir, moved + 1]);
            }
         }

         const nextDirs = turns[dir];
         for (const nextDir of nextDirs) {
            const nextR = r + nextDr(nextDir);
            const nextC = c + nextDc(nextDir);
            if (nextR >= 0 && nextC >= 0 && nextR <= maxR && nextC <= maxC) {
               const nextHeat = h + input[nextR][nextC];
               statesForHeats[nextHeat] = statesForHeats[nextHeat] || [];
               statesForHeats[nextHeat].push([nextR, nextC, nextDir, 1]);
            }
         }
      }
   }

   throw new Error('didnt find target');
};

const runPart2 = input => {
   const maxR = input.length - 1;
   const maxC = input[0].length - 1;

   const turns = [[1, 3], [0, 2], [1, 3], [0, 2]];

   const nextDr = dir => {
      if (dir === 0) {
         return -1;
      } else if (dir === 2) {
         return 1;
      }
      return 0;
   };

   const nextDc = dir => {
      if (dir === 1) {
         return 1;
      } else if (dir === 3) {
         return -1;
      }
      return 0;
   };

   const visited = Array(maxR + 1);
   for (let r = 0; r <= maxR; r++) {
      visited[r] = Array(maxC + 1);
      for (let c = 0; c <= maxC; c++) {
         visited[r][c] = Array(4);
         for (let d = 0; d < 4; d++) {
            visited[r][c][d] = [];
         }
      }
   }

   const statesForHeats = [[[0, 0, 1, 0]]];
   for (let h = 0; h < Infinity; h++) {
      const states = statesForHeats[h];
      if (!states) {
         continue;
      }

      while (states.length > 0) {
         const [r, c, dir, moved] = states.pop();
         if (visited[r][c][dir][moved]) {
            continue;
         }

         visited[r][c][dir][moved] = true;

         if (r === maxR && c === maxC) {
            return h;
         }

         if (moved < 10) {
            const nextR = r + nextDr(dir);
            const nextC = c + nextDc(dir);
            if (nextR >= 0 && nextC >= 0 && nextR <= maxR && nextC <= maxC) {
               const nextHeat = h + input[nextR][nextC];
               statesForHeats[nextHeat] = statesForHeats[nextHeat] || [];
               statesForHeats[nextHeat].push([nextR, nextC, dir, moved + 1]);
            }
         }

         const nextDirs = turns[dir];
         for (const nextDir of nextDirs) {
            const dr = nextDr(nextDir);
            const dc = nextDc(nextDir);
            let shouldMove = true;
            let nextR = r;
            let nextC = c;
            let nextHeat = h;
            for (let i = 0; i < 4; i++) {
               nextR += dr;
               nextC += dc;
               if (nextR >= 0 && nextC >= 0 && nextR <= maxR && nextC <= maxC && !visited[nextR][nextC][nextDir][i]) {
                  visited[nextR][nextC][nextDir][i] = true;
                  nextHeat += input[nextR][nextC];
               } else {
                  shouldMove = false;
                  break;
               }
            }
            if (!shouldMove) {
               continue;
            }

            statesForHeats[nextHeat] = statesForHeats[nextHeat] || [];
            statesForHeats[nextHeat].push([nextR, nextC, nextDir, 4]);
         }
      }
   }

   throw new Error('didnt find target');
};

module.exports = {parseInput, runPart1, runPart2};