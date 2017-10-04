export function calulateRating(total, count, base = 1000) {
  if (!count) {
    return 0;
  }
  return Math.floor(total / count * base) / base;
}

export function debounce(fn, wait) {
  let timeout;
  return () => {
    let context = this,
      args = arguments;
    const timerFunction = () => {
      timeout = null;
      fn.apply(context, args);
    };
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(timerFunction, wait);
  };
}
