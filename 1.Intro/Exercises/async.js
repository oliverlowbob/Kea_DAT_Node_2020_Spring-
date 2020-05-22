// event loop
// main thread -------------


// when to use async:
// open a file, read / write, make a request online, interact with a db

// Promises are syntactical sugar for callbacks
// pending
// fulfilled > (resolved, rejected)

// new Promise((resolve, reject) => {
//     try {
//         setTimeout(() => {
//             resolve("Everything went well");
//         }, 4000);
//     } catch {
//         reject("Something went wrong");
//     }
// }).then(message => console.log(message))
// .catch(errorMessage => console.log(errorMessage));


function myPromise(){
    return new Promise((resolve, rejects) =>{
        setTimeout(() =>{
            resolve("done")
        }, 5000);
    });
};


// myPromise().then(message =>{
//     console.log(message)
// });

async function callMyPromise(){
    const msg = await myPromise();
    console.log(msg)
};

callMyPromise();

