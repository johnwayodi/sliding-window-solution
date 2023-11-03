const fs = require("fs");

// parse the source file
function parseSourceFile(filename) {
  const data = fs.readFileSync(filename, "utf8");
  const lines = data.split("\n");
  const employees = parseInt(lines[0].split(": ")[1], 10);
  const goodies = lines
    .slice(2)
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [name, price] = line.split(": ");
      return { name, price: parseInt(price, 10) };
    });
  return { employees, goodies };
}

// write to output file
function writeOutputFile(filename, selectedGoodies, minDifference) {
  let output = "The goodies selected for distribution are:\n";
  selectedGoodies.forEach((goodie) => {
    output += `${goodie.name}: ${goodie.price}\n`;
  });
  output += `And the difference between the chosen goodie with highest price and the lowest price is ${minDifference}\n`;
  fs.writeFileSync(filename, output);
}

// find the minimum difference
function findMinimumDifference(goodies, employees) {
  goodies.sort((a, b) => a.price - b.price);
  let minDifference = Infinity;
  let selectedGoodies = [];

  for (let i = 0; i <= goodies.length - employees; i++) {
    let difference = goodies[i + employees - 1].price - goodies[i].price;
    if (difference < minDifference) {
      minDifference = difference;
      selectedGoodies = goodies.slice(i, i + employees);
    }
  }
  return { selectedGoodies, minDifference };
}

function main() {
  const { employees, goodies } = parseSourceFile("sample_input.txt");
  const { selectedGoodies, minDifference } = findMinimumDifference(
    goodies,
    employees
  );
  writeOutputFile("sample_output.txt", selectedGoodies, minDifference);
}

// Run the main function
main();
