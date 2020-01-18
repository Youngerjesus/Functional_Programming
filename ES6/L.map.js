const L = {}; 
L.map = function *(f, iter){
    for (const a of iter){
        yield f(a); 
    }
}; 

let it = L.map(a => a + 10 ,[1,2,3]);  

console.log(it.next()); 
console.log(it.next()); 
