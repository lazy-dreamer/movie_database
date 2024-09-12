export function parseISOString(s: string): Date {
  const b: string[] = s.split(/\D+/);
  return new Date(Date.UTC(
    parseInt(b[0], 10),      // year
    parseInt(b[1], 10) - 1,  // month (zero-based index)
    parseInt(b[2], 10),      // day
    parseInt(b[3], 10),      // hour
    parseInt(b[4], 10),      // minute
    parseInt(b[5], 10),      // second
    parseInt(b[6], 10)       // millisecond
  ));
}