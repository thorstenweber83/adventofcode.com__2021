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

  const intermediary = input.map((current, index, array) => {
    const prev = array[index - 1] || 0;
    const next = array[index + 1] || 0;
    const sum = prev + current + next;
    // console.log({ prev, current, next, sum });

    return sum;
  });

  // console.log(intermediary);

  const result = intermediary.reduce((carry, current, index, array) => {
    if (index === 0) {
      return 0;
    }
    const prev = array[index - 1];
    const add = current > prev ? 1 : 0;
    return carry + add;
  }, 0);

  // correct for the first step being counted when it should not, with the sliding window
  const finalResult = result - 1;

  console.log(
    `${finalResult} is the number of times the sum of measurements in this sliding window increases`
  );
};

run().catch((e) => console.error(e));
