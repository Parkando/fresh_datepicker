import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";
import { Calendar } from "./deps.ts";
import { parseDate } from "./core.ts";
import { Chevron } from "./chevron.tsx";

// TODO:
//  1. Theming
//  2. Selections 
//  3. Island interactions

interface Props {
  date?: Date | string;
  locales?: string | string[] | undefined;
  open?: boolean;
  disabled?: boolean;
  month?: number;
}

export function Datepicker(
  { open, locales = "default", ...props }: Props,
): JSX.Element {
  const date = parseDate(props.date);

  const month = props.month || date.getMonth();

  const df = new Intl.DateTimeFormat(locales);

  const calendar = Calendar.createCalendar(date.getFullYear());
  const currentMonth = calendar[month];

  const caret = open
    ? <Chevron svgProps={{ class: "w-6" }} direction="up" />
    : <Chevron svgProps={{ class: "w-6" }}direction="down" />;

  return (
    <div class="inline-grid gap-1 min-w-[236px] sm:min-w-[360px] text-blue-400 relative">
      <button
        disabled={props.disabled}
        class="p-2 sm:p-4 text-sm md:text-xl flex justify-between border(2 black) rounded"
      >
        <span>{df.format(date)}</span>
        {caret}
      </button>
      <div class="absolute top-[3rem] sm:top-[4.5rem]" aria-expanded={open}>
        <div class="mb-1 flex justify-between">
          <button disabled={!IS_BROWSER} class="w-6 sm:w-[2rem]">
            <Chevron svgProps={{ class: "m-auto text-sm" }} direction="left" />
          </button>
          <span class="flex-1 text-center self-center">
            {currentMonth.monthName}
          </span>
          <button disabled={!IS_BROWSER} class="w-6 sm:w-[2rem]">
            <Chevron direction="right" />
          </button>
        </div>
        <ul class="inline-grid grid-cols-7 grid-flow-row gap-[2px] sm:gap-1">
          {currentMonth.days.filter((d) => d.day !== null).map((d) => (
            <li
              class="grid items-center justify-center"
              key={`${d.row}-${d.day}`}
            >
              <button
                disabled={!IS_BROWSER}
                class="w-8 h-8 sm:w-[3rem] sm:h-[3rem] text-sm border(2 black) rounded hover:bg-black hover:text-white"
              >
                {d.day}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
