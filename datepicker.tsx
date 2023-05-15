import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";
import { parseDate, State } from "./core.ts";
import { Chevron } from "./chevron.tsx";

// TODO:
//  1. Theming

interface Props {
  date?: Date | string;
  locales?: string | string[] | undefined;
  open?: boolean;
  disabled?: boolean;
  month?: number;
  year?: number;
  onOpen?(open: boolean): void;
  onSelect?(date: Date): void;
  onMonthChange?(ym: { year: number; month: number }): void;
}

export function Datepicker(
  { open, locales = "default", ...props }: Props,
): JSX.Element {
  const date = parseDate(props.date);

  const month = props.month !== undefined ? props.month : date.getMonth();
  const year = props.year !== undefined ? props.year : date.getFullYear();

  const state = new State(year, month);

  const df = new Intl.DateTimeFormat(locales);

  const chev = open
    ? <Chevron svgProps={{ class: "w-6", role: "button" }} direction="up" />
    : (
      <Chevron
        svgProps={{ class: "w-6", role: "button" }}
        direction="down"
      />
    );

  function isSelected(day: number | null | undefined): boolean {
    return date.getMonth() === month && date.getFullYear() === year &&
      day === date.getDate();
  }

  return (
    <div class="inline-grid gap-1 min-w-[236px] sm:min-w-[360px] relative">
      <button
        disabled={props.disabled}
        onClick={() => {
          if (typeof props.onOpen === "function") {
            props.onOpen(!open);
          }
        }}
        class="p-2 sm:p-4 text-sm md:text-xl flex justify-between border(2 black) rounded"
      >
        <span>{df.format(date)}</span>
        {chev}
      </button>
      <div
        class={`absolute top-[3rem] sm:top-[4.5rem]${!open ? " hidden" : ""}`}
        aria-expanded={open}
      >
        <div class="mb-1 flex justify-between">
          <button
            onClick={() => {
              if (typeof props.onMonthChange === "function") {
                props.onMonthChange(state.prev());
              }
            }}
            disabled={!IS_BROWSER}
            class="w-6 sm:w-[2rem]"
          >
            <Chevron svgProps={{ class: "m-auto text-sm" }} direction="left" />
          </button>
          <span class="flex-1 text-center self-center">
            {state.current.monthName}
          </span>
          <button
            onClick={() => {
              if (typeof props.onMonthChange === "function") {
                const next = state.next();
                props.onMonthChange({ year: next.year, month: next.month });
              }
            }}
            disabled={!IS_BROWSER}
            class="w-6 sm:w-[2rem]"
          >
            <Chevron direction="right" />
          </button>
        </div>
        <ul class="inline-grid grid-cols-7 grid-flow-row gap-[2px] sm:gap-1">
          {state.current.days.filter((d) => d.day !== null).map((d) => (
            <li
              class="grid items-center justify-center"
              key={`${d.row}-${d.day}`}
            >
              <button
                disabled={!IS_BROWSER}
                onClick={() => {
                  if (typeof props.onSelect === "function" && d.day) {
                    const dt = parseDate(
                      `${state.current.year}-${
                        state.current.month + 1
                      }-${d.day}`,
                    );
                    props.onSelect(dt);
                  }
                }}
                class={`w-8 h-8 sm:w-[3rem] sm:h-[3rem] transition-all text-sm border(2 black) rounded hover:bg-black hover:text-white ${
                  isSelected(d.day)
                    ? "border(2 blue-400) bg-blue-400 text-white"
                    : ""
                }`}
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
