import { afterEach, beforeEach } from "vitest";

beforeEach(async () => {
  // @ts-ignore
  await delegate.handleTestEvent({ name: "test_start" });
});

afterEach(async () => {
  // @ts-ignore
  await delegate.handleTestEvent({ name: "test_done" });
});
