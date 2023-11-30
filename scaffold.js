const fs = require('fs');
const range = require('./utils/range');

range(1, 26).forEach(i => {
   const paddedDay = i < 10 ? `0${i}` : `${i}`;

   const folderPath = `./${paddedDay}`;
   if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
   }

   const solutionFilePath = `${folderPath}/solution.js`;
   if (!fs.existsSync(solutionFilePath)) {
      fs.copyFileSync('./solution-template.js', solutionFilePath);
   }

   const inputFilePath = `${folderPath}/input.txt`;
   if (!fs.existsSync(inputFilePath)) {
      fs.copyFileSync('./input-template.txt', inputFilePath);
   }

   const testFilePath = `${folderPath}/solution.test.js`;
   if (!fs.existsSync(testFilePath)) {
      fs.copyFileSync('./test-template.js', testFilePath);
   }
});