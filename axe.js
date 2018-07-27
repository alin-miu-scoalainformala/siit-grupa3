//sum a 2 nr
function sum(a, b) {
    return a + b;

}


// suma a 50 nr
// hint structura de date numita array
//[1,2,3,4,5,6 -5,2,9]
function sum(arr){
    var suma=0;
    for(var i=0;i<arr.length;++i) {
        suma = suma + arr[i];
    }  
    return suma;
}

// suma primelor N numere naturale pozitive
function sum(n){
    for(i=0;i<n;++i){
        suma = suma + i;
    }
    return suma;
}

//aranjare unui sir Bubble

function sort(arr){
    var copy =[];
    for(var i=0;i<arr.length;i++){
        copy[i]=arr[i];
    }
    return copy;

}

function sort(arr){
    var local arr = copyArr(arr);
    for(var=0;i<local_arr.length-1;i++) {
        for(var j=i+1; j<local_arr.length;j++) {
            if(local_arr[i]>local_arr[j]) {
                var aux = local_arr[i];
                local_arr[i] = local_arr[j];
                local_arr[j] = aux;
            }
        }
    }
    return local_arr;

}

//  O functie care verifica daca N este numar prim (restul impartirii la 1 si la N ==0)
function isPrime(num) {
    for(var i = 2; i < num; i++){
      if(num % i === 0){ 
          return false;
        }
    }
    //return num !== 1;
    return true;
  }
  //apel de functie:
  v=isPrime(5);
  console.log(v);


  //suma primelor N numere
  var nr = 0;
  var sum=0;
while(nrPrime<n){
  if(isPrime(){
      nrPrime = nrPrime+1;
  }
  nr=nr+1;
}

// ________________________________
var l=0;
functon f();
    var=0;
    if(...){
        l=0;
    //deClara variabile la nivel de bloc: LET sau CONST
    }


//FizzBuzz

function fizzbuzz(){
    for(i=1; i<=100; i++){
    if(i%3==0){
        alert("fizz");
    }
    else if(i%5==0){
        alert("buzz");
    }
    else if(i%15==0){
        alert("Fizz Buzz")
    }
    else if(i%7==0){
        alert("Rizz")
    }
    else if(i%13==0){
        alert("Bizz")
    }
    else if(i%13==0 && i%7==0){
        alert("Rizz Bizz")
    }
    else{
        alert("Value of i is " + i);
    }
}
}

//________________________
let s = "abc";
let invers = "";
for (let i=s.length-1; i>=n; i--){
    invers = invers + s[i];
}


// Duplicatele intr-un array: true/
function f(arr){
    for(let i=0; i<arr.length; ++i) {
        for(let j=0; j<arr.length; ++j){
            if(arr[i]==a[j] && i!=j){
                return true;
            }
        } 
    }
    return false;

}

//O functie care primeste 2 parametri(arr - array de nr intregi si x - numar) si verifica daca x exista in array
//parcurgere lista cu for(i)
// if a[i] == x
//return true
//return false.



// cautare binara: se imparte in 2 si apelezi functia  
var sir = [1,2,3,5,7,9];
function f(sir, numarDeCautat){
  var jum= sir[parseInt(sir.length/2)];
    //console.log(jum);
    if(jum == numarDeCautat){
        return true;
    }
    else {
        if(sir.length>1){
            if(numarDeCautat<jum){
                var sirStanga = sir.slice(0, sir.length/2)
                return f(sirStanga, numarDeCautat);
            }
            else{
            var sirDreapta = sir.slice(length/2, sir.length)
            if(numarDeCautat<jum)
            }
            {
                f(sirStanga, numarDeCautat);
            } 
            else 
            {
                f(sirDreapta, numarDeCautat)
            } 

        }    
       
    }
}


//______________BUBBLE SORT

function b(a){
    for(i=0;i<=a.length; ++i){
        for(j=0; j<=a.length;++j){
            if( a[i] >a[j]){
                var x = a[i];
                var a[i] = a[j];
                var a[j] = x;
                

            }
        }
        
    }
 
}


// Sirul lui Fibonaci
//f(n) = f(n-1) + f(f-2)
function f(n){
if(n==0) return 0;
if(n==1) return 1;
return f(n-1) + f(f-2);
}

//---------

//MATRICE in spirala

function paseSpiralMatrix(a){
    var s = "";
    var n = a.length;
    for()
}