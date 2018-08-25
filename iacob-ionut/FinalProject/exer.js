/*Dat fiind un arr de numere intregi, gasiti toti liderii din acest arr. 
Un numar este lider daca este mai mare decat toate numerele de la dreapta lui.(ex: ultimul element este intotdeauna lider)*/


function findLeader(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let potentialLeader = arr[i];
        let leader = true;
        for (let j = i + 1; j < arr.length; j++)
            if (arr[j] > potentialLeader) {
                leader = false;
                break;
        }
        if (leader) {
            result.push(potentialLeader);
        }
    }

    return result;
}
let arr = [5, 70, 13, 1, 3, 4, 67, 8765, 123, 1231, 213, 6, 33];
console.log(findLeader(arr))

/*Exercitiu: triunghiul lui Pascal
https://en.wikipedia.org/wiki/Pascal%27s_triangle

Implementati un algoritm ce generaza triunghiul lui Pascal. Dupa generare, afisati triunghiul pe ecran, folosind elemente de html si css.*/


function pascalTriangle(rows) {

    let result = [
        [1],
       [1,1]
    ];
    
    for (i = 2; i < rows; i++) {
        let rand = [];
        rand[0] = 1;
        rand[i] = 1; 
        let upperRand = result[i-1];
        for (j = 1; j < i; j++) {
            rand[j] = upperRand[j] + upperRand[j-1];
        }
        result.push(rand);
    }
    return result;
}

console.log(pascalTriangle(5))

