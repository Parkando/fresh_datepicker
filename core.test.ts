import { assertEquals } from "std/testing/asserts.ts";
import { parseDate } from "./core.ts";

Deno.test("core - parseDate", () => {
  const now = new Date();
  assertEquals(parseDate(now), now);

  const dates = [["2023-01-01", new Date(2023, 0, 1)], [
    "5/13/2023",
    new Date(2023, 4, 13),
  ]];

  for (const [s, d] of dates) {
    assertEquals(parseDate(s), d);
  }
});
