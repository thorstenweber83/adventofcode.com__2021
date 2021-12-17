import fs from "fs/promises";
import path from "path";

const run = async () => {
  const input = (
    await fs.readFile(path.resolve(process.cwd(), "1", "input.txt"))
  )
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((s) => parseInt(s, 10));
  const result = input.reduce((carry, current, index, array) => {
    if (index === 0) {
      // console.log(current + " ()");
      return 0;
    }
    const prev = array[index - 1];
    const add = current > prev ? 1 : 0;
    // console.log(`${current} (${add ? "increased" : ""})`);
    return carry + add;
  }, 0);

  console.log(
    `${result} measurements are larger than the previous measurement`
  );
};

run().catch((e) => console.error(e));
