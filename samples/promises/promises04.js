function generateRandomNumber() { //  If we want to await this function, we need to declare it as async
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

// If we want to use await, we must be place the code in async function
// More reading https://github.com/tc39/proposal-top-level-await, https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221
async function mainAsync(){ 
    try{
        const nb1 = await generateRandomNumberAsync(); // calls the async function and waits for its results asynchrnously (without blocking the javascirpt thread)
        console.log(nb1);
        const nb2 = await generateRandomNumberAsync(); // calls the async function and waits for its results asynchrnously (without blocking the javascirpt thread)
        console.log(nb2);
    }catch(error){ // this catch block is executed if any promise fails
        console.error(error);
    }
}

mainAsync();
console.log("Promise example with async / await");
