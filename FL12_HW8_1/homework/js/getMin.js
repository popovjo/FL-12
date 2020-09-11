function getMin() {
    let arr = [];
    for (let i = 0; i < arguments.length; i++) {
        arr.push(arguments[i]);
    }
    let compFunc = function (a, b) {
        return a - b;
    }
    return arr.sort(compFunc)[0];
}
getMin(3, 0, -3);