const L = {}; 
    
// Generator를 이용해 iterator를 만드는 
L.range = function *(l) {
    let i = -1; 
    while(++i < l){
        yield i; 
    }; 
};

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

console.log(L.range(5)); 
// [0,1,2,3,4]; 

const add = (a,b) => a + b; 

const list = L.range(5); 
console.log(reduce(add, list)); 