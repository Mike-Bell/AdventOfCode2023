const gcd = (a, b) => b ? gcd(b, a % b) : a;

module.exports = gcd;