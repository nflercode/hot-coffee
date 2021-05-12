onmessage = function(e) {
  setTimeout(() => postMessage(1), e.data);
}