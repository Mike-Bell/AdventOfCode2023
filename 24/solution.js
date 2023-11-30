const z3Solver = require('z3-solver');

const parseInput = input => input.split('\r\n').map(row => row.split(' @ ').map(part => part.split(', ').map(Number)));

const runPart1 = input => {
   const areaStart = 200000000000000;
   const areaEnd = 400000000000000;
   let intersections = 0;
   const stones = input.map(s => {
      const slope = s[1][1] / s[1][0];
      const c = -1 * slope * s[0][0] + s[0][1];
      return [s[0][0], s[1][0], slope, c];
   });
   for (let i = 0; i < stones.length; i++) {
      const stone1 = stones[i];
      const x01 = stone1[0];
      const dx1 = stone1[1];
      const slope1 = stone1[2];
      const c1 = stone1[3];
      const a1 = slope1;
      const b1 = -1;
      for (let j = i + 1; j < input.length; j++) {
         const stone2 = stones[j];
         const x02 = stone2[0];
         const dx2 = stone2[1];
         const slope2 = stone2[2];
         const c2 = stone2[3];
         const a2 = slope2;
         const b2 = -1;
         const intersectionX = (b1 * c2 - b2 * c1) / (a1 * b2 - a2 * b1);
         const intersectionY = (a2 * c1 - a1 * c2) / (a1 * b2 - a2 * b1);
         const isInside = areaStart <= intersectionX
            && intersectionX <= areaEnd
            && areaStart <= intersectionY
            && intersectionY <= areaEnd;

         const p1IsFuture = (intersectionX - x01) / dx1 > 0;
         const p2IsFuture = (intersectionX - x02) / dx2 > 0;

         if (isInside && p1IsFuture && p2IsFuture) {
            intersections++;
         }
      }
   }

   return intersections;
};

const runPart2 = async input => {
   const solverInit = await z3Solver.init();
   const solverContext = solverInit.Context('aoc');
   const x = solverContext.Real.const('x');
   const y = solverContext.Real.const('y');
   const z = solverContext.Real.const('z');

   const dx = solverContext.Real.const('dx');
   const dy = solverContext.Real.const('dy');
   const dz = solverContext.Real.const('dz');

   const solver = new solverContext.Solver();

   for (let i = 0; i < 3; i++) {
      const stone = input[i];
      const t = solverContext.Real.const(`t${i}`);
      solver.add(t.ge(0));
      solver.add(x.add(dx.mul(t)).eq(t.mul(stone[1][0]).add(stone[0][0])));
      solver.add(y.add(dy.mul(t)).eq(t.mul(stone[1][1]).add(stone[0][1])));
      solver.add(z.add(dz.mul(t)).eq(t.mul(stone[1][2]).add(stone[0][2])));
   }

   await solver.check();
   const model = solver.model();
   const rx = Number(model.eval(x));
   const ry = Number(model.eval(y));
   const rz = Number(model.eval(z));
   return rx + ry + rz;
};

module.exports = {parseInput, runPart1, runPart2};