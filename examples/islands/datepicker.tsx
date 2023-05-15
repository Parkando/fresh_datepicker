import { useState } from "preact/hooks";
import { Datepicker } from "$fresh_datepicker/mod.ts";

export default function DP() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [ym, setYearMonth] = useState<{ year?: number; month?: number }>({});
  return (
    <Datepicker
      date={date}
      onMonthChange={setYearMonth}
      month={ym.month}
      year={ym.year}
      onOpen={setOpen}
      onSelect={setDate}
      open={open}
    />
  );
}
