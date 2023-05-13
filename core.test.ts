import { assertEquals } from "std/testing/asserts.ts";
import { parseDate } from "./core.ts";

Deno.test("core - parseDate", () => {
  const now = new Date();
  assertEquals(parseDate(now), now);

  const s = "2023-01-01";

  assertEquals(parseDate(s), new Date(2023, 0, 1));
});
