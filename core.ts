import { Calendar } from "./deps.ts";

// deno-lint-ignore no-explicit-any
function assertDate(value?: any): value is Date {
  return value && Object.prototype.toString.call(value) === "[object Date]" &&
    !isNaN(value.valueOf());
}

export function parseDate(value?: string | Date): Date {
  if (!value) {
    return new Date();
  }

  if (assertDate(value)) {
    return value;
  }

  if (Object.prototype.toString.call(value) === "[object String]") {
    const dt = new Date(new Date(value).toLocaleDateString());
    if (assertDate(dt)) {
      return dt;
    } else {
      console.warn(
        "Invalid date passed to Datepicker with value:",
        value,
        "setting current date...",
      );
    }
  }
  return new Date();
}

export class State {
  private calendar: ReturnType<typeof Calendar.createCalendar>;
  private currentDate: Date;

  constructor(year: number, month: number) {
    this.currentDate = new Date(year, month, 1);
    this.calendar = Calendar.createCalendar(this.currentDate.getFullYear());
  }

  next(): State {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.calendar = Calendar.createCalendar(this.currentDate.getFullYear());
    return new State(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
    );
  }

  prev(): State {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.calendar = Calendar.createCalendar(this.currentDate.getFullYear());
    return new State(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
    );
  }

  get year(): number {
    return this.calendar[this.currentDate.getMonth()].year;
  }

  get month(): number {
    return this.calendar[this.currentDate.getMonth()].month;
  }

  get current() {
    return this.calendar[this.currentDate.getMonth()];
  }
}
