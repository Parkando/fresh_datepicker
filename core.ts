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
