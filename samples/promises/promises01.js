function generateRandomNumber() {
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            const nb = Math.floor(Math.random() * 10); // random number between 0 and 10
            if (nb % 2 == 0) {
                resolve(nb);
            } else {
                reject({message:"even number", number: nb});
            }
        }, 1000);
    });
}

const promise = generateRandomNumber(); // create a promise that generated a random number asynchronously
promise.then(function (number) { // this function is called when the promise succeds
    console.log(number);
}).catch(function (error) { // this function is called when the promise fails
    console.error(error);
});
console.log("Promise example"); // this message is shows first because the promise is async
