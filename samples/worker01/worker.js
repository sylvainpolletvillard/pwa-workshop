// a function that generates a random number every second and posts it to the main JavaScript
function generateNumbers(){ 
    setInterval(function(){
        // post a message to the main JavaScript
        self.postMessage(Math.random());
    }, 1000);
}

// This event is fired when the worker recieves a message from the main JavaScript
// The value of the message is in messageEvent.data
self.addEventListener("message", function(messageEvent){
    if(messageEvent.data === "recurring"){
        // If the value of the event is "recurring", we launch the above function
        generateNumbers();
    }else{
        // Post a message back to the main JS
        self.postMessage("Hello to you too !");
    }
});