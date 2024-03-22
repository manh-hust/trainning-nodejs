import { Logger, ILogObj } from "tslog";
import { readFileSync } from "fs";

const log: Logger<ILogObj> = new Logger();

export type User = {
  name: string;
  phone: string;
  address: string;
};

export function readUserDataFile(path: string): User[] | undefined {
  try {
    const fileData = readFileSync(path, "utf-8");
    if (fileData === "") {
      log.error("File empty!");
      return;
    }
    const userLines: string[] = fileData.split("\n");

    let hasError: boolean = false;
    const users: User[] | undefined = userLines.map((userLine) => {
      const userData: string[] = userLine.split(" ");
      if (userData.length !== 3) {
        log.error("Data format incorrect!");
        hasError = true;
      }
      return {
        name: userData[0],
        phone: userData[1],
        address: userData[2],
      };
    });

    if (hasError) return;

    return users;
  } catch (error) {
    log.error("File name incorrect!");
  }
}
