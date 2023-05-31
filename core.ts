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
  private currentDate: Date;

  constructor(year: number, month: number) {
    this.currentDate = new Date(year, month, 1);
  }

  next(): State {
    this.currentDate = new Date(
      this.currentDate.getUTCFullYear(),
      this.currentDate.getMonth() + 1,
      1,
    );
    return new State(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
    );
  }

  prev(): State {
    this.currentDate = new Date(
      this.currentDate.getUTCFullYear(),
      this.currentDate.getMonth() - 1,
      1,
    );

    return new State(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
    );
  }

  monthName(locales: string | string[]): string {
    return this.currentDate.toLocaleString(locales, { month: "short" });
  }

  get year(): number {
    return this.currentDate.getFullYear();
  }

  get month(): number {
    return this.currentDate.getMonth();
  }

  get days(): number[] {
    const dt = new Date(
      this.currentDate.getUTCFullYear(),
      this.currentDate.getMonth() + 1,
      0,
    );

    console.log(dt.getDate())
    return Array.from(Array(dt.getDate()).keys()).map((n) => n + 1);
  }
}
