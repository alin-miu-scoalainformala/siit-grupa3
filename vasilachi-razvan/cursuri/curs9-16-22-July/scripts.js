// var ages = [2,9,22,4,3,5];
// console.log(ages.filter(nr => nr%2  ===0 ));
const isMomHappy = true;
// Promise
const willIGetNewPhone = new Promise(
    (resolve, reject) => { // fat arrow
        if (isMomHappy) {
            const phone = {
                brand: 'zaSamsung',
                color: 'black'
            };
            resolve(phone);
        } else {
            const reason = new Error('mom is not happy');
            reject(reason);
        }
    }
);

// willIGetNewPhone
//     .then(fulfilled => console.log(fulfilled)) // fat arrow
//     .catch(error => console.log(error.message));

var someData = 2;
const test = new Promise((resolve, reject) => {
    setTimeout(()=>{
        if(typeof someData=='string') {
            resolve(someData.toUpperCase());
        }else {
            const reason = new Error(someData);
            reject(reason);
        }
    }, 2000);
});

test
    .then(r => console.log(r))
    .catch(e => console.log(e));

