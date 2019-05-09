// crate a worker whose code is defined in the file passed as parameter 
const worker = new Worker("worker.js"); 

function askWorkerToPerformRecurringTask(){
    // post a sting to the worker
    worker.postMessage("recurring");
}
function sendMessageToWorker(){
    // post a sting to the worker
    worker.postMessage("Hello World !");
}

// This event is fired when the worker posts a message. 
// The value of the message is in messageEvent.data
worker.addEventListener("message", function(messageEvent){
    const div = document.getElementById("result");
    // Log the received message on the top of the tag
    div.innerHTML = messageEvent.data + "<br>" + div.innerHTML;
});