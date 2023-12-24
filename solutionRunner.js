const fs = require('fs');
const solutionArg = process.argv[2];
const isForce = process.argv[3] === 'force';

if (!solutionArg) {
   console.log('Provide a number or number-number arg.\n For example: "npm run solution 1" or "npm run solution 7-2"');
   process.exit();
}

console.time('full run');

const runDay = async (day, partOrNot) => {
   if (day.length === 1) {
      day = `0${day}`;
   }

   const input = fs.readFileSync(`./${day}/input.txt`, 'utf8');
   const solutionRunner = require(`./${day}/solution.js`);

   const run = async part => {
      console.time(`solution ${part}`);
      let parsedInput = input;
      if (solutionRunner.parseInput) {
         parsedInput = solutionRunner.parseInput(input);
      }
      let sln = solutionRunner[`runPart${part}`](parsedInput);
      if (sln.then) {
         sln = await sln;
      }
      console.log(sln);
      console.timeEnd(`solution ${part}`);
   };

   if (!partOrNot) {
      await run('1');
      await run('2');
   } else {
      const oneOrTwo = partOrNot;
      if (oneOrTwo !== '1' && oneOrTwo !== '2' && !isForce) {
         console.log('Number after dash must be 1 or 2. Make next arg `force` to override this.');
         process.exit();
      }
      await run(oneOrTwo);
   }
};

(async () => {
   if (solutionArg === 'all') {
      for (let i = 1; i <= 25; i++) {
         console.log(`Day ${i}`);
         await runDay(`${i}`, '');
         console.log('');
      }
   } else {
      await runDay(...solutionArg.split('-'));
   }
   console.timeEnd('full run');
})();
