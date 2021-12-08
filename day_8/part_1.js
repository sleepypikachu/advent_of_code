const fs = require('fs');

const data = fs.readFileSync('input', 'UTF-8');

/***
 000
1   2
1   2
1   3
 444
5   6
5   6
5   6
 777
***/

// split the contents by new line
const lines = data.split(/\r?\n/);

let count = 0;

const filter = x => (x == 2) || (x == 3) || (x == 4) || (x == 7);
lines.forEach((line) => {
  const parts = line.split("|")
  if (parts.length == 2) {
    console.log(parts[1])
    console.log(parts[1].split(" "))
    console.log(parts[1].split(" ").map(x => x.length))
    console.log(parts[1].split(" ").map(x => x.length).filter(filter))
    console.log(parts[1].split(" ").map(x => x.length).filter(filter).length)
    count += parts[1].split(" ").map(x => x.length).filter(filter).length
  }
});

console.log(count)

