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