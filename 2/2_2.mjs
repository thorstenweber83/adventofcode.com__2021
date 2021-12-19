import fs from "fs/promises";
import path from "path";

const run = async () => {
  const input = (
    await fs.readFile(path.resolve(process.cwd(), "2", "input.txt"))
  )
    .toString()
    .split("\r\n")
    .filter(Boolean)
    .map((s) => s.split(" "))
    .map(([d, a]) => [d, parseInt(a, 10)]);

  const initialPosition = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  const result = input.reduce(
    ({ horizontal: h, depth: d, aim: a }, [direction, amount]) => {
      const result = {
        horizontal: direction == "forward" ? h + amount : h,
        depth: direction == "forward" ? d + a * amount : d,
        aim: (() => {
          switch (direction) {
            case "up":
              return a - amount;
            case "down":
              return a + amount;
            default:
          }
          return a;
        })(),
      };
      console.log({
        direction,
        amount,
      });
      console.log(result);
      return result;
    },
    initialPosition
  );

  console.log(result);

  console.log(
    "If i multiply my final horizontal position by my final depth i get: " +
      result.horizontal * result.depth
  );
};

run().catch((e) => console.error(e));
