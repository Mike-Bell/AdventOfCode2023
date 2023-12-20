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

   for (let i = 1; i < 1000; i++) {
      let states = [[false, 'broadcaster', 'button']];
      let lows = 0;
      while (states.length > 0) {
         const nextStates = [];
         for (const [signal, nodeName, sourceName] of states) {
            if (nodeName === 'rx') {
               if (!signal) {
                  lows++;
               }
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
         if (lows === 1) {
            return i;
         }
      }
   }

   return -1;
};

module.exports = {parseInput, runPart1, runPart2};