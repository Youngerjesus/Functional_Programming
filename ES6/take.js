const range = l => {
    let i = -1; 
    let res = []; 
    while(++i < l){
        res.push(i); 
    }; 
    return res; 
};

const L = {}; 

L.range = function *(l) {
    let i = -1; 
    while(++i < l){
        yield i; 
    }; 
};

const go = (...args) => reduce((a, f)=> f(a), args);  

const reduce = (f,acc,iter) => {
    if(!iter){
        iter = acc[Symbol.iterator](); 
        acc = iter.next().value; 
    }

    for(const a of iter){
        acc = f(acc, a); 
    }
    return acc; 
}; 
        
const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._); 


const take = curry((l, iter) => {
    let res = []; 
    for(const a of iter){
        res.push(a); 
        if(res.length == l) return res; 
    }
    return res; 
}); 

console.log(take(5, range(100))); 
console.log(take(5, L.range(100))); 

go(
    range(1000), 
    take(5), 
    console.log
);
