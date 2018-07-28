// var s = function sum(a,b) {
//     return a+b;
// }

// var s2 = (a,b) => {
//     return a+b;
// }

// var s3 = (a,b) => a+b;

// console.log(s(4,7));
// console.log(s2(4,7));
// console.log(s3(4,7));

// arr = [3,62,234,7,23,74,23,76,92,100];
// console.log(arr.filter(e => e > 70));

// arr2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// console.log(arr2.filter(e => e%3===0));

const isItASting = "make me uppercase";

const delayedUpperCase = new Promise(
    (resolve, reject) => {
        setTimeout(() => {
            if (typeof (isItASting) === "string") {
                stringToUpperCase = isItASting.toUpperCase();
                resolve(stringToUpperCase);
            } else {
                const reason = new Error("not a string!");
                reject(reason);
            }
            // (typeof param === 'string') ? resolve(param.toUpperCase()) : reject(param);
        }, 5000);
    }
);

delayedUpperCase
    .then(fulfilled => console.log(fulfilled))
    .catch(error => console.log(error.message));