const fs = require('fs');

try {
    let aim = 0;
    let depth = 0;
    let horizontal = 0;
    // read contents of the file
    const data = fs.readFileSync('input', 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    lines.forEach((line) => {
      if (line.startsWith("forward ")) {
  	let size = parseInt(line.replace("forward ", ''))
        horizontal += size
        depth += size * aim
      }
      if (line.startsWith("down ")) {
        aim += parseInt(line.replace("down ", ''))
      }
      if (line.startsWith("up ")) {
        aim -= parseInt(line.replace("up ", ''))
      }

    });
      console.log({depth, horizontal, answer: depth * horizontal})
} catch (err) {
    console.error(err);
}
