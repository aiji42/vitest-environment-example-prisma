import type { Environment } from "vitest";
import { PrismaEnvironmentDelegate } from "@quramy/jest-prisma-core";
import { afterEach, beforeEach } from "vitest";

declare global {
  var delegate: {
    handleTestEvent: (param: { name: string; test?: any }) => Promise<void>;
  };
}

beforeEach(async () => {
  await Promise.all([
    global.delegate.handleTestEvent({ name: "test_start" }),
    global.delegate.handleTestEvent({ name: "test_fn_start" }),
  ]);
});

afterEach(async () => {
  await Promise.all([
    global.delegate.handleTestEvent({ name: "test_done" }),
    global.delegate.handleTestEvent({
      name: "test_fn_success",
      test: { parent: null },
    }),
  ]);
});

export default {
  name: "prisma",
  async setup(global, options) {
    const delegate = new PrismaEnvironmentDelegate(
      {
        // @ts-ignore
        projectConfig: {
          testEnvironmentOptions: options.prisma ?? {},
        },
        // @ts-ignore
        globalConfig: {
          rootDir: "",
        },
      },
      {
        testPath: "",
      }
    );
    global.delegate = delegate;
    global.jestPrisma = await delegate.preSetup();

    return {
      async teardown() {
        await delegate.teardown();
      },
    };
  },
} as Environment;
