const jest = require('jest');
let day = process.argv[2];

if (!day) {
   jest.run();
   process.exit();
}

if (day.length === 1) {
   day = `0${day}`;
}

jest.run(`--roots ./${day}`);