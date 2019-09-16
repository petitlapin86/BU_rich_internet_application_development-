onmessage = e => {
  const {start, end} = e.data;
  const n = end - start + 1
  const sum = n * (start + end)/2
  postMessage({start, end, result: sum})
}
