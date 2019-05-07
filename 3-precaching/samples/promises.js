// A function that returns a promise
function generateRandomNumber() {
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            const nb = Math.random();
            if (nb % 2 == 0) {
                resolve("success", nb);
            } else {
                reject(nb);
            }
        }, 3000);
    });
}

const promise = generateRandomNumber();
promise.then(function (message, number) {
    console.log(message, number);
}).catch(function (number) {
    console.error(number);
});

