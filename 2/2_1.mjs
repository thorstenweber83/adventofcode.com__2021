import fs from "fs/promises";
import path from "path";

const run = async () => {
  const input = (
    await fs.readFile(path.resolve(process.cwd(), ".\\2\\input.txt"))
  )
    .toString()
    .split("\r\n")
    .filter(Boolean)
    .map((s) => s.split(" "))
    .map(([d, a]) => [d, parseInt(a, 10)]);

  const initialPosition = {
    horizontal: 0,
    depth: 0,
  };

  const result = input.reduce(
    ({ horizontal: h, depth: d }, [direction, amount]) => ({
      horizontal: direction == "forward" ? h + amount : h,
      depth: (() => {
        switch (direction) {
          case "up":
            return d - amount;
          case "down":
            return d + amount;
          default:
        }
        return d;
      })(),
    }),
    initialPosition
  );

  console.log(result);

  console.log(
    "If i multiply my final horizontal position by my final depth i get: " +
      result.horizontal * result.depth
  );
};

run().catch((e) => console.error(e));
