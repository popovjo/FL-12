function addOne(x) {    
    return x + 1;
}
function pipe(n, ...func) {
    let i;
    for(i = 0; i < func.length; i++){
        n = func[i](n);
    }
    return n;
}

pipe(1, addOne, addOne);