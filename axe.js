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
