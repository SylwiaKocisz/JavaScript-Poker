// Scale riddle. With 8 balls  EXAM [1,1,1,1,2,1,1,1]. One of the items will be change to two. 
// Indexes are to be chosen at random. Use compressions only two times. 

let arr = [1, 1, 1, 1, 1, 1, 1, 1];

function newArr(arr) {
    arr[Math.floor(Math.random() * arr.length)] = 2;
    return arr
}

console.log(newArr(arr));

let arrNew = [];
function newFunction(arr) {
    let index;

    while (arr[0]) {
        index = Math.floor(Math.random() * arr.length);
        arrNew.push(arr[index]);
        arr.splice(index, 1);
    }
    return arrNew;
}
console.log(newFunction(arr))

let sum1 = arrNew[0] + arrNew[1] + arrNew[2]
let sum2 = arrNew[3] + arrNew[4] + arrNew[5]
let sum3 = arrNew[6] + arrNew[7]



function solution() {
    if (sum1 == sum2) {
        if (arrNew[6] > arrNew[7]) {
            return "index No 6"
        } else {
            return "index No 7"
        }

    } else if (sum1 > sum2) {
        if (arrNew[0] == arrNew[1]) {
            return "index No 2"
        } else if (arrNew[0] > arrNew[1]) {
            return "index No 0"
        } else {
            return "index No 1"
        }
    } else if (sum2 > sum1) {
        if (arrNew[3] == arrNew[4]) {
            return "index No 5"
        } else if (arrNew[3] > arrNew[4]) {
            return "index No 3"
        } else { return "index No 4" }
    }
}
setTimeout(function () { console.log(solution()) }, 1000);
