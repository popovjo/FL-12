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

makeNumber('erer384jjjfd123');