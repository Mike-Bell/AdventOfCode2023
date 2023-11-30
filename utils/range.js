module.exports = (n1, n2) => {
   if (!n2) {
      n2 = n1;
      n1 = 0;
   }

   return Array.from(new Array(n2 - n1), (_, i) => i + n1);
};