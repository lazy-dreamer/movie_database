export function debounce<T extends (...args: any[]) => any>(func: T, timeout: number = 300): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return function (this: void, ...args: Parameters<T>): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
