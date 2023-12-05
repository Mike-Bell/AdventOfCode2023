const parseInput = input => input.split('\r\n');

const runPart1 = input => {
   const seeds = input[0].slice(7).split(' ').map(Number);
   const maps = [];
   let curMap = [];
   for (let i = 3; i < input.length; i++) {
      const r = input[i];
      if (!r) {
         maps.push(curMap);
         curMap = [];
         i++;
         continue;
      }
      const [dest, src, len] = r.split(' ').map(Number);
      curMap.push({start: src, diff: dest - src, end: src + len - 1});
   }

   if (curMap.length) {
      maps.push(curMap);
   }

   const locations = seeds.map(seed => {
      let location = seed;
      for (const map of maps) {
         // eslint-disable-next-line no-loop-func
         const mapper = map.find(m => m.start <= location && m.end >= location) || {diff: 0};
         location += mapper.diff;
      }
      return location;
   });

   return Math.min(...locations);
};

const runPart2 = input => {
   const seeds = input[0].slice(7).split(' ').map(Number);
   const maps = [];
   let curMap = [];
   for (let i = 3; i < input.length; i++) {
      const r = input[i];
      if (!r) {
         maps.push(curMap);
         curMap = [];
         i++;
         continue;
      }
      const [dest, src, len] = r.split(' ').map(Number);
      // map backwards
      curMap.push({start: dest, diff: src - dest, end: dest + len - 1});
   }

   if (curMap.length) {
      maps.push(curMap);
   }

   const backMaps = maps.reverse();
   const seedMaps = [];
   for (let i = 0; i < seeds.length; i += 2) {
      seedMaps.push({start: seeds[i], end: seeds[i] + seeds[i + 1] - 1});
   }

   for (let location0 = 0; location0 < Infinity; location0++) {
      let location = location0;
      for (const map of backMaps) {
         // eslint-disable-next-line no-loop-func
         const mapper = map.find(m => m.start <= location && m.end >= location) || {diff: 0};
         location += mapper.diff;
      }

      if (seedMaps.some(m => m.start <= location && m.end >= location)) {
         return location0;
      }
   }

   return -1;
};

module.exports = {parseInput, runPart1, runPart2};