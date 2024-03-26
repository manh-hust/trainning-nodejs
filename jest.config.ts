import type { Config } from "jest";
import path from "path";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  roots: ["./src/", "./__tests__"],
  collectCoverage: true,
  coverageReporters: ["json", "html", "text-summary"],
  coverageDirectory: "./coverage",
  moduleNameMapper: {
    "^@src(.*)$": path.resolve("./src/$1"),
    "^@test(.*)$": path.resolve("./__tests__/$1"),
  },
};

export default config;
