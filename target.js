// 숫자를 더하거나 뺴서 만든다 라는거네 

function solution(numbers, target){
    let answer = 0;
    
    let make_visit = function(numbers){
        var new_visted = []; 
        _each(numbers, ()=> {
            new_visted.push(false); 
        });
        return new_visted; 
    }; 
    
    let visited = make_visit(numbers); 
    
    answer = DFS(numbers, visited, 0, target);  

    return answer; 
}


function DFS(numbers, visited, temp_result, target){
    if(_isAllPredi(visited, _predi) && temp_result == target) {
        return 1; 
    }
    
    let answer = 0; 
    let result = temp_result; 
    
    for(let i=0;i<numbers.length;i++){
        if(!visited[i]){
            visited[i] = true; 
            answer += DFS(numbers, visited, result + numbers[i], target );
            answer += DFS(numbers, visited, result - numbers[i], target );
            visited[i] = false; // 이 부분이 되게 중요하네 재귀함수에서 상태를 변경시키면 그게 계속 유지되네 
            break; 
        }
    }

    return answer; 
}

function _isAllPredi(list,predi){
    let count = 0; 
    _each(list, (val)=> { if(predi(val)) count ++}); 
    
    return count == list.length; 
}

function _each(list, iter){
    for(let i=0;i<list.length;i++){
        iter(list[i]); 
    }
}

function _predi(val){
    return val; 
}


let numbers = [1,1,1,1,1];
let visited = [false,false,false,false,false]; 
let count = 0; 
console.log(solution(numbers, 3)); 
