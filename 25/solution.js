const parseInput = input => {
   const edgeMap = {};
   const nodes = [];
   const rows = input.split('\r\n');
   for (const row of rows) {
      const [source, destSection] = row.split(': ');
      if (!nodes.includes(source)) {
         nodes.push(source);
      }

      const dests = destSection.split(' ');
      for (const dest of dests) {
         edgeMap[source] = edgeMap[source] || [];
         edgeMap[source].push(dest);
         edgeMap[dest] = edgeMap[dest] || [];
         edgeMap[dest].push(source);
         if (!nodes.includes(dest)) {
            nodes.push(dest);
         }
      }
   }

   return {nodes, edgeMap};
};

const runPart1 = input => {
   const {nodes, edgeMap} = input;

   const edgesEncountered = {};

   for (let n = 0; n < nodes.length; n++) {
      const visited = {};
      const curNodes = [nodes[n]];
      while (curNodes.length > 0) {
         const curNode = curNodes.shift();
         visited[curNode] = true;
         for (const nextNode of edgeMap[curNode]) {
            if (!visited[nextNode]) {
               const edgeKey = [curNode, nextNode].sort().join('-');
               edgesEncountered[edgeKey] = (edgesEncountered[edgeKey] || 0) + 1;
               curNodes.push(nextNode);
            }
         }
      }
   }

   // eslint-disable-next-line no-constant-condition
   while (true) {
      let maxEdge = '';
      let maxN = 0;
      for (const [key, n] of Object.entries(edgesEncountered)) {
         if (n > maxN) {
            maxEdge = key;
            maxN = n;
         }
      }

      delete edgesEncountered[maxEdge];

      const [source, dest] = maxEdge.split('-');
      edgeMap[source] = edgeMap[source].filter(node => node !== dest);
      edgeMap[dest] = edgeMap[dest].filter(node => node !== source);

      const visited = {};
      const curNodes = [nodes[0]];
      while (curNodes.length > 0) {
         const curNode = curNodes.shift();
         visited[curNode] = true;
         for (const nextNode of edgeMap[curNode]) {
            if (!visited[nextNode]) {
               curNodes.push(nextNode);
            }
         }
      }

      const nVisited = Object.keys(visited).length;
      if (nVisited < nodes.length) {
         return nVisited * (nodes.length - nVisited);
      }
   }
};

const runPart2 = () => 'DONE';

module.exports = {parseInput, runPart1, runPart2};