/*
    함수를 인자로 받아서 연속적으로 실행하는 함수 
    예를들면 두개의 함수를 인자로 받아서 실행하는 함수 

    파이프는 결국 reduce  
*/

function _reduce(list, iter, memo) {
    _each(list, function(val){
        memo = iter(memo, val);  
    }); 
    return memo; 
}


function _each(list, iter) {
    for(let i=0;i<list.length;i++){
        iter(list[i]); 
    }
    return list; 
}


function _pipe(){
    let fns = arguments; 
    return function(arg){
        return _reduce(fns, function(arg, fn){
            return fn(arg); 
        }, arg)
    }
}

let f1 = _pipe(
    function(a){ return a + 1; }, 
    function(a){ return a * a }); 

console.log(f1(1)); 

console.log(f1); 


/*
    
*/
