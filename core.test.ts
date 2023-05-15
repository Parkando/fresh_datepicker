import { assertEquals } from "std/testing/asserts.ts";
import { parseDate, State } from "./core.ts";

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

Deno.test("core - State - days in month", () => {
  const state = new State(2023, 2);
  assertEquals(state.days.length, 28);
});
