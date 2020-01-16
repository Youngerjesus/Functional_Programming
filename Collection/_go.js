/*
    reduce는 값을 축약하는 함수를 말한다 하나의 값으로 
    
    const nums = [1,2,3,4,5]; 
    이렇게 값들이 있을떄 하나의 값으로 축약을 할떄 dl
*/ 
const nums = [1,2,3,4,5]; 
let total = 0; 

for(const n of nums ){
    total += n; 
}
console.log(total); 

const reduce = (f,acc,iter) => {
    for(const a of iter){
        acc = f(acc, a); 
    }
    return acc; 
}; 

const add = (a,b)=> {
    a + b; 
}; 

// Example 
console.log(reduce(add, 0, [1,2,3,4,5])); 

// 내부 동작은  add(add(add(0,1),2),3) 이런식으로 진행하면서 하나의 값으로 간다 

/*
    go라는 함수는 
    const go = () => {};
    go(
        0, 
        a=>a+1,
        a=>a+2,
    ); 
    순서대로 연속적으로 실행을하는걸 말한다 
*/

// 인자를 여러개 받을 수 있도록 ...args 
// const go = (...args) => reduce((a,f)=> f(a), args);  

 
