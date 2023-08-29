interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  yyyy: string;
  MM: string;
  dd: string;
  hh: string;
  mm: string;
  ss: string;
}

export function formate(
  date: Date,
  formatter: string | ((dateInfo: DateInfo) => string),
  isPad = false
): string {
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const padStart = (str: number, length: number): string => {
    const value = str.toString();
    return isPad ? value.padStart(length, "0") : value;
  };

  const year = date.getFullYear();
  const yyyy = padStart(year, 4);
  const month = date.getMonth() + 1;
  const MM = padStart(month, 2);
  const day = date.getDate();
  const dd = padStart(day, 2);
  const hour = date.getHours();
  const hh = padStart(hour, 2);
  const minute = date.getMinutes();
  const mm = padStart(minute, 2);
  const second = date.getSeconds();
  const ss = padStart(second, 2);

  if (typeof formatter === "string") {
    switch (formatter) {
      case "date":
        return `${yyyy}-${MM}-${dd}`;
      case "datetime":
        return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
      default:
        return formatter
          .replaceAll("yyyy", yyyy)
          .replaceAll("MM", MM)
          .replaceAll("dd", dd)
          .replaceAll("hh", hh)
          .replaceAll("mm", mm)
          .replaceAll("ss", ss);
    }
  }

  return formatter({
    year,
    month,
    day,
    hour,
    minute,
    second,
    yyyy,
    MM,
    dd,
    hh,
    mm,
    ss,
  });
}
