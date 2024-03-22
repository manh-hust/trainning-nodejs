import { User, readUserDataFile } from "./utils";

describe("readUserDataFile", () => {
  it("return list user when file correct", () => {
    const expectData: User[] = [
      {
        name: "Nguyen",
        phone: "0944324560",
        address: "Thanh-Xuan",
      },
      {
        name: "Toan",
        phone: "0324324400",
        address: "Nam-Tu-Liem",
      },
    ];
    expect(readUserDataFile("test-data.txt")).toStrictEqual(expectData);
  });

  it("return undefined when file empty", () => {
    expect(readUserDataFile("empty-file.txt")).toStrictEqual(undefined);
  });

  it("return undefined when data incorrect format", () => {
    expect(readUserDataFile("incorrect-format.txt")).toStrictEqual(undefined);
  });
});
