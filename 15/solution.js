const parseInput = input => input.split(',');

const runPart1 = input => input.map(str => {
   let cur = 0;
   for (let i = 0; i < str.length; i++) {
      cur = ((cur + str.charCodeAt(i)) * 17) % 256;
   }
   return cur;
}).reduce((acc, curr) => acc + curr);

const runPart2 = input => {
   const boxes = Array(256).fill(null).map(() => []);
   for (const str of input) {
      let n = 0;
      const op = str.at(-1) === '-' ? '-' : str.slice(str.length - 2, str.length);
      const label = str.slice(0, str.length - (op === '-' ? 1 : 2));

      for (let i = 0; i < label.length; i++) {
         n = ((n + label.charCodeAt(i)) * 17) % 256;
      }

      boxes[n].push({label, op});
   }

   return boxes.map((box, i) => {
      const labels = [];
      const powers = {};

      for (const {label, op} of box) {
         const labelIndex = labels.indexOf(label);
         if (labelIndex === -1) {
            if (op !== '-') {
               labels.push(label);
               powers[label] = Number(op[1]);
            }
         } else if (op !== '-') {
            powers[label] = Number(op[1]);
         } else {
            labels.splice(labelIndex, 1);
         }
      }

      return labels.length === 0 ? 0 : labels
         .map((label, j) => (i + 1) * (j + 1) * powers[label])
         .reduce((acc, curr) => acc + curr);
   }).reduce((acc, curr) => acc + curr);
};

module.exports = {parseInput, runPart1, runPart2};