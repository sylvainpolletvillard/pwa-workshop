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

generateRandomNumber().then(handleSuccess)
  .then(generateRandomNumber).then(handleSuccess) // chain a second promise and handle is result
  .catch(handleFailure); // if any of the prevous calls fails, catch is called
console.log("Promise example"); // this message is shows first because the promise is async
