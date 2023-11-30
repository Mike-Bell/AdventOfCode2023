const parseInput = input => input.split('\r\n').map(row => row.split('~').map(section => section.split(',').map(Number)));

const runPart1 = input => {
   input = input.sort((a, b) => a[1][2] - b[1][2]);

   let supportedBy = [];
   for (let b = 0; b < input.length; b++) {
      const brick = input[b];
      const x0 = brick[0][0];
      const x1 = brick[1][0];
      const y0 = brick[0][1];
      const y1 = brick[1][1];

      const thisSupportedBy = [];
      for (let x = x0; x <= x1; x++) {
         for (let y = y0; y <= y1; y++) {
            for (let b2 = b - 1; b2 >= 0; b2--) {
               const brick2 = input[b2];
               if (brick2[0][0] <= x && brick2[1][0] >= x && brick2[0][1] <= y && brick2[1][1] >= y) {
                  if (!thisSupportedBy.includes(b2)) {
                     thisSupportedBy.push(b2);
                  }
                  break;
               }
            }
         }
      }
      supportedBy[b] = thisSupportedBy;
   }

   let shouldContinue = true;
   while (shouldContinue) {
      shouldContinue = false;
      for (let b = 0; b < input.length; b++) {
         const brick = input[b];
         const zEnd = brick[0][2];

         const canFall = zEnd > 0 && supportedBy[b].every(s => input[s][1][2] < zEnd - 1);
         if (canFall) {
            brick[0][2]--;
            brick[1][2]--;
            shouldContinue = true;
         }
      }
   }

   supportedBy = supportedBy.map((sup, b) => sup.filter(b2 => input[b2][1][2] === input[b][0][2] - 1));
   let candidates = 0;
   for (let b = 0; b < supportedBy.length; b++) {
      let canDisintegrate = true;
      for (let b2 = b + 1; b2 < supportedBy.length; b2++) {
         if (supportedBy[b2].length === 1 && supportedBy[b2][0] === b) {
            canDisintegrate = false;
         }
      }
      if (canDisintegrate) {
         candidates++;
      }
   }

   return candidates;
};

const runPart2 = input => {
   input = input.sort((a, b) => a[1][2] - b[1][2]);

   let supportedBy = [];
   for (let b = 0; b < input.length; b++) {
      const brick = input[b];
      const x0 = brick[0][0];
      const x1 = brick[1][0];
      const y0 = brick[0][1];
      const y1 = brick[1][1];

      const thisSupportedBy = [];
      for (let x = x0; x <= x1; x++) {
         for (let y = y0; y <= y1; y++) {
            for (let b2 = b - 1; b2 >= 0; b2--) {
               const brick2 = input[b2];
               if (brick2[0][0] <= x && brick2[1][0] >= x && brick2[0][1] <= y && brick2[1][1] >= y) {
                  if (!thisSupportedBy.includes(b2)) {
                     thisSupportedBy.push(b2);
                  }
                  break;
               }
            }
         }
      }
      supportedBy[b] = thisSupportedBy;
   }

   let shouldContinue = true;
   while (shouldContinue) {
      shouldContinue = false;
      for (let b = 0; b < input.length; b++) {
         const brick = input[b];
         const zEnd = brick[0][2];

         const canFall = zEnd > 0 && supportedBy[b].every(s => input[s][1][2] < zEnd - 1);
         if (canFall) {
            brick[0][2]--;
            brick[1][2]--;
            shouldContinue = true;
         }
      }
   }

   supportedBy = supportedBy.map((sup, b) => sup.filter(b2 => input[b2][1][2] === input[b][0][2] - 1));
   let ans = 0;
   for (let b = 0; b < supportedBy.length; b++) {
      const disintegrations = [b];
      for (let b2 = b + 1; b2 < supportedBy.length; b2++) {
         if (supportedBy[b2].length > 0 && supportedBy[b2].every(s => disintegrations.includes(s))) {
            disintegrations.push(b2);
         }
      }

      ans += disintegrations.length - 1;
   }

   return ans;
};

module.exports = {parseInput, runPart1, runPart2};