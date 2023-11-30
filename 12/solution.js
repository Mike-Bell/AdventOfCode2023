const parseInput = input => input.split('\r\n').map(row => {
   const [a, b] = row.split(' ');
   return [a.split('').map(c => {
      switch (c) {
         case '#': {
            return 1;
         } case '.': {
            return -1;
         } default: {
            return 0;
         }
      }
   }), b.split(',').map(Number)];
});

const runPart1 = input => input.map(row => {
   const [parts, criteria] = row;
   const nParts = parts.length;
   const nCriteria = criteria.length;
   let candidates = Array(nParts + 2).fill(0);
   candidates[0] = 1;
   for (let c = 0; c < nCriteria; c++) {
      const crit = criteria[c];
      const nextCandidates = Array(nParts + 2).fill(0);
      let necessaryRemainingSpaces = crit;
      for (let i = c + 1; i < nCriteria; i++) {
         necessaryRemainingSpaces += criteria[i] + 1;
      }
      for (let candidate = 0; candidate < nParts; candidate++) {
         const count = candidates[candidate];
         if (count === 0) {
            continue;
         }
         for (let j = candidate; j < nParts - necessaryRemainingSpaces + 1; j++) {
            if (parts[j] === -1) {
               continue;
            }

            let isValid = parts[j + crit] !== 1;
            if (isValid) {
               for (let k = 0; k < crit; k++) {
                  if (parts[j + k] === -1) {
                     isValid = false;
                     break;
                  }
               }
            }

            if (isValid && c === nCriteria - 1) {
               for (let k = j + crit; k < nParts; k++) {
                  if (parts[k] === 1) {
                     isValid = false;
                     break;
                  }
               }
            }

            if (isValid) {
               nextCandidates[j + crit + 1] += count;
            }

            if (parts[j] === 1) {
               break;
            }
         }
      }
      candidates = nextCandidates;
   }
   return candidates.reduce((acc, curr) => acc + curr);
}).reduce((acc, curr) => acc + curr);

const runPart2 = input => input.map(row => {
   let [parts, criteria] = row;
   parts = [...parts, '?', ...parts, '?', ...parts, '?', ...parts, '?', ...parts];
   criteria = [...criteria, ...criteria, ...criteria, ...criteria, ...criteria];
   const nParts = parts.length;
   const nCriteria = criteria.length;
   let candidates = Array(nParts + 2).fill(0);
   candidates[0] = 1;
   for (let c = 0; c < nCriteria; c++) {
      const crit = criteria[c];
      const nextCandidates = Array(nParts + 2).fill(0);
      let necessaryRemainingSpaces = crit;
      for (let i = c + 1; i < nCriteria; i++) {
         necessaryRemainingSpaces += criteria[i] + 1;
      }
      for (let candidate = 0; candidate < nParts; candidate++) {
         const count = candidates[candidate];
         if (count === 0) {
            continue;
         }
         for (let j = candidate; j < nParts - necessaryRemainingSpaces + 1; j++) {
            if (parts[j] === -1) {
               continue;
            }

            let isValid = parts[j + crit] !== 1;
            if (isValid) {
               for (let k = 0; k < crit; k++) {
                  if (parts[j + k] === -1) {
                     isValid = false;
                     break;
                  }
               }
            }

            if (isValid && c === nCriteria - 1) {
               for (let k = j + crit; k < nParts; k++) {
                  if (parts[k] === 1) {
                     isValid = false;
                     break;
                  }
               }
            }

            if (isValid) {
               nextCandidates[j + crit + 1] += count;
            }

            if (parts[j] === 1) {
               break;
            }
         }
      }
      candidates = nextCandidates;
   }
   return candidates.reduce((acc, curr) => acc + curr);
}).reduce((acc, curr) => acc + curr);

module.exports = {parseInput, runPart1, runPart2};