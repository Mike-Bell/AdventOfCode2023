const parseInput = input => input.split('\r\n').map(row => row.split(''));

const runPart1 = input => {
   const maxR = input.length - 1;
   const maxC = input[0].length - 1;
   const start = [0, 1, -1, -1];

   const intersections = input.map(row => row.map(() => 0));
   for (let r = 0; r <= maxR; r++) {
      for (let c = 0; c <= maxC; c++) {
         let feeders = 0;
         if (r > 0 && input[r - 1][c] === 'v') {
            feeders++;
         }
         if (r < maxR && input[r + 1][c] === '^') {
            feeders++;
         }
         if (c > 0 && input[r][c - 1] === '>') {
            feeders++;
         }
         if (c < maxC && input[r][c + 1] === '<') {
            feeders++;
         }
         intersections[r][c] = feeders;
      }
   }

   const traveled = input.map(row => row.map(() => 0));
   traveled[start[0]][start[1]] = true;

   let states = [start];

   let i = -1;
   let max = -1;
   while (states.length > 0) {
      i++;
      const nextStates = [];
      for (const state of states) {
         const r = state[0];
         const c = state[1];
         const lastR = state[2];
         const lastC = state[3];

         if (r === maxR && c === maxC - 1) {
            if (i > max) {
               max = i;
            }
         }

         if (lastR !== -1) {
            const lastTile = input[lastR][lastC];
            if (lastTile !== '.') {
               traveled[r][c]++;
               if (traveled[r][c] < intersections[r][c]) {
                  continue;
               }
            }
         }

         for (const d of [-1, 1]) {
            let nextR = r + d;
            let nextC = c;
            if (nextR >= 0 && nextR <= maxR && nextC >= 0 && nextC <= maxC && (nextR !== lastR || nextC !== lastC)) {
               const nextTile = input[nextR][nextC];
               if (nextTile === '.' || (nextTile === '^' && d === -1) || (nextTile === 'v' && d === 1)) {
                  nextStates.push([nextR, nextC, r, c]);
               }
            }

            nextR = r;
            nextC = c + d;
            if (nextR >= 0 && nextR <= maxR && nextC >= 0 && nextC <= maxC && (nextR !== lastR || nextC !== lastC)) {
               const nextTile = input[nextR][nextC];
               if (nextTile === '.' || (nextTile === '<' && d === -1) || (nextTile === '>' && d === 1)) {
                  nextStates.push([nextR, nextC, r, c]);
               }
            }
         }
      }
      states = nextStates;
   }

   return max;
};

const runPart2 = input => {
   const maxR = input.length - 1;
   const maxC = input[0].length - 1;
   const start = [0, 1, -1, -1, 0, 0];

   const nodes = [[0, 1], [maxR, maxC - 1]];
   const edges = [[], []];

   const traveled = input.map(row => row.map(() => false));

   let states = [start];

   while (states.length > 0) {
      const nextStates = [];
      for (const state of states) {
         const r = state[0];
         const c = state[1];
         const lastR = state[2];
         const lastC = state[3];
         const lastNode = state[4];
         const distanceFromLastNode = state[5];

         if (r === maxR && c === maxC - 1) {
            edges[lastNode] = edges[lastNode] || [];
            edges[lastNode].push([1, distanceFromLastNode]);
         }

         const s = [];
         for (const d of [-1, 1]) {
            let nextR = r + d;
            let nextC = c;
            if (nextR >= 0 && nextR <= maxR && nextC >= 0 && nextC <= maxC && (nextR !== lastR || nextC !== lastC)) {
               const nextTile = input[nextR][nextC];
               if (nextTile !== '#') {
                  s.push([nextR, nextC, r, c, lastNode, distanceFromLastNode + 1]);
               }
            }

            nextR = r;
            nextC = c + d;
            if (nextR >= 0 && nextR <= maxR && nextC >= 0 && nextC <= maxC && (nextR !== lastR || nextC !== lastC)) {
               const nextTile = input[nextR][nextC];
               if (nextTile !== '#') {
                  s.push([nextR, nextC, r, c, lastNode, distanceFromLastNode + 1]);
               }
            }
         }
         if (s.length > 1) {
            let nodeIndex = nodes.findIndex(n => n[0] === r && n[1] === c);
            if (nodeIndex === -1) {
               nodes.push([r, c]);
               nodeIndex = nodes.length - 1;
            }

            edges[lastNode] = edges[lastNode] || [];
            if (!edges[lastNode].some(e => e[0] === nodeIndex)) {
               edges[lastNode].push([nodeIndex, distanceFromLastNode]);
            }

            edges[nodeIndex] = edges[nodeIndex] || [];
            if (!edges[nodeIndex].some(e => e[0] === lastNode)) {
               edges[nodeIndex].push([lastNode, distanceFromLastNode]);
            }
            for (const ss of s) {
               ss[4] = nodeIndex;
               ss[5] = 1;
            }
         }

         if (s.length > 1) {
            if (traveled[r][c]) {
               continue;
            }
            traveled[r][c] = true;
         }

         for (const ss of s) {
            nextStates.push(ss);
         }
      }
      states = nextStates;
   }

   let target = 1;
   let distanceToTrueTarget = 0;
   // eslint-disable-next-line no-constant-condition
   while (true) {
      const edgesPointingAtTarget = [];
      for (let e = 0; e < edges.length; e++) {
         const edgeSet = edges[e];
         for (const edge of edgeSet) {
            if (edge[0] === target) {
               edgesPointingAtTarget.push([e, edge[1]]);
            }
         }
      }
      if (edgesPointingAtTarget.length === 1) {
         target = edgesPointingAtTarget[0][0];
         distanceToTrueTarget += edgesPointingAtTarget[0][1];
      } else {
         break;
      }
   }

   let max = 0;
   const seen = new Array(nodes.length).fill(false);
   const search = (curNode, distance) => {
      if (curNode === target) {
         if (distance > max) {
            max = distance;
         }
         return;
      }

      seen[curNode] = true;
      const edgeSet = edges[curNode];
      for (const edge of edgeSet) {
         const nextNode = edge[0];
         if (!seen[nextNode]) {
            search(nextNode, distance + edge[1]);
         }
      }
      seen[curNode] = false;
   };
   search(0, 0);

   return max + distanceToTrueTarget;
};

module.exports = {parseInput, runPart1, runPart2};