const parseInput = input => input.split('\r\n').map(row => row.split(' ').map(Number));

const runPart1 = input => input.map(row => {
   const rows = [row];
   // eslint-disable-next-line no-constant-condition
   while (true) {
      const nextRow = [];
      const previousRow = rows.at(-1);
      let allZeros = true;
      for (let i = 1; i < previousRow.length; i++) {
         const nextVal = previousRow[i] - previousRow[i - 1];
         allZeros = allZeros && nextVal === 0;
         nextRow.push(nextVal);
      }
      rows.push(nextRow);
      if (allZeros) {
         break;
      }
   }

   for (let i = rows.length - 1; i > 0; i--) {
      rows[i - 1].push(rows[i].at(-1) + rows[i - 1].at(-1));
   }
   return rows[0].at(-1);
}).reduce((acc, curr) => acc + curr);

const runPart2 = input => input.map(row => {
   const rows = [row];
   // eslint-disable-next-line no-constant-condition
   while (true) {
      const nextRow = [];
      const previousRow = rows.at(-1);
      let allZeros = true;
      for (let i = 1; i < previousRow.length; i++) {
         const nextVal = previousRow[i] - previousRow[i - 1];
         allZeros = allZeros && nextVal === 0;
         nextRow.push(nextVal);
      }
      rows.push(nextRow);
      if (allZeros) {
         break;
      }
   }

   for (let i = rows.length - 1; i > 0; i--) {
      rows[i - 1].unshift(rows[i - 1][0] - rows[i][0]);
   }
   return rows[0][0];
}).reduce((acc, curr) => acc + curr);

module.exports = {parseInput, runPart1, runPart2};