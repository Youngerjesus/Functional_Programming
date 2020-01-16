/*
    커링은 함수와 인자를 다루는 기법 
    함수의 필요한 인자가 모두 채워지면 실행하는 기법을 말한다 
  
    왜 커링을 쓰는지랑 커링이 어떻게 쓰여지는지 
    어떻게 쓰여지는지는 바로 return 함수가 되는 구조라서 인자가 하나씩 채워지는 구조 
    그래서 인자가 모두 채워지면 실행되는 구조

    왜쓰는지는 원하는 시점까지 기다렸다가 쓰는 

    일반 커리함수는 인자를 왼쪽부터 적용해나가는데
    curry r이라는 함수는 인자를 오른쪽으로부터 적용해나간다 

*/

/*
    object가 null, object가 undefined
*/

function _curry(fn){
    return function(a){
        return function(b){
            return fn(a,b); 
        }
    }
}

let add = _curry(function (a,b) {
    return a + b; 
}); 

let add10 = add(5); 

console.log(add(3)(5)); 
console.log(add10(10)); 


function _curry2(fn){
    return function (a,b){
        if(arguments.length == 2) return fn(a,b);
        return function(b){
            return fn(a,b); 
        }
    }
}

function _curryr(fn){
    return function (a,b){
        return arguments.length == 2 ? fn(a,b) : function (b) { return fn(b,a); }; 
    }
}
// sub10(5) => a가 10 b가 5가 되겠지 

/*
    object가 null이면 undefined고 아니면 값을 출력하는 함수 
    이걸 만든 이유는 obj로 바로 key값을 출력하면 error가 생기기 때문에 

    null is an empty or non-existent value // 비어있거나 존재하지 않는 value 를 말한다 
    null must be assigned // 이게 무슨 말이지
    
    undefined means a variabel has been declared but not defined // 선언은 되있는대 정의되어 있지않은경우를 말한다 
*/


function _get(obj, key){
    obj == null ? undefined : obj[key]; 
}


let _get2 = _curryr(function(obj,key){
    return obj == null ? undefined : obj[key]; 
});  

console.log(_get2('get')('user')); // 이런식으로 사용가능하다 

let get_name = _get2('name'); //이런식으로 name을 꺼내는 함수로 만들어서 사용이가능하다 함수 중간단계를 만들 수 있어서 함수에서 또 함수를 여러개 만들 수 있네
