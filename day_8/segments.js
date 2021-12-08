const fs = require('fs');

const data = fs.readFileSync('input', 'UTF-8');

/***
 000
1   2
1   2
1   2
 333
4   5
4   5
4   5
 666

Sizes:
# S U
0 6 *
1 2 *
2 5
3 5
4 4 *
5 5
6 6 *
7 3 *
8 7 *
9 6 *
***/

// split the contents by new line
const lines = data.split(/\r?\n/);

let count = 0;

const filter = (candidates, symbol) => {
  return candidates.filter(x => symbol.indexOf(x) == -1);
}

const filterIn = (candidates, symbol) => {
  return candidates.filter(x => symbol.indexOf(x) != -1);
}
lines.forEach((line) => {
  const parts = line.split(" | ")
  if (parts.length == 2) {
    const candidates = [];
    for (let i = 0; i < 7; i++) {
       candidates[i] = ['a','b','c','d','e','f', 'g']
    }
    console.log(parts[0])
    const symbols = parts[0].split(" ")
    const complexSymbols = []
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (symbol.length == 2) {
        //must be a 1
        candidates[0] = filter(candidates[0], symbol)
        candidates[1] = filter(candidates[1], symbol)
        candidates[2] = filterIn(candidates[2], symbol)
        candidates[3] = filter(candidates[3], symbol)
        candidates[4] = filter(candidates[4], symbol)
        candidates[5] = filterIn(candidates[5], symbol)
        candidates[6] = filter(candidates[6], symbol)
      }
      else if (symbol.length == 3) {
        //must be a 7
        candidates[0] = filterIn(candidates[0], symbol)
        candidates[1] = filter(candidates[1], symbol)
        candidates[2] = filterIn(candidates[2], symbol)
        candidates[3] = filter(candidates[3], symbol)
        candidates[4] = filter(candidates[4], symbol)
        candidates[5] = filterIn(candidates[5], symbol)
        candidates[6] = filter(candidates[6], symbol)
      }
      else if (symbol.length == 4) {
        //must be a 4
        candidates[0] = filter(candidates[0], symbol)
        candidates[1] = filterIn(candidates[1], symbol)
        candidates[2] = filterIn(candidates[2], symbol)
        candidates[3] = filterIn(candidates[3], symbol)
        candidates[4] = filter(candidates[4], symbol)
        candidates[5] = filterIn(candidates[5], symbol)
        candidates[6] = filter(candidates[6], symbol)
      }
      else if (symbol.length == 8) {
        //must be an 8, tells us nothing
      } else {
        complexSymbols.push(symbol)
      }
    }

    for (let i = 0; i < complexSymbols.length; i++) {
      const symbol = complexSymbols[i];
      if (symbol.length == 6) {
        //must be a 6 or a 9 or a 0
        if (candidates[2].filter(x => symbol.indexOf(x) != -1).length == 0) {
          // cannot be a 9
          if (candidates[3].filter(x => symbol.indexOf(x) != -1).length == 0) {
            // cannot be a 6 must be a 0
            candidates[0] = filterIn(candidates[0], symbol)
            candidates[1] = filterIn(candidates[1], symbol)
            candidates[2] = filterIn(candidates[2], symbol)
            candidates[4] = filterIn(candidates[4], symbol)
            candidates[5] = filterIn(candidates[5], symbol)
            candidates[6] = filterIn(candidates[6], symbol)
          } else {
            // must be a 6
            candidates[0] = filterIn(candidates[0], symbol)
            candidates[1] = filterIn(candidates[1], symbol)
            candidates[3] = filterIn(candidates[3], symbol)
            candidates[4] = filterIn(candidates[4], symbol)
            candidates[5] = filterIn(candidates[5], symbol)
            candidates[6] = filterIn(candidates[6], symbol)
          }
        } else {
          // must be a 9
          candidates[0] = filterIn(candidates[0], symbol)
          candidates[1] = filterIn(candidates[1], symbol)
          candidates[2] = filterIn(candidates[2], symbol)
          candidates[3] = filterIn(candidates[3], symbol)
          candidates[5] = filterIn(candidates[5], symbol)
          candidates[6] = filterIn(candidates[6], symbol)
        }
      }
      if (symbol.length == 5) {
        // must be a 2, 3, or 5
        if (candidates[1].filter(x => symbol.indexOf(x) != -1).length == 0) {
          // cannot be a 5
          if (candidates[4].filter(x => symbol.indexOf(x) != -1).length == 0) {
            //cannot be a 2 must be a 3
            candidates[0] = filterIn(candidates[0], symbol)
            candidates[2] = filterIn(candidates[2], symbol)
            candidates[3] = filterIn(candidates[3], symbol)
            candidates[5] = filterIn(candidates[5], symbol)
            candidates[6] = filterIn(candidates[6], symbol)
          } else {
            // must be a 2
            candidates[0] = filterIn(candidates[0], symbol)
            candidates[2] = filterIn(candidates[2], symbol)
            candidates[3] = filterIn(candidates[3], symbol)
            candidates[4] = filterIn(candidates[4], symbol)
            candidates[6] = filterIn(candidates[6], symbol)
          }
        } else {
          // must be a 5
          candidates[0] = filterIn(candidates[0], symbol)
          candidates[1] = filterIn(candidates[1], symbol)
          candidates[3] = filterIn(candidates[3], symbol)
          candidates[5] = filterIn(candidates[5], symbol)
          candidates[6] = filterIn(candidates[6], symbol)
        }
      }
    }
    console.log({candidates, complexSymbols});
  }
});

console.log(count)

