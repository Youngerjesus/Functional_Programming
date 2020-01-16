/*
    컬렉션 중심 프로그래밍 대표적인 4가지 
    1. 수집하기: map, values, pluck  
    2. 거르기: filter, reject, compact, without
    3. 찾아내기: find, some, every 
    4. 접기: reduce, min, max, group_by, count_by 

    컬렉션은 배열이나 Array like같은 데이터들을 말한다 
*/ 

let users =[
    {id: 1, name:'AM', age: 20},
    {id: 2, name:'BM', age: 21},
    {id: 3, name:'CM', age: 22},
    {id: 4, name:'DM', age: 23},
    {id: 5, name:'EM', age: 34},
    {id: 6, name:'FM', age: 25},
    {id: 7, name:'GM', age: 36},
    {id: 8, name:'HM', age: 27}
]; 

let slice = Array.prototype.slice; 

function _rest(list, num){
    slice.call(list, num || 1); 
}

function _reduce(list, iter, memo) {
    if(arguments.length == 2){
        memo = list[0]; 
        list = _rest(list); 
    }
    _each(list, function(val){
        memo = iter(memo, val);  
    }); 
    return memo; 
}


function _curry(fn){
    return function(a){
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

let _map = _curryr(function (list, mapper){
    let new_list = []; 
    _each(list, function(val, key){ new_list.push(mapper(val, key));}); 
    return new_list;
});  

// map을 이용해 Values함수 만들기 obj인 경우 values함수가 의미있다 

function _is_Obejct(obj){
    return typeof obj == 'object' && obj; 
}

function _keys(obj){
    return _is_Obejct(obj) ? Object.keys(obj) : [];  
}

function _values(data){
    return _map(data, _identity); 
}

function _each(list, iter) {
    let keys = _keys(list);  
    for(let i=0, len = keys.length; i<len;i++){
        iter(list[keys[i]] ,keys[i]); 
    }
    return list; 
}

function _identity(val){
    return val; 
}

_values = _map(_identity); // 이렇게 사용해서 값을 받을 준비를 해줘도 된다 

console.log(users[0]);
console.log(_values(users[0])); 


// pluck 함수 만들기 
/* 
   pluck라는 함수 

   function pluck() {}
   _pluck(users, 'age'); 
   이렇게 쓸 경우 age들만 다 뽑혀서 나오는것 
   values에서 더 구체적으로되넉네 
*/ 


let _get = _curryr(function _get(obj, key){
    obj == null ? undefined : obj[key]; 
}); 

function _pluck(data, key){
    return _map(data, function(obj){
        return obj[key]; // map이라는게 list의 한 요소중 어떤 데이터를 가져올건지 
    });
}


function _pluck2(data, key){
    return _map(data, _get(key));
}

console.log(_pluck(users, 'age')); 


// filter를 통해서 reject와 compact를 만든다 
// filter는 통과된 값들만 가져온다면 
// reject는 통관된 값들을 처낸다 

function _filter(users, predi){
    let new_list = []; 
    _each(users, function(val){
        if(predi(val)) { 
            new_list.push(val); 
        }
    }); 
    return new_list; 
}

function _reject2(data, predi){
    return _filter(data, function(val){
        return !predi(val); 
    })
}

// 반대함수를 리턴하는 함수 
function _negate(func){
    return function(val){
        return !func(val); 
    }
}

let _reject = _curryr(function (data, predi){
    return _filter(data, _negate(predi)); 
});  

console.log(_reject(users, function(user){ return user.age > 30; }));


// compact 함수 만들기 
/*
    _compact([1,2,0,false,null, {}])
    에서 false,와 null은 사라지고 1,2,0,{}만 남도록 의미있는 값들만 가져오도록 하는것 
*/

let filter = _curryr(_filter); 
let _compact = filter(_identity); // 미리 identitiy를 넣어주는것 curry

console.log(_compact([1,2,0,false, null, {}]));

// 3. 찾아내기 find
// 3-1 find 배열안에서 조건을 만족하는  맨처음 값을 리턴해주는
// 3-2 find_index 배열안에서 해당하는 값을 맨처음 만났을떄 index를 리턴 
// 3-3 some 
// 3-4 every 

let _find = _curryr(function (list, predi) {
    let keys = _keys(list);  
    for(let i=0, len = keys.length; i<len;i++){
        let val = list[keys[i]]; 
        if(predi(val)) return val; 
    }
    return undefined;
});  

let _find_index = _curryr(function (list, predi){
    let keys = _keys(list);  
    for(let i=0, len = keys.length; i<len;i++){
        let val = list[keys[i]]; 
        if(predi(val)) return i; 
    }
    return -1;
});   

function _pipe(){
    let fns = arguments; 
    return function(arg){
        return _reduce(fns, function(arg, fn){
            return fn(arg); 
        }, arg)
    }
}


function _go(arg){
    let fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg) ; // apply를 통해서 배열로 인자를 받는다는 뜻 
}


console.log(
    _find(users, function(user){
        return user.age === 20; 
    })
);

console.log(
    _find_index(users, function(user){
        return user.age == 20; 
    })
); 
 


// some 만들기 every 만들기 
/*
    _some([1,2,5,10,20], function(val){
        return val > 10 
    }); 
    어떤 집합속에서 이 조건을 만족하는 값이 '하나라도' 있는가?를 묻는 질문 

    _every([1,2,5,10,20], function(val){
        return val > 10 
    }); 
    어떤 집합은 이 조건을 모두 만족하는 값인가? 를 묻는 질문

    some과 every는 predi가 null이어오 통과해야한다
*/
// find를 이요앻서 만들수 있다 find를 하는데 -1이 아니라면 존재하는것이니까 
function _some(data, predi){
    predi = predi || _identity; 
    return _find_index(data, predi) != -1;  
}

console.log(_some([1,2,5,10,20], function(val){return val > 10; })); 
console.log(_some([1,2,5,10,20], function(val){return val > 30; })); 

// every는 모든 조건을 다 통과해야하니까 반대되는 조건이 있는애가 존재하는지를 찾아주면된다 
function _every(data, predi){
    predi = predi || _identity; 
    return _find_index(data, _negate(predi)) == -1; 
}

console.log(_every([1,2,5,10,20], function(val){return val > 1;})); 
console.log(_some([1,2,5,10]));
console.log( _every([null, false, 0]));

// 4. 접기 - reduce : 집계된합 merge된 합 
// 4-1. min, max, min_by, max_by, : min_by는 어떤 조건을 더 거는것 
// 4-2. group_by, push 
// 4-3. count_by, inc 
/*
    _min([1,2,4,5,-4]) // 제일 작은값 
    -max([1,2,5,10]) // 제일 큰 값  
    모든 값들을 확인해보고 한 결과를 내는게 reduce 이런 reduce를 응용해서 min과 max를 만들 수 있다 

    _min([1,2,4,5,-4], Math.abs) // 어떠한 숫자들중에서 절대값으로 취한 다음에 최소값을 비교하는것 원본 집단을 건들지 않는 상태에서 비교를 하는ㄱ
*/

function _min(data){
    return _reduce(data, function(a,b){
        return a < b ? a : b; 
    });
}


function _max(data){
    return _reduce(data, function(a,b){
        return a > b ? a : b; 
    });
}

console.log(
    _min([1,2,5,10,-4])
); 

console.log(
    _max([1,2,5,10,-4])
); 

let _min_by = _curryr(function (data, iter){
    return _reduce(data, function(a,b){
        return iter(a) < iter(b) ? a : b; 
    });
}); 

let _max_by = _curryr(function (data, iter){
    return _reduce(data, function(a,b){
        return iter(a) > iter(b) ? a : b; 
    });
}); 

console.log(
    _min_by([1,2,5,10,-4], Math.abs)
); 

console.log(
    _max_by([1,2,5,10,-4,-11], Math.abs)
); 

console.log(
    _min_by(users, _get('age')) 
); 

/*
    group_by는 특정 기준을 주고 그룹을 짓는것 
    나이를 기준으로 그룹을 지엇다고 해보자 
    let users2 = {
        36: [{id: 10, name:'jm', age :36}], 
        21: [{id: 5, name: 'AM', age:21}, {id: 1, name: "hm", age:21}]  
    } 

    count_by는 몇개가 있는지 

    inc는 안전하게 값을 증가시키는 함ㅅ
*/ 

function _push(obj, key, val){
    (obj[key] = obj[key] || []).push(val);  
    return obj; 
}

let _group_by = _curryr(function(data, iter){
    return _reduce(data, function(grouped,val) { 
        _push(grouped, iter(val), val); 
        return grouped; 
    }, {}) 
})

let _count_by = _curryr(function(data, iter){
    return _reduce(data, function(count, val){
        return _inc(count, iter(val)); 
    }, {})
}); 

let _inc = function(count, key){
    count[key] ? count[key]++ : count[key] = 1;
    return count;
}; 

_count_by(users, function(user){
    return user.age; 
})
let _head = function(list){
    return list[0]; 
};

console.clear();

_go(users, 
    _group_by(_pipe(_get('name'), _head)),
    console.log)

console.log(
    _count_by(users, function(user){
        return user.age; 
    })
); 


// pair 함수 만들기 _key와 val둘다 출력하는 

let _pairs = _map(function(val, key) {
    return [key, val]; 
}); 

console.log( 
    _pairs(users[0])
); 