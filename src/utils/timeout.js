export const timeout = async (prom, time) => {
  let timer;
  try {
    return await Promise.race([
      prom,
      new Promise((_r, rej) => (timer = setTimeout(rej, time))),
    ]);
  } finally {
    clearTimeout(timer);
  }
};
