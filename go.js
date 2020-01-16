/*
  go는 파이프 함수인데 즉시 실행되는 파이프 함수 
  인자와 함수를 받고 결과를 내는 함수 
  파이프 함수와 같은거같은데 
 
  example 
  _go(
      1,
      function(a){return a + 1}, 
      function(a){return a + 2}, 
      function(a){return a + 3}, 
      console.log(a); 
  )
  1부터 시작해서 함수를 차례차례 실행하고 결과를 찍는 함수 
*/

// argument는 array는 아니지만 array like 객체  
// 첫번째 인자는 함수가 아니다 



let slice = Array.prototype.slice; 

function _rest(list, num){
    slice.call(list, num || 1); 
}

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


function _go(arg){
    let fns = _rest(arguments); 
    return _pipe.apply(null, fns)(arg) ; // apply를 통해서 배열로 인자를 받는다는 뜻 
}



/*
    _go를 응용하는 버전 
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


function _get(obj, key){
    obj == null ? undefined : obj[key]; 
}


function _map(list, mapper){
    let new_list = []; 

    for(let i=0;i<list.length;i++){
        new_list.push(mapper(list[i])); 
    }
     
    return new_list;
}

function _filter(users, predi){
    let new_list = []; 

    for(let i=0;i<users.length;i++){
        if(predi(users[i])) { // 이 if 조건문을 기반으로 필터링을한다 그러니까 이부분을 함수로 만들어서 사용한다는거 같은데 
            new_list.push(users[i]); 
        }   
    }

    return new_list; 
}

// 함수에 함수가 있는 경우 어디에 누구인자인지 보기힘드니까 이렇게 구별해주는거구나 
// 이런 함수형 프로그래밍은 끝에서 부터 해석되니까 이해하기 힘들 수 있다. 
// console.log(_map(
//     _filter(users, function(user){return user.age >=30})
//     ,_get(user, 'age')));


_go(users, 
    function(users){
        return _filter(users, function(user){
            return user.age >= 30; 
        });
    }, 
    function(users){
        return _map(users,_get('name')); 
    },
    console.log
);


/* 
    여기서 더 업그레이드 가능한데 
    여기서 보면 다룰 데이터가 위에있고 뒤에 어떤함수가 실행되는지 보인다 
    근데 평가순서를 함수를 우선순위로 두도록 curryr을 이용하면 더 직관적으로 볼 수 있다 

*/ 


function _curryr(fn){
    return function (a,b){
        return arguments.length == 2 ? fn(a,b) : function (b) { return fn(b,a); }; 
    }
}

let map = _curryr(_map);
let filter = _curryr(_filter);  
let get = _curryr(_get); 

let newUsers = _go(users, 
    filter(user => user.age > 30), 
    map(get('age')),
    console.log
);

console.log(newUsers);