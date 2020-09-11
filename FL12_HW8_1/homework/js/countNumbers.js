function makeNumber(str) {
    let arrFinal = [];
    let arr = str.split('');
    for (let i = 0; i < arr.length; i++) {
        if (isNaN(arr[i]) === false) {
            arrFinal.push(arr[i]);
        }
    }
    return arrFinal.join('');
}

function countNumbers(str) {
    
    let result = {};
    makeNumber(str).split('').forEach(function (a) {
        if (result[a] !== undefined) {
            ++result[a];
        } else {
            result[a] = 1;
        }
    });
    return result;
}

countNumbers('erer384jj4444666888jfd123');