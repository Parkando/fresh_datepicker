import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";
import { tw } from "twind";
import { parseDate, State } from "./core.ts";

export type YearAndMonth = {
  year: number;
  month: number;
};

interface Theme {
  buttonClass?: string;
  primary?: string;
  accent?: string;
  boxShadow?: string;
  borderRadius?: string;
  icons?: {
    up?: JSX.Element | string;
    down?: JSX.Element | string;
    left?: JSX.Element | string;
    right?: JSX.Element | string;
  };
}

interface Props {
  date?: Date | string;
  locales?: string | string[] | undefined;
  open?: boolean;
  disabled?: boolean;
  month?: number;
  year?: number;
  onOpen?(open: boolean): void;
  onSelect?(date: Date): void;
  onMonthChange?(ym: YearAndMonth): void;
  theme?: Theme;
}

export function Datepicker(
  {
    open,
    locales = "default",
    theme = {
      buttonClass:
        "flex items-center justify-between min-w-[270px] overflow-x-hidden focus:outline-none bg-white rounded shadow-2xl p-3 pl-6",
      primary: "blue-400",
      accent: "black",
      boxShadow: "shadow-md shadow-[rgb(164, 189, 185)]",
      borderRadius: "rounded-lg",
    },
    ...props
  }: Props,
): JSX.Element {
  const date = parseDate(props.date);

  const month = props.month !== undefined ? props.month : date.getMonth();
  const year = props.year !== undefined ? props.year : date.getFullYear();

  const state = new State(year, month);

  const df = new Intl.DateTimeFormat(locales);

  function isSelected(day: number | null | undefined): boolean {
    return date.getMonth() === month && date.getFullYear() === year &&
      day === date.getDate();
  }

  const pickerClass = `p-2 absolute top-[3rem] sm:top-[4.5rem]${
    !open ? " hidden" : ""
  } ${theme.boxShadow || ""} ${theme.borderRadius || ""}`;

  const dateClass = (day: number | null | undefined) =>
    `w-8 h-8 sm:w-[3rem] sm:h-[3rem] transition-all text-sm rounded focus:outline-none hover:bg-${
      theme.primary || "black"
    } hover:text-white ${
      isSelected(day) ? ` bg-${theme.primary || "black"} text-white` : ""
    } ${theme.boxShadow || ""}`;

  return (
    <div class="inline-grid gap-1 min-w-[236px] sm:min-w-[360px] relative">
      <button
        disabled={props.disabled}
        onClick={() => {
          if (typeof props.onOpen === "function") {
            props.onOpen(!open);
          }
        }}
        class={theme.buttonClass}
      >
        <span>{df.format(date)}</span>
        {open
          ? (theme.icons?.up || <span>&uarr;</span>)
          : (theme.icons?.down || <span>&darr;</span>)}
      </button>
      <div
        class={pickerClass}
        aria-expanded={open}
      >
        <div class="mb-5 flex justify-between">
          <button
            onClick={() => {
              if (typeof props.onMonthChange === "function") {
                props.onMonthChange(state.prev());
              }
            }}
            disabled={!IS_BROWSER}
            class="w-6 sm:w-[2rem] focus:outline-none"
          >
            {theme.icons?.left || <span>&larr;</span>}
          </button>
          <span class="flex-1 text-center self-center">
            {state.monthName(locales)}
          </span>
          <button
            onClick={() => {
              if (typeof props.onMonthChange === "function") {
                const next = state.next();
                props.onMonthChange({ year: next.year, month: next.month });
              }
            }}
            disabled={!IS_BROWSER}
            class="w-6 sm:w-[2rem] focus:outline-none"
          >
            {theme.icons?.right || <span>&rarr;</span>}
          </button>
        </div>
        <ul class="inline-grid grid-cols-7 grid-flow-row gap-[2px] sm:gap-1">
          {state.days.map((d) => (
            <li
              class="grid items-center justify-center"
              key={d}
            >
              <button
                disabled={!IS_BROWSER}
                onClick={() => {
                  if (typeof props.onSelect === "function") {
                    const dt = parseDate(
                      `${state.year}-${state.month + 1}-${d}`,
                    );
                    props.onSelect(dt);
                  }
                }}
                class={dateClass(d)}
              >
                {d}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
