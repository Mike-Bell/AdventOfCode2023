const parseInput = input => input.split('\r\n').map(row => row.split(''));

const getStart = input => {
   for (let r = 0; r < input.length; r++) {
      for (let c = 0; c < input[r].length; c++) {
         if (input[r][c] === 'S') {
            return [r, c];
         }
      }
   }
   return [-1, -1];
};

const getNext = (r, c, lr, lc, input) => {
   switch (input[r][c]) {
      case '|': {
         return r > lr ? [r + 1, c] : [r - 1, c];
      }
      case '-': {
         return c > lc ? [r, c + 1] : [r, c - 1];
      }
      case 'L': {
         return r > lr ? [r, c + 1] : [r - 1, c];
      }
      case 'J': {
         return r > lr ? [r, c - 1] : [r - 1, c];
      }
      case '7': {
         return r < lr ? [r, c - 1] : [r + 1, c];
      }
      case 'F': {
         return r < lr ? [r, c + 1] : [r + 1, c];
      }
   }

   throw new Error(`Didnt know how to move from ${r} ${c} ${lr} ${lc}`);
};

const replaceStart = (ri, ci, input) => {
   const left = ri > 0 && ['|', 'F', '7'].includes(input[ri - 1][ci]);
   const right = ['-', 'J', '7'].includes(input[ri][ci + 1]);
   const up = ['-', 'F', 'L'].includes(input[ri][ci - 1]);
   const down = ri < input.length - 1 && ['|', 'L', 'J'].includes(input[ri + 1][ci]);

   if (up && down) {
      input[ri][ci] = '|';
   } else if (left && right) {
      input[ri][ci] = '-';
   } else if (left && up) {
      input[ri][ci] = 'J';
   } else if (left && down) {
      input[ri][ci] = '7';
   } else if (right && up) {
      input[ri][ci] = 'L';
   } else if (right && down) {
      input[ri][ci] = 'F';
   }
};

const runPart1 = input => {
   const [ri, ci] = getStart(input);

   replaceStart(ri, ci, input);
   let [r, c, lr, lc] = [ri, ci, -1, -1];

   for (let i = 0; i < Infinity; i++) {
      [r, c, lr, lc] = [...getNext(r, c, lr, lc, input), r, c];
      if (r === ri && c === ci) {
         return (i + 1) / 2;
      }
   }
   return -1;
};

const runPart2 = input => {
   const [ri, ci] = getStart(input);
   replaceStart(ri, ci, input);

   const pathMask = input.map(row => row.map(() => false));
   let [r, c, lr, lc] = [ri, ci, -1, -1];

   for (let i = 0; i < Infinity; i++) {
      pathMask[r][c] = true;
      [r, c, lr, lc] = [...getNext(r, c, lr, lc, input), r, c];
      if (r === ri && c === ci) {
         pathMask[r][c] = true;
         break;
      }
   }

   let totalInside = 0;
   for (r = 0; r < input.length; r++) {
      let inside = false;
      for (c = 0; c < input[r].length; c++) {
         if (pathMask[r][c]) {
            if (['|', 'F', '7'].includes(input[r][c])) {
               inside = !inside;
            }
         } else if (inside) {
            totalInside++;
         }
      }
   }

   return totalInside;
};

module.exports = {parseInput, runPart1, runPart2};