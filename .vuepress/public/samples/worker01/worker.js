// This event is fired when the worker recieves a message from the main JavaScript
// The value of the message is in messageEvent.data
self.addEventListener("message", function(messageEvent) {
    if (messageEvent.data === "hello") {
      // Post a message back to the main JS
      self.postMessage("Hello to you too !");
    }
  
    if(messageEvent.data === "recurring") {
        for(let i=0; i<10; i++){
            setTimeout(() => self.postMessage(new Date()), i*1000)
        }
    }
  });