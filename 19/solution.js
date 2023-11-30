const parseInput = input => {
   const [rulesSection, partsSection] = input.split('\r\n\r\n').map(s => s.split('\r\n'));
   const ruleSets = {};
   rulesSection.forEach(r => {
      const [key, others] = r.split('{');
      const splitOthers = others.slice(0, -1).split(',');
      const otherRules = splitOthers.map(o => {
         if (o.indexOf(':') === -1) {
            return {
               type: 'always',
               dest: o
            };
         }

         const v = o[0];
         const t = o[1];
         const innerSliced = o.slice(2).split(':');
         return {
            type: t,
            dest: innerSliced[1],
            var: v,
            val: Number(innerSliced[0])
         };
      });
      ruleSets[key] = otherRules;
   });

   const parts = partsSection.map(p => {
      const part = {};
      p.slice(1, -1).split(',').forEach(ip => {
         part[ip[0]] = Number(ip.slice(2));
      });
      return part;
   });

   return {ruleSets, parts};
};

const runPart1 = input => {
   const {ruleSets, parts} = input;

   return parts.map(part => {
      let ruleKey = 'in';
      // eslint-disable-next-line no-constant-condition
      while (true) {
         if (ruleKey === 'R') {
            return 0;
         } else if (ruleKey === 'A') {
            return Object.values(part).reduce((acc, curr) => acc + curr);
         }

         const ruleSet = ruleSets[ruleKey];
         for (const rule of ruleSet) {
            if (rule.type === 'always') {
               ruleKey = rule.dest;
               break;
            } else if (rule.type === '>') {
               if (part[rule.var] > rule.val) {
                  ruleKey = rule.dest;
                  break;
               }
            } else if (rule.type === '<') {
               if (part[rule.var] < rule.val) {
                  ruleKey = rule.dest;
                  break;
               }
            }
         }
      }
   }).reduce((acc, curr) => acc + curr);
};

const valKeys = ['x', 'm', 's', 'a'];

const runPart2 = input => {
   const {ruleSets} = input;

   const states = [
      Object.assign(
         {ruleKey: 'in'},
         Object.fromEntries(valKeys.map(key => [key, [1, 4000]]))
      )
   ];
   const cloneState = state => {
      const newState = {ruleKey: state.ruleKey};
      valKeys.forEach(key => {
         newState[key] = [...state[key]];
      });
      return newState;
   };

   let sum = 0;
   while (states.length > 0) {
      const state = states.pop();
      if (state.ruleKey === 'R') {
         continue;
      } else if (state.ruleKey === 'A') {
         sum += valKeys
            .map(key => state[key][1] - state[key][0] + 1)
            .reduce((acc, curr) => acc * curr, 1);
         continue;
      }

      const ruleSet = ruleSets[state.ruleKey];
      for (const rule of ruleSet) {
         if (rule.type === 'always') {
            const nextState = cloneState(state);
            nextState.ruleKey = rule.dest;
            states.push(nextState);
         } else if (rule.type === '>') {
            if (state[rule.var][1] > rule.val) {
               const nextState = cloneState(state);
               nextState.ruleKey = rule.dest;
               nextState[rule.var][0] = Math.max(nextState[rule.var][0], rule.val + 1);
               states.push(nextState);
               if (state[rule.var][0] <= rule.val) {
                  state[rule.var][1] = rule.val;
               } else {
                  break;
               }
            }
         } else if (rule.type === '<') {
            if (state[rule.var][0] < rule.val) {
               const nextState = cloneState(state);
               nextState.ruleKey = rule.dest;
               nextState[rule.var][1] = Math.min(nextState[rule.var][1], rule.val - 1);
               states.push(nextState);
               if (state[rule.var][1] >= rule.val) {
                  state[rule.var][0] = rule.val;
               } else {
                  break;
               }
            }
         }
      }
   }

   return sum;
};

module.exports = {parseInput, runPart1, runPart2};