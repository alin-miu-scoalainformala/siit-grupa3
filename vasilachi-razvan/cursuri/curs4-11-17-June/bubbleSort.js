//Implementati o functie JS ce sorteaza un array de numere intregi folosind urmatorea metoda:

var testArray = [22,4,3,8,6,1,32,9,10];

function bubbleSort(arr) {
    for(let i=0; i<arr.length; i++){
        for(let j=i+1; j<=arr.length; j++){
            if(arr[i]>arr[j]){
                let temp = arr[j];
                arr[j]   = arr[i];
                arr[i]   = temp;
            }
        }
    }
    return arr;
}

console.log(bubbleSort(testArray));