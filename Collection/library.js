// Reduce 2
const products = [
    {name:'반팔티', price: 20000}, 
    {name:'긴팔티', price: 25000}, 
    {name:'핸드폰', price: 30000}, 
    {name:'케이스', price: 15000}, 
    {name:'후드티', price: 40000}, 
    {name:'바지', price: 18000}, 
]; 


/*
    map 
*/ 
const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._); 

const map = curry((f, iter) => {
    let res = []; 
    for(const a of iter){
        res.push(f(a)); 
    }
    return res; 
}); 

console.log(map(
    p => p.name, products
)); 

/*
    filter 
*/ 

const filter = curry((f, iter) => {
    let res = []; 
    for(const a of iter){
        if(f(a)) res.push(a); 
    }
    return res; 
}); 


console.log(filter(
    p => p.price < 20000, products
)); 


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

const reduce = curry((f,acc,iter) => {
    if(!iter){
        iter = acc[Symbol.iterator](); 
        acc = iter.next().value; 
    }

    for(const a of iter){
        acc = f(acc, a); 
    }
    return acc; 
}); 


// Example 
// reduce에다가 시작값을 주어주지 않으면 리스트의 첫번쨰 요소의값이 시작값으로 되어야한다 
// Symbol.iterator ? 
// iter.next()?



console.log(reduce((total_price, product)=> {
    return total_price + product.price; 
},0, products));



// pipe 함수 함수를 리턴하는 함수 
/*
    go와 비슷하지만 함수를 축약하는 형태 
    const f = pipe(
        a => a+1, 
        a => a+10, 
        a => a+100
    ); 
*/ 

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

// 리스트에다가 함수들이 들어가는것 함수들을 하나씩 실행하는것 
// ...args는 가변적인 매개변수가 올 수 있음을 말한다 
const go = (...args) => reduce((a, f) => f(a), args);  
const pipe = (f,...fs) => (...as) => go(f(...as), ...fs); // 여기서 a 는 나중 인자를 말한다  
// const pipe = (...fs) => (a) => go(a, ...fs); 원래 형태 
// 여기서 첫함수를 꺼내서 실행을 하는것 

const add = (a,b) => a + b; 
// 파이프 함수를 처음 시작할때 인자를 두개 이상을 받을 수 있으면 좋겠다 

const f = pipe(
    (a,b) => a+b, 
    a => a+10, 
    a => a+100
); 


console.log(f(0,1)); 

// go를 이용해 읽기 좋은 코드로 바꾸기 

let abc; 
go(
    products, 
    products => filter(p => p.price < 20000, products), 
    products => map(p => p.price, products), 
    prices => reduce(add, prices),
    prices => console.log(prices)
);  

console.clear(); 
console.log(reduce(add, 
    map(p => p.price, 
        filter(p => p.price < 20000, products)))); 


const mult = curry((a,b) => a * b);
console.log(mult(3)(2)); 

// curry를 써서 간단하게 만든것 
go(
    products, 
    filter(p => p.price < 20000), 
    map(p => p.price), 
    reduce(add),
    console.log
); 
