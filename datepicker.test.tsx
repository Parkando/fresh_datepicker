import { assertExists } from "std/testing/asserts.ts";
import { DOMParser } from "deno_dom/deno-dom-wasm.ts";
import { render } from "preact-render-to-string";
import { Datepicker } from "@/datepicker.tsx";

Deno.test({
  name: "Datepicker - renders",
  fn() {
    const comp = render(<Datepicker />);
    const doc = new DOMParser().parseFromString(comp, "text/html");
    assertExists(
      doc,
    );
  },
});
