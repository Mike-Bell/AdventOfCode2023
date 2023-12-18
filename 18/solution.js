const parseInput = input => input.split('\r\n').map(row => {
   const splitRow = row.split(' ');
   return [splitRow[0], Number(splitRow[1]), splitRow[2].slice(2, -1)];
});

const runPart1 = input => {
   const vertices = [];
   let r = 0;
   let c = 0;
   let perimeter = 0;
   for (const inp of input) {
      vertices.push([r, c]);
      let dr;
      let dc;
      switch (inp[0]) {
         case 'U': {
            dr = -1;
            dc = 0;
            break;
         }
         case 'R': {
            dr = 0;
            dc = 1;
            break;
         }
         case 'D': {
            dr = 1;
            dc = 0;
            break;
         }
         case 'L': {
            dr = 0;
            dc = -1;
            break;
         }
      }

      const amount = inp[1];
      perimeter += amount;
      r += dr * amount;
      c += dc * amount;
   }

   vertices.push([0, 0]);

   let area = 0;
   for (let v = 0; v < vertices.length - 1; v++) {
      area += vertices[v][0] * vertices[v + 1][1] - vertices[v + 1][0] * vertices[v][1];
   }

   return (Math.abs(area) + perimeter) / 2 + 1;
};

const runPart2 = input => {
   const vertices = [];
   let r = 0;
   let c = 0;
   let perimeter = 0;
   for (const inp of input) {
      vertices.push([r, c]);
      let dr;
      let dc;
      const dir = inp[2][5];
      switch (dir) {
         case '3': {
            dr = -1;
            dc = 0;
            break;
         }
         case '0': {
            dr = 0;
            dc = 1;
            break;
         }
         case '1': {
            dr = 1;
            dc = 0;
            break;
         }
         case '2': {
            dr = 0;
            dc = -1;
            break;
         }
      }

      const amount = parseInt(inp[2].slice(0, 5), 16);
      perimeter += amount;
      r += dr * amount;
      c += dc * amount;
   }

   vertices.push([0, 0]);

   let area = 0;
   for (let v = 0; v < vertices.length - 1; v++) {
      area += vertices[v][0] * vertices[v + 1][1] - vertices[v + 1][0] * vertices[v][1];
   }

   return (Math.abs(area) + perimeter) / 2 + 1;
};

module.exports = {parseInput, runPart1, runPart2};