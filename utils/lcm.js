const gcd = require('./gcd');

module.exports = (a, b) => a * b / gcd(a, b);