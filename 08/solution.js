const lcm = require('../utils/lcm');

const parseInput = input => {
   const lines = input.split('\r\n');
   const instructions = lines[0].split('').map(c => c === 'L' ? 0 : 1);
   const nodes = {};
   for (const line of lines.slice(2)) {
      nodes[line.slice(0, 3)] = [line.slice(7, 10), line.slice(12, 15)];
   }

   return {instructions, nodes};
};

const runPart1 = input => {
   const {instructions, nodes} = input;
   let node = 'AAA';
   for (let i = 0; i < Infinity; i++) {
      node = nodes[node][instructions[i % instructions.length]];
      if (node === 'ZZZ') {
         return i + 1;
      }
   }
   return -1;
};

const runPart2 = input => {
   const {instructions, nodes} = input;
   return Object.keys(nodes)
      .filter(key => key[2] === 'A')
      .map(node => {
         for (let i = 0; i < Infinity; i++) {
            node = nodes[node][instructions[i % instructions.length]];
            if (node[2] === 'Z') {
               return i + 1;
            }
         }
         return -1;
      })
      .reduce((acc, curr) => lcm(acc, curr));
};

module.exports = {parseInput, runPart1, runPart2};