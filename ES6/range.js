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

const range = l => {
    let i = -1; 
    let res = []; 
    while(++i < l){
        res.push(i); 
    }; 
    return res; 
};
 
// [0,1,2,3,4]; 

const add = (a,b) => a + b; 

const list = range(5); 
console.log(reduce(add, list)); 