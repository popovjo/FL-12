function convert(...args) {
    let arr = [];
    for (let item of args) {
        typeof item === 'string' ? arr.push(parseInt(item)) : arr.push(item + '');
    }
    return arr;
}

function executeforEach(arr, fun) {
    for (let item of arr) {
        fun(item);
    }
}

function mapArray(arr, fun) {
    let mappedArray = [];
    executeforEach(arr, item => mappedArray.push(fun(Number(item))));
    return mappedArray;
}

function filterArray(arr, fun) {
    let filteredArr = [];
    executeforEach(arr, item => {
        if (fun(item)) {
            filteredArr.push(item);
        }
    })
    return filteredArr;
}

function flipOver(str) {
    let flippedStr = '';
    const LAST_INDEX = str.length - 1;
    for (let i = LAST_INDEX; i >= 0; i--) {
        flippedStr += str[i];
    }
    return flippedStr;
}

function makeListFromRange(arr) {
    let listFromRange = [];
    for (let i = arr[0]; i <= arr[1]; i++) {
        listFromRange.push(i);
    }
    return listFromRange;
}

function getArrayOfKeys(arr, key) {
    let arrayOfKeys = [];
    for (let item of arr) {
        arrayOfKeys.push(item[key]);
    }
    return arrayOfKeys;
}

function substitute(arr) {
    const THIRTY = 30;
    mapArray(arr, item => item < THIRTY ? '*' : item);
}

function getPastDay(date, num) {
    const MS_IN_DAY = 86400000;
    const PAST_DAY = new Date(date.valueOf() - num * MS_IN_DAY);
    return PAST_DAY.getDate();
}

function formatDate(date) {
    const ONE = 1;
    return `${date.getFullYear()}/${date.getMonth() + ONE}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}