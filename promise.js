
var asycAdd = (x, y) => {
    return new Promise((resolve, reject) => {
        if (typeof x === 'number' && typeof y === 'number') {
            setTimeout(() => resolve(x + y), 1500);
        }
        else {
            reject('Arguments are not correct');
        }
    });
};

// asycAdd(10, '10')
//     .then((res) => { console.log(res); return asycAdd(res, 12); }, (error) => console.log(error))
//     .then(res => console.log(res), error => console.log(error));

asycAdd(10, '10')
    .then((result) => { console.log(result); return asycAdd(result, 12); })
    .then(result => console.log(result))
    .catch(error => console.log(error));

// console.log("Started....");

// var promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("Promise kept!!!")
//     }, 2000);
// }).then((msg) => console.log(msg));

// console.log("Finished");