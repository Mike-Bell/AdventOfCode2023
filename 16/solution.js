const parseInput = input => input.split('\r\n').map(row => row.split(''));

const next = {
   '.': [
      [-1, 0, 0],
      [0, 1, 1],
      [1, 0, 2],
      [0, -1, 3]
   ],
   '/': [
      [0, 1, 1],
      [-1, 0, 0],
      [0, -1, 3],
      [1, 0, 2]
   ],
   '\\': [
      [0, -1, 3],
      [1, 0, 2],
      [0, 1, 1],
      [-1, 0, 0]
   ],
   '-': [
      [[0, 1, 1], [0, -1, 3]],
      [0, 1, 1],
      [[0, 1, 1], [0, -1, 3]],
      [0, -1, 3]
   ],
   '|': [
      [-1, 0, 0],
      [[-1, 0, 0], [1, 0, 2]],
      [1, 0, 2],
      [[-1, 0, 0], [1, 0, 2]]
   ]
};

const runPart1 = input => {
   const beams = [[0, 0, 1]];
   const traveledByDir = input.map(row => row.map(() => ([false, false, false, false])));
   const traveled = input.map(row => row.map(() => false));
   const maxR = input.length - 1;
   const maxC = input[0].length - 1;
   while (beams.length > 0) {
      const beam = beams[0];
      const [r, c, dir] = beam;
      if (r < 0 || c < 0 || r > maxR || c > maxC || traveledByDir[r][c][dir]) {
         beams.shift();
         continue;
      }

      traveled[r][c] = true;
      traveledByDir[r][c][dir] = true;

      const cell = input[r][c];
      const [dr, dc, nextDir] = next[cell][dir];
      const isNested = dr.length;
      if (isNested) {
         const [dr1, dc1, nextDir1] = dr;
         const [dr2, dc2, nextDir2] = dc;
         const newBeam = [beam[0] + dr2, beam[1] + dc2, nextDir2];
         beam[0] += dr1;
         beam[1] += dc1;
         beam[2] = nextDir1;
         beams.unshift(newBeam);
      } else {
         beam[0] += dr;
         beam[1] += dc;
         beam[2] = nextDir;
      }
   }

   let total = 0;
   for (const row of traveled) {
      for (const cell of row) {
         if (cell) {
            total++;
         }
      }
   }

   return total;
};

const runPart2 = input => {
   const maxR = input.length - 1;
   const maxC = input[0].length - 1;
   const startingBeams = [
      [0, 0, 1], [0, 0, 2],
      [maxR, 0, 3], [maxR, 0, 2],
      [maxR, maxC, 0], [maxR, maxC, 3],
      [0, maxC, 0], [0, maxC, 1]
   ];

   for (let i = 1; i < maxR; i++) {
      startingBeams.push([i, 0, 1]);
      startingBeams.push([i, maxC, 3]);
   }

   for (let i = 1; i < maxC; i++) {
      startingBeams.push([0, i, 2]);
      startingBeams.push([maxR, i, 0]);
   }

   const traveledByDir = input.map(row => row.map(() => ([false, false, false, false])));
   const traveled = input.map(row => row.map(() => false));
   const results = startingBeams.map((startingBeam, i) => {
      if (i > 0) {
         for (let r = 0; r <= maxR; r++) {
            for (let c = 0; c <= maxC; c++) {
               traveled[r][c] = false;
               traveledByDir[r][c][0] = false;
               traveledByDir[r][c][1] = false;
               traveledByDir[r][c][2] = false;
               traveledByDir[r][c][3] = false;
            }
         }
      }
      const beams = [startingBeam];
      while (beams.length > 0) {
         const beam = beams[0];
         const r = beam[0];
         const c = beam[1];
         const dir = beam[2];
         if (r < 0 || c < 0 || r > maxR || c > maxC || traveledByDir[r][c][dir]) {
            beams.shift();
            continue;
         }

         traveled[r][c] = true;
         traveledByDir[r][c][dir] = true;

         const cell = input[r][c];
         const [dr, dc, nextDir] = next[cell][dir];
         const isNested = dr.length;
         if (isNested) {
            const [dr1, dc1, nextDir1] = dr;
            const [dr2, dc2, nextDir2] = dc;
            const newBeam = [beam[0] + dr2, beam[1] + dc2, nextDir2];
            beam[0] += dr1;
            beam[1] += dc1;
            beam[2] = nextDir1;
            beams.unshift(newBeam);
         } else {
            beam[0] += dr;
            beam[1] += dc;
            beam[2] = nextDir;
         }
      }

      let total = 0;
      for (const row of traveled) {
         for (const cell of row) {
            if (cell) {
               total++;
            }
         }
      }

      return total;
   });

   return Math.max(...results);
};

module.exports = {parseInput, runPart1, runPart2};