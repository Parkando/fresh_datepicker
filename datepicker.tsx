import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";
import { parseDate, State } from "./core.ts";

export type YearAndMonth = {
  year: number;
  month: number;
};

type IconKey = "up" | "down" | "left" | "right";

export type Icon<T extends IconKey> = { key: T; component: JSX.Element };

interface Theme<T extends IconKey> {
  primary?: string;
  icons?: Icon<T>[];
}

interface Props<T extends IconKey> {
  date?: Date | string;
  locales?: string | string[] | undefined;
  open?: boolean;
  disabled?: boolean;
  month?: number;
  year?: number;
  onOpen?(open: boolean): void;
  onSelect?(date: Date): void;
  onMonthChange?(ym: YearAndMonth): void;
  theme?: Theme<T>;
}

export function Datepicker<T extends IconKey>(
  {
    open,
    locales = "default",
    theme = {
      primary: "blue-400",
    },
    ...props
  }: Props<T>,
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

  function icon(key: string, fallback: JSX.Element): JSX.Element {
    const icon = theme.icons?.find((i) => i.key === key);
    if (icon) {
      return icon.component;
    }

    return fallback;
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
        class="flex items-center justify-between min-w-[252px] overflow-x-hidden focus:outline-none bg-white rounded shadow-2xl p-3 pl-6"
      >
        <span>{df.format(date)}</span>
        {open
          ? icon("up", <span>&uarr;</span>)
          : icon("down", <span>&uarr;</span>)}
      </button>
      <div
        class={`p-2 bg-white shadow-2xl absolute rounded top-[3.5rem]${
          !open ? " hidden" : ""
        }`}
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
            {icon("left", <span>&larr;</span>)}
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
            {icon("right", <span>&rarr;</span>)}
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
                class={`w-8 h-8 sm:w-[3rem] sm:h-[3rem] transition-all text-sm rounded focus:outline-none hover:bg-${
                  theme.primary || "black"
                } hover:text-white ${
                  isSelected(d)
                    ? ` bg-${theme.primary || "black"} text-white`
                    : ""
                }`}
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
