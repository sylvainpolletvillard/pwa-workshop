// create a worker whose code is defined in the file passed as parameter
const worker = new Worker("worker.js");

function sendMessageToWorker() {
  worker.postMessage("hello");
}

function askWorkerRecurringTask() {
  worker.postMessage("recurring");
}

// This event is fired when the worker posts a message
// The value of the message is in messageEvent.data
worker.addEventListener("message", function(messageEvent) {
  // Log the received message in the output element
  const log = document.createElement("p");
  log.textContent = messageEvent.data;
  document.querySelector("output").prepend(log);
});