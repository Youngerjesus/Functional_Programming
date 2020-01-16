// DFS 그래프가 연결되어있는가? 
function solution(n, computers) {
    let answer = 0;
    let visited = _init(n, false); 
    let parent = _init(n, -1); 
    let network = _init(n, -1); 
    let network_id = 0; 
    
    while(!_isAllPredi(visited, _predi)){
        let start = _findIndex(visited, (element)=> { return element == false }); 
        DFS(start, parent, visited, network); 
        console.log(start); 
        console.log(network); 
        console.log(visited);
        network_id++; 
    }

    answer = network_id; 
    return answer;
}


// DFS로 순회하면서 네트워크 번호를 붙혀주는것
// 원래 생각해보면 DFS 할 때 부모의 이름까지 기억하지않나 
// 근데 나는 모든 번호에서 다 뒤진거지  


function DFS(start, parent, visited, network){
    visited[start] = true;

    for(let i=0;i<computers[start].length;i++){
        if(!visited[i] && computers[start][i] && start != i){
            visited[i] = true; 
            parent[i] = start;
            network[start] = network_id; 
            DFS(i, parent, visited, network); 
        }
    }
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

function _init (list, val){
    let new_list = []; 
    for(let i=0;i<list;i++){
        new_list.push(val);
    }
    return new_list; 
}; 

function _findIndex(list, val){
    let findIndex = Array.prototype.findIndex;
    return findIndex.call(list, val); 
}

let n = 3; 
let computers = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]; 
let parent = [-1, -1, -1]; 
let visited = [false, false, false]; 
let network = [-1, -1, -1]; 
let network_id = 0;

console.log(solution(n, [[1, 1, 0], [1, 1, 1], [0, 1, 1]])); 


