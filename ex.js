function sum(){
    var sum = 0;
    for(var i = 0; i < arguments.length; ++i){
        sum += arguments[i];
    }
    return sum;
}

function sum2(n){
    if(Math.abs(n) == n){
        var suma  = 0;
   
        for(var i = 0; i < n; ++i)
            suma += i;

        return suma;
    }else{
        return 0;
    }
}   

function copyArr(arr){
    var copy = [];

    for(var i = 0; i < arr.length; ++i)
        copy[i] = arr[i];

    return copy;
}

function buubleSort(arr){
    var arr2 = copyArr(arr);
    for(var i = 0; i < arr2.length - 1; ++i)
        for(var j = i + 1; j < arr2.length; ++j)
            if(arr2[i] > arr2[j]){
                var aux = arr2[j];
                arr2[j] = arr2[i];
                arr2[i] = aux;
            }
    return  arr2;   
}

console.log(buubleSort([5, 3, 8, -6, -2]));

//quick sort
