// 1. O functie care compara 2 valori si returneaza true daca sunt egale si false daca nu sunt egale

function f1(a, b) {
    if (a == b) {
        return true;
    } else {
        return false;
    }
}

// 2. O functie care compara 2 valori si returneaza -1 daca primul e mai mic ca al doilea, 0 daca sunt egale si 1 daca primul e mai mare ca al doilea

function f2(a, b) {
    if (a < b) {
        return -1;
    } else if (a == b) {
        return 0;
    } else {
        return 1;
    }
}

// 3. O functie care primeste 2 valori si returneaza maximul dintre cele 2

function f3(a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

// 4. O functie care primeste 2 valori si returneaza minimul dintre cele 2

function f4(a, b) {
    if (a > b) {
        return b;
    } else {
        return a;
    }
}

// 5. O functie care intoarce suma primelor N numere naturale pozitive

function f5(nr) {
    let suma = 0;
    for (let i = 0; i < nr; i++) {
        suma += i;
    }
    return suma;
}

// 6. O functie care verifica daca N este numar prim (restul impartirii la 1 si la N ==0)

function isPrime(a){
    let prime = true;
    for(let i=2; i<Math.sqrt(a); i++ ) {
        if( a%i == 0){
            prime = false;
            break;
        }
    }
    return (prime && a > 1);
}

// 7. O functie care intoarce suma primelor N numere prime

function f7(a){
    let sum = 0;
    let i	= 2;
    let counter = 1;
    while(counter <= a) {
        if(isPrime(i)){
            sum += i;
            counter++;
        }
        i++;
    }
    return sum;
}

// 8. O functie care primeste un parametru de tip string si intoarce inversul acestuia (abc => cba)

function f8(a){
    let reversedString = '';
    for( let i= a.length-1; i>=0; i--){
        reversedString += a[i];
    }
    return reversedString;
}

// 9. O functie care intoarce produsul primelor N numere impare pozitive

function f9(a){
    let produs = 1;
    let counter = 0;
    let i = 0;
    while(counter < a){
        if(i % 2 !=0){
            produs *= i;
            counter++;
        }
        i++;
    }
    return produs;
}

// 10. O functie care primeste 2 parametri(arr - array de nr intregi si x - numar) si verifica daca x exista in array

function f10(arr,x){
    let flag = false;
    for( let i=0; i<arr.length; i++) {
        if (arr[i] == x) {
            flag=true;
            break;
        }
    }
    return flag;
}

// 11. O functie care intoarce maximul dintr-un array primit ca parametru

function f11(arr){
    let max = 0;
    for( let i=0; i<arr.length; i++){
        if(arr[i]>max){
            max = arr[i];
        }
    }
    return max;
}

// 12. O functie care intoarce suma dintre max si min, dintr-un array primit ca parametru

function f12(arr){
    let max = 0;
    let min = arr[0];
    for( let i=0; i<arr.length; i++){
        if(arr[i]>max){
            max = arr[i];
        }else if (arr[i]<min){
            min = arr[i];
        }
    }
    return min+max;
}

// 13. O functie care verifica daca exista duplicate intr-un array primit ca parametru

function f13(arr){
    let flag = false;
    for(let i=0; i<arr.length-1; i++){
        for(let j=i+1; j<arr.length; j++){
            if(arr[i]==arr[j]){
                flag = true;
                break;
            }
        }
    }
    return flag;
}

// 14. O functie care intoarce produsul numerelor pozitive intr-un array primit ca parametru

function f14(arr){
    let produs = 1;
    for(let i=0; i<arr.length; i++){
        if(arr[i]>0){
            produs *= arr[i];
        }
    }
    return produs;
}


// 15. O functie care verifica daca un string primit ca parametru este palindrom (inversul == originalul, ex: abcba == abcba, abca != acba

function f15(a) {
    return a == a.split("").reverse().join("");
}