 
/*
    reduce    
    애초에 reduce 뜻이 축약하다라는 의미 list에 있는 원소들을 순회하면서 하나의 값으로 축약해나가는 함수 
    시작값을 주고 리스트에서 하나하나씩 빼서 함수를 실행하면서 시작값을 기준으로 축약해나가는 함수 
*/
function _reduce(list, iter, memo) {
    _each(list, function(val){
        memo = iter(memo, val);  
    }); 
    return memo; 
}

console.log(
    _reduce([1,2,3] , function(a,b){
        return a+b; 
    },0)
); 

function _each(list, iter) {
    for(let i=0;i<list.length;i++){
        iter(list[i]); 
    }
    return list; 
}


// memo의 인자를 주지 않는 경우 
function _reduce2(list, iter, memo) {
    if(arguments.length == 2){
        memo = list[i]; 
        list = list.slice(1); //  이럴경우 array에만 적용할 수 있는 한계가 있다 
    }
    _each(list, function(val){
        memo = iter(memo, val);  
    }); 
    return memo; 
}


function _reduce3(list, iter, memo) {
    if(arguments.length == 2){
        memo = list[i];
        list = _rest(list, 1); 
    }
    _each(list, function(val){
        memo = iter(memo, val);  
    }); 
    return memo; 
}

let slice = Array.prototype.slice; 
function _rest(list, num){
    slice.call(list, num || 1); 
}

