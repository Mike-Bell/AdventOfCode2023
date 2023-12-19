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

   let sum = 0;
   for (const part of parts) {
      let ruleKey = 'in';
      // eslint-disable-next-line no-constant-condition
      while (true) {
         if (ruleKey === 'R') {
            break;
         } else if (ruleKey === 'A') {
            sum += part.x + part.m + part.a + part.s;
            break;
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
   }

   return sum;
};

const runPart2 = input => {
   const {ruleSets} = input;

   const states = [{x: [1, 4000], m: [1, 4000], s: [1, 4000], a: [1, 4000], ruleKey: 'in'}];
   const cloneState = state => ({
      x: [state.x[0], state.x[1]],
      m: [state.m[0], state.m[1]],
      s: [state.s[0], state.s[1]],
      a: [state.a[0], state.a[1]],
      ruleKey: state.ruleKey
   });

   let sum = 0;
   while (states.length > 0) {
      const state = states.pop();
      if (state.ruleKey === 'R') {
         continue;
      } else if (state.ruleKey === 'A') {
         sum += (state.x[1] - state.x[0] + 1) * (state.m[1] - state.m[0] + 1) * (state.s[1] - state.s[0] + 1) * (state.a[1] - state.a[0] + 1);
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