/** @type {import('ts-jest').JestConfigWithTsJest} */

import {Config} from "jest";
import { compilerOptions } from "./tsconfig.json";
import {pathsToModuleNameMapper} from "ts-jest" ;

const config: Config = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  setupFiles: ['./setupTests.ts'],
};

export default config
