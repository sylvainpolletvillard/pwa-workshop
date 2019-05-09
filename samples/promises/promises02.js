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

function handleSuccess(number) {
    console.log(number);
}
function handleFailure(message) {
    console.error(message);
}
generateRandomNumber().then(handleSuccess).catch(handleFailure);
console.log("Promise example"); // this message is shows first because the promise is async
