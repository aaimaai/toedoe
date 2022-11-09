export default function debounce(fnc: Function, delayMs: number = 0) {
  let timeout: number;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fnc(...args);
    }, delayMs || 500);
  };
}
