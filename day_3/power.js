const fs = require('fs');

try {
    const high_bits = []
    for (let i=0; i<12; i++) {
      high_bits[i] = 0;
    }
    // read contents of the file
    const data = fs.readFileSync('input', 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    let count = 0;
    lines.forEach((line) => {
      if (line.length === 12) {
        count++;
        let arr = line.split('');
	for(let i = 0; i < arr.length; i++) {
          if (arr[i] === "1") {
            high_bits[i]++;
          }
        }
      }
    });
    
    let gamma_str = "";
    let epsilon_str = "";
    for (let i = 0; i < 12; i++) {
      if (high_bits[i] > (count/2)) {
        gamma_str += "1"
        epsilon_str += "0"
      } else {
        gamma_str += "0"
        epsilon_str += "1"
      }
    }

    const gamma = parseInt(gamma_str, 2)
    const epsilon = parseInt(epsilon_str, 2)
    console.log({gamma, epsilon, answer: gamma*epsilon})
     
} catch (err) {
    console.error(err);
}
