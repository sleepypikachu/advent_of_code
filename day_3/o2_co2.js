const fs = require('fs');

const binary_strings = []
const data = fs.readFileSync('input', 'UTF-8');

// split the contents by new line
const lines = data.split(/\r?\n/);

let count = 0;
lines.forEach((line) => {
  if (line.length === 12) {
    count++;
    let arr = line.split('');
    binary_strings.push(arr)
  }
});

const split = (strings, bit, common=true) => {
  const highs = []
  const lows = []
  for (let i = 0; i < strings.length; i++) {
    let string = strings[i];
    if (string[bit] === "1") {
      highs.push(string)
    } else {
      lows.push(string)
    }
  }

  if(common) {
    if (highs.length >= lows.length) {
      return highs;
    }

    return lows;
  }
  if (highs.length >= lows.length) {
    return lows;
  }

  return highs;
}

let ox = binary_strings;
for (let i = 0; i < 12; i++) {
  ox = split(ox, i)
  if (ox.length == 1) {
    break;
  }
}

let co2 = binary_strings;
for (let i = 0; i < 12; i++) {
  co2 = split(co2, i, false)
  if (co2.length == 1) {
    break;
  }
}

console.log({ox, co2, answer: parseInt(ox[0].join(''), 2)*parseInt(co2[0].join(''), 2)});
