const lcm = require('../utils/lcm');

const parseInput = input => {
   const splitLines = input.split('\r\n').map(row => row.split(' -> '));
   const nodes = {};
   for (const [nodePart, destPart] of splitLines) {
      const dest = destPart.split(', ');
      if (nodePart[0] === '%' || nodePart[0] === '&') {
         nodes[nodePart.slice(1)] = {
            type: nodePart[0],
            dest: dest,
            label: nodePart.slice(1)
         };
      } else {
         nodes[nodePart] = {
            type: 'normal',
            dest: dest,
            label: nodePart
         };
      }
   }

   return nodes;
};

const runPart1 = input => {
   for (const [nodeName, node] of Object.entries(input)) {
      if (node.type === '%') {
         node.state = false;
      }

      for (const destName of node.dest) {
         const destNode = input[destName];
         if (!destNode) {
            continue;
         }
         if (destNode.type === '&') {
            destNode.state = destNode.state || {};
            destNode.state[nodeName] = false;
         }
      }
   }

   let lows = 0;
   let highs = 0;
   for (let i = 0; i < 1000; i++) {
      let states = [[false, 'broadcaster', 'button']];
      while (states.length > 0) {
         const nextStates = [];
         for (const [signal, nodeName, sourceName] of states) {
            if (signal) {
               highs++;
            } else {
               lows++;
            }

            const node = input[nodeName];
            if (!node) {
               continue;
            }
            if (nodeName === 'broadcaster') {
               for (const destName of node.dest) {
                  nextStates.push([signal, destName, node]);
               }
            } else if (node.type === '%') {
               if (!signal) {
                  node.state = !node.state;
                  for (const dest of node.dest) {
                     nextStates.push([node.state, dest, node]);
                  }
               }
            } else if (node.type === '&') {
               node.state[sourceName] = signal;
               const nextSignal = !Object.values(node.state).every(v => v);
               for (const dest of node.dest) {
                  nextStates.push([nextSignal, dest, nodeName]);
               }
            }
         }
         states = nextStates;
      }
   }

   return lows * highs;
};

const runPart2 = input => {
   const inputEntries = Object.entries(input);
   for (const [nodeName, node] of inputEntries) {
      if (node.type === '%') {
         node.state = false;
      }
      for (const destName of node.dest) {
         const destNode = input[destName];
         if (!destNode) {
            continue;
         }
         if (destNode.type === '&') {
            destNode.state = destNode.state || {};
            destNode.state[nodeName] = false;
         }
      }
   }

   let targetNames = ['rx'];
   while (targetNames.length === 1) {
      const nextTargets = [];
      for (const targetName of targetNames) {
         for (const [nodeName, node] of inputEntries) {
            if (node.dest.includes(targetName)) {
               nextTargets.push(nodeName);
            }
         }
      }
      targetNames = nextTargets;
   }

   const targetCycles = Array(Object.keys(targetNames).length).fill(0);

   let i = 0;
   let shouldContinue = true;
   while (shouldContinue) {
      i++;
      let states = [[false, 'broadcaster', 'button']];
      while (states.length > 0) {
         const nextStates = [];
         for (const [signal, nodeName, sourceName] of states) {
            if (signal && targetNames.includes(sourceName)) {
               const ind = targetNames.indexOf(sourceName);
               targetCycles[ind] = targetCycles[ind] || i;
               shouldContinue = targetCycles.some(c => c === 0);
            }

            const node = input[nodeName];
            if (!node) {
               continue;
            }
            if (nodeName === 'broadcaster') {
               for (const destName of node.dest) {
                  nextStates.push([signal, destName, nodeName]);
               }
            } else if (node.type === '%') {
               if (!signal) {
                  node.state = !node.state;
                  for (const destName of node.dest) {
                     nextStates.push([node.state, destName, nodeName]);
                  }
               }
            } else if (node.type === '&') {
               node.state[sourceName] = signal;
               const nextSignal = !Object.values(node.state).every(v => v);
               for (const destName of node.dest) {
                  nextStates.push([nextSignal, destName, nodeName]);
               }
            }
         }
         states = nextStates;
      }
   }

   return targetCycles.reduce((acc, curr) => lcm(acc, curr));
};

module.exports = {parseInput, runPart1, runPart2};