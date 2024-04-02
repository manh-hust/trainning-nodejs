import { readUserDataFile } from "@src/utils/read-file";
import { User } from "@src/types";

describe("Normal cases", () => {
  {
    test("[1]. Should return list of users when file content is correct", () => {
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
      expect(
        // Prepare users data file
        readUserDataFile("./__tests__/test-data/test-data.txt")
        // Expect list of Users
      ).toStrictEqual(expectData);
    });
  }
});

describe("Error cases", () => {
  test.each([
    // Prepare empty file
    {
      index: 1,
      fileName: "empty-file.txt",
      reason: "file is empty",
    },
    // Prepare incorrect data file
    {
      index: 2,
      fileName: "incorrect-format.txt",
      reason: "data is incorrect format",
    },
    // Prepare incorrect name file
    {
      index: 3,
      fileName: "not-found.txt",
      reason: "file name not found",
    },
  ])("[$index]. Should return undefined if $reason", ({ fileName }) => {
    // Expect undefined value
    expect(readUserDataFile(`./__tests__/test-data/${fileName}`)).toStrictEqual(
      undefined
    );
  });
});
