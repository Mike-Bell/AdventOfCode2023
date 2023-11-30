const parseInput = input => input.split('\r\n').map(row => row.slice(9).split(' ').filter(n => n).map(Number));

const runPart1 = input => {
   let answer = 1;
   for (let i = 0; i < input[0].length; i++) {
      const time = input[0][i];
      const record = input[1][i];
      let winners = 0;
      for (let speed = 1; speed < time; speed++) {
         const distance = speed * (time - speed);
         if (distance > record) {
            winners++;
         }
      }
      answer *= winners;
   }
   return answer;
};

const runPart2 = input => {
   const [time, record] = input.map(row => row.join('')).map(Number);
   const lower = (time - Math.sqrt(Math.pow(time, 2) - 4 * record)) / 2;
   const upper = (time + Math.sqrt(Math.pow(time, 2) - 4 * record)) / 2;
   return Math.floor(upper) - Math.ceil(lower) + 1;
};

module.exports = {parseInput, runPart1, runPart2};