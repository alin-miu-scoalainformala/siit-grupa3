/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////Rezolvati exercitiile urmatoare si salvati-le aici si la link-ul urmator: https://goo.gl/tJdzvx
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

testArray = [1,2,6,5,4];
// 1. Scrieti o functie JS care primeste ca parametrii doua numere si returneaza media aritmetica a acestora.
function avgTwoNumbers(a, b) {
    return (a+b)/2;
}

// 2. Scrieti o functie JS care primeste ca parametru un array de numere si returneaza media aritmetica a acestora.
function avgMultipleNumbers(arrayNr) {
    var sum = 0;
    for(var i=0; i<arrayNr.length; i++){
        sum += arrayNr[i];
    }
    return sum/arrayNr.length;
}

// 3. Scrieti o functie JS care primeste ca parametru un array de numere si returneaza suma numerelor impare din array.
function sumOfTheOddNumbers(arrayNr) {
    var sum = 0;
    function isPrime(num) {
        for(var i = 2; i < num; i++)
            if(num % i === 0) return false;
        return num !== 1;
    }

    for(var i=0; i<arrayNr.length; i++){
        if(isPrime(arrayNr[i])){
            sum += arrayNr[i];
        }
    }
    return sum;
}
// 4. Scrieti o functie JS care primeste ca parametru un string si returneaza numarul aparitiilor literei "m".
function noOfOccurance(str) {
    var newString = str.split("");
    var count = 0;
    for( var i=0; i<newString.length; i++){
        if(newString[i]==='m'){
            count++;
        }
    }
    return count;
}


// 5. Scrieti o functie JS care primeste ca parametru un array de numere nesortate de la 1 la n si returneaza unicul numar lipsa.
function missingNumber(nr, arrayNr) {
    var newArray = arrayNr.sort(function(a, b){return a-b});
    var missingNr = 0;
    for(var i=1; i<nr; i++){
        if(newArray[i] != (newArray[i-1] + 1)) {
           missingNr = i+1;
           break;
        }
    }
    return missingNr;
}
console.log(missingNumber(6,testArray));

// 6. Scrieti o functie JS care primeste ca parametru un string si ii dubleaza litera "b" si returneaza noul string.
// Exemplu: pentru stringul "biblioteca" va returna "bbibblioteca"
function doubleB(str) {
    var newString = str.split("");
    for(var i=0; i<str.length; i++){
        if(newString[i]==='b'){
            newString[i] = 'bb';
        }
    }
    return newString;
}

// 7. Scrieti o functie JS care primeste ca parametru un string si elimina toate aparitiile literelor "a", "r" si "m" si returneaza stringul rezultat.
//Exemplu: pentru stringul "important" va returna "iportnt"
function eliminateARM(str) {
    var newString = str.split("");
    for( var i=0; i<newString.length; i++) {
        if(newString[i]==='a' || newString[i]==='r' || newString[i]==='m'){
            newString.splice(i,1);
        }
    }
    return newString;
}

// 8. Scrieti o functie JS care primeste ca parametru un numar si returneaza cifrele acestuia intr-un array.
function digitsOfNumber(nr) {
    var sNumber = nr.toString();
    return sNumber.split("");
}

// 9. Scrieti o functie JS care primeste ca parametru un numar si verifica daca este palindrom.
// Va returna true sau false.
// Exemplu: "12321" este palindrom "12345" nu este palindrom
function isPalindrom(nr) {
    return nr == nr.split('').reverse().join('');
}

// 10. Scrieti o functie JS care primeste ca parametru un array de numere si returneaza acel array sortat descrescator.
function sortDesc(arrayNr) {
    return arrayNr.sort(function(a, b){return b-a});
}