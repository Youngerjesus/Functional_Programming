/*
    여러가지 데이터를 다루기 위해서 다향성을 높이는 방법을 써야한다
    null이 들어와도 잘 돌아가게 
    _each에는 null이 들어오면 error가 난다  
    이런 다형성을 높이기 위한 방법으로 _get()을 쓴다  
*/ 

function _curryr(fn){
    return function (a,b){
        return arguments.length == 2 ? fn(a,b) : function (b) { return fn(b,a); }; 
    }
}

function _get(obj, key){
    obj == null ? undefined : obj[key]; 
}

function _each(list, iter) {
    for(let i=0;i<list.length;i++){
        iter(list[i]); 
    }
    return list; 
}

let get = _curryr(_get); 
let length = _get('length'); 



// Object.keys Object가 아니여도 error가 안나게 
function _is_Obejct(obj){
    return typeof obj == 'object' && !obj; 
}

function _keys(obj){
    return _is_Obejct(obj) ? Object.keys(obj) : [];  
}


// each의 다향성 높이기, Array가 아니라 데이터베이스에서 가져온 값인 경우 id:를 기준으로 loop를 돌아야하는데 id가 항상 1씩 증가하는게 아니겠지 
// 하나의 근원적인 다향성을 높여버리면 그 함수를 사용하는 다른함수도 다향성이 높아지네 

function _each(list, iter) {
    let keys = _keys(list);  

    for(let i=0, len = keys.length; i<len;i++){
        iter(list[keys[i]]); 
    }
    return list; 
}

