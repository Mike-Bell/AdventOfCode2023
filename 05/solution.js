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
      curMap.push({start: src, diff: dest - src, end: src + len - 1});
   }

   if (curMap.length) {
      maps.push(curMap);
   }

   const seedMaps = [];
   for (let i = 0; i < seeds.length; i += 2) {
      seedMaps.push({start: seeds[i], end: seeds[i] + seeds[i + 1] - 1});
   }

   maps.forEach(mapSet => {
      mapSet.sort((m1, m2) => m1.start - m2.start);
   });

   let ranges = seedMaps;
   for (const mapSet of maps) {
      const nextRanges = [];
      for (const range of ranges) {
         let rangeN = range.start;
         const map0 = mapSet.find(map => map.end >= range.start);
         if (map0 && map0.end >= rangeN && map0.start <= rangeN) {
            const rangeEnd = Math.min(range.end, map0.end);
            nextRanges.push({start: rangeN + map0.diff, end: rangeEnd + map0.diff});
            rangeN = rangeEnd + 1;
         }
         for (const map of mapSet) {
            if (map.start >= rangeN && map.start <= range.end) {
               if (map.start > rangeN) {
                  nextRanges.push({start: rangeN, end: map.start - 1});
               }
               const rangeEnd = Math.min(range.end, map.end);
               nextRanges.push({start: map.start + map.diff, end: rangeEnd + map.diff});
               rangeN = rangeEnd + 1;
            }
         }
         if (rangeN === range.start) {
            nextRanges.push(range);
         } else if (rangeN < range.end) {
            nextRanges.push({start: rangeN, end: range.end});
         }
      }
      ranges = nextRanges;
   }

   return Math.min(...ranges.map(r => r.start));
};

module.exports = {parseInput, runPart1, runPart2};