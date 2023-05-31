import { useState } from "preact/hooks";
import { Datepicker, YearAndMonth } from "$fresh_datepicker/mod.ts";
import { Chevron, Direction } from "../components/chevron.tsx";

const icons = (["up", "down", "left", "right"] as Direction[]).map((dir) => ({
  key: dir,
  component: (
    <Chevron
      color="white"
      svgProps={{
        width: "1rem",
        class: "w-4 ml-3 bg-blue-400 rounded-full",
      }}
      direction={dir}
    />
  ),
}));

export default function DP() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [ym, setYearMonth] = useState<Partial<YearAndMonth>>({});

  return (
    <Datepicker
      theme={{
        icons,
        primary: "blue-400",
      }}
      locales={["sv-SE"]}
      date={date}
      onMonthChange={(ym) => {
        console.log("ym", ym);
        setYearMonth(ym);
      }}
      month={ym.month}
      year={ym.year}
      onOpen={setOpen}
      onSelect={setDate}
      open={open}
    />
  );
}
