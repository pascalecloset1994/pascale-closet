let count = 0;
onmessage = (event) => {
  const seconds = event.data;
  setInterval(() => {
    postMessage(count);
    count++;
  }, seconds);
};
