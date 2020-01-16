/*
순수함수 상태를 변경하지않는 함수 
순수함수가 왜 중요한데
순수함수는 객체를 다룰 수 없는가? 
함수형 프로그래밍은 객체의 값들을 변형해나가늗네 원래의 값들은 그대로두고 새로운 값들을 복사해서 변형해서 리턴해주는 식으로 

함수형 프로그래밍은 평가시점이 중요하지않다  
평가시점마다 결과가 다르다면 output을 예상하기가 어렵겠지 
평가시점이 중요하지않다면 output을 예상하기가 쉽다  
함수가 외부값을 참조할 경우 동일한 인자를 준다고해서 동일한 결과를 리턴하지않는다 . (함수형 프로그래밍에서는 동일한 결과를 리턴하는게 되게 중요한거같다 )

함수형 프로그래밍은 순수함수를 통해서 조합성을 강조한다 

*/

let obj ={val: 10}; 

function add(a,b) {
    return a+b; 
}

function add_pure(obj, b){
    return {val: obj.val + b}; 
}

console.log(add_pure(obj,5)); 
console.log(obj); 


// 일급함수 예제
/*
자바스크립트는 일급함수 
일급함수는 함수를 값으로 다를 수 있다는 의미 함수를 변수에 담을 수 있고  이 함수를 변수에 넣어서 들고 다닐 수 있고 
다른함수에 인자로 넘겨주는게 가능하거나 

언제 평가해도 상관없는 순수함수들을 여러개만들고 
순수함수들을 들고다니면서 가장 적절한 시점마다 
*/


let f1 = function (a) {
    return a * a; 
}; 

let f2 = add; 

function f3(f){
    return f(); 
}


function add_maker(a) {
    return function (b) {
        return a+b; 
    }
}

let f4 = add_maker(10); 


function f5(f1, f2, f3) {
    return f1() + f2() + f3(); 
}

console.log( f5(
    function(){return 2; },
    function(){return 3; }, 
    function(){return 5; }
)); 



console.log(f1); 
console.log(f2); 
console.log(f3(function() {return 10;}));
console.log(f4(20));  

