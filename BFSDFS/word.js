function solution(begin, target, words) {
    let answer = 0;
    answer = BFS(begin, words, target);
    return answer.depth ? answer.depth :  0; 
}


function _push(word, words, depth){
    for(let i=0;i<words.length;i++){
        if(IsConvert(word, words[i]) && !IsExist(word) ){
            queue.push({
                word: words[i], 
                depth: depth 
            }); 
        }
    }
}

function IsExist(word){
    for(let i=0;i<queue.length;i++){
        return queue.find(element => element.word == word);
    }
}

function IsConvert(begin, target){
    if(begin.length != target.length) return false; 
    
    let unmatches = 0; 
    for(let i=0;i<begin.length;i++){
        if(begin[i] != target[i]) unmatches++; 
    }

    return unmatches == 1; 
}

// BFS를 할때 애초에 값이 있다면 
function BFS(begin, words, target) {

    let answer = 0;
    let depth = 0; 

    let temp = words; 
    queue.push({
        word: begin, 
        depth: depth
    }); 

    while(queue.length > 0){
        let begin = queue.shift(); 
        let depth = begin.depth+1; 
        let word = begin.word;
        
        let index = temp.findIndex(element => element == word);
        
        if(index != -1) {
            temp = temp.slice(index); 
        }
        _push(word, temp, depth);
        console.log(queue);

        let target_index = queue.findIndex(e => e.word == target);
        if(target_index != -1){
            answer = queue[target_index]; 
            break; 
        }  
    }

    return answer; 
}

let begin = "hit"; 
let target = "cog"; 
let words = ["hot", "dot", "dog", "lot", "log", "cog"];  
let words2 = ["hot", "dot", "dog", "lot", "log"];
let queue = []; 

// console.log(BFS(begin, words, target)); 

console.log(solution(begin, target, words2));
