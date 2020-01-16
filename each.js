

/*
    다형성 map , filter, each는 다 있다 
    객체지향 프로그래밍에서 단점은 어떤 유용한 메소드를 발견했다! 그런데 그건 그 객체한테만 유효하다 
    함수는 다르다 
    객체가 먼저 있어야한다 

    array like vs array 

    멀티 DB vs 하나의 좋은 DB

    콜백함수: 어떠한 일을 다 한 후에 돌려줄떄

    함수형 프로그래밍에서 인자로 함수를 넘겨줄떄 그 함수의 역할을 구별시켜주는게 중요하다  콜백인지 , 조건을 따지기위한건지 반복을 위한건지 mapping을 위한건지 등등 

    다형성: 외부 다형성, 내부 다형성 으로 구성되고 한 경우에만 적용되는게 아니라 여러 경우에 적용된다 
    외부 다형성 즉 데이터 셋같은건 함수의 로직이 어떻게 되었는지를 따르고 내부 다형성은 보조함수를 어떤걸 썼는지 

    다형성에 의존하면서 코드를 짜면되나 
    
*/

function _filter(users, predi){
    let new_list = []; 

    for(let i=0;i<users.length;i++){
        if(predi(users[i])) { // 이 if 조건문을 기반으로 필터링을한다 그러니까 이부분을 함수로 만들어서 사용한다는거 같은데 
            new_list.push(users[i]); 
        }   
    }

    return new_list; 
}

function _filter(users, predi){
    let new_list = []; 
    
    _each(users, function(val){
        if(predi(val)) { 
            new_list.push(val); 
        }
    }); 
    return new_list; 
}

function _map(list, mapper){
    let new_list = []; 

    for(let i=0;i<list.length;i++){
        new_list.push(mapper(list[i])); 
    }
     
    return new_list;
}


function _map2(list, mapper){
    let new_list = []; 

    _each(list, function(val){
        new_list.push(mapper(val)); 
    }); 

    return new_list;
}


// list를 반복하는 것 
// 어떤 요소를 반복문 도는거 까지 functional programming을 쓴다는건가 
function _each(list, iter){
    for(let i=0;i<list.length;i++){
       iter(list[i]);  
    }
    return list; 
}



