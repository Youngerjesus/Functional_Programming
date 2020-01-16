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

// 명령행 코드부터 시작해서 함수형 코드로 변환하는 과정 

// 1. 명령행 코드 
// 1.1 30세 이상인 users를 거른다 

let temp_users = []; 

for(let i=0;i<users.length;i++){
 if(users[i].age >= 30) {
     temp_users.push(users[i]); 
 }   
}

console.log(temp_users); 

// 1.2 30세 이상인 users의 names를 수집한다 
let names = []; 
for(let i=0;i<temp_users.length;i++){
    names.push(temp_users[i].name); 
}

console.log(names);

// 1.3 30세 미만의 users를 거른다 
let temp_users2 = []; 

for(let i=0;i<users.length;i++){
    if(users[i].age < 30) {
        temp_users2.push(users[i]); 
    }   
}

console.log(temp_users2);

// 1.4 30세 미만인 users의 age를 수집한다 
let ages = []; 

for(let i=0;i<temp_users2.length;i++){
    ages.push(temp_users2[i].age); 
}

console.log(ages);

// 함수형 프로그래밍으로 _filter 함수를 만든다 
// 각 부분을 함수에게 완전히 위임하게 한다 
// 함수를 인자로받아서 실행하는게 응용형 함수 
// 함수를 인자로 받고 인자로받은 함수를 실행하는게 고차함수 
// 함수형 프로그래밍은 그거에 규격에 맞기만하면 어떤한 경우든 사용하는게 가능하다 


function _filter(users, predi){
    let new_list = []; 

    for(let i=0;i<users.length;i++){
        if(predi(users[i])) { // 이 if 조건문을 기반으로 필터링을한다 그러니까 이부분을 함수로 만들어서 사용한다는거 같은데 
            new_list.push(users[i]); 
        }   
    }

    return new_list; 
}

console.log(_filter(users, function(user) {return user.age >= 30; })); 

console.log(_filter(users, function(user) {return user.age < 30; })); 


// 함수형 프로그래밍 _map 
// mapper를 넣어서 어떤걸 수집할건지 
// 데이터형이 어떻게 생겼는지를 알 수 없다 함수형 프로그래밍에서는 
// 어떠한 자료든지 넣을 수 있기때문에
// 함수를 통과해나가면서 새로운 값들을 만들어내는것  
// 함수형 프로그래밍이 왜 객체지향 프로그래밍의 문제를 해결할 수 있을까 

function _map(list, mapper){
    let new_list = []; 

    for(let i=0;i<list.length;i++){
        new_list.push(mapper(list[i])); 
    }
     
    return new_list;
}


let over_30 = _filter(users, function(user) {return user.age >= 30; }); 

let map_names = _map(over_30, function (user){
    return user.name; 
})

console.log(map_names);