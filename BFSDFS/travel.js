// DFS 탐색 문제 
let ticket = [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]; 

function solution(tickets) {
    var answer = [];
    return answer;
}


// 한 길을 다 가지고 와야한다 
function DFS(tickets, name, isCycle){
    let path = []; 
    path.push(name); 
    isCycle[name] = 1; 
    
    let ticket = find_ticket(tickets,name,isCycle); 
    
    while(ticket){
        path.push(ticket.start);
        isCycle[ticket.start] = 1;  
        path.push(DFS(tickets, ticket.dest, isCycle));
        ticket = find_ticket(tickets,name,isCycle); 
        isCycle[ticket.dest] = 0;
    }

    return path; 
}

// 가장 빠른 ticket을 찾아주는것 이름을 입력했을경우 
// find_ticket에 DFS로 cycle의 존재 유무를 묻네 
function find_ticket(tickets, name, isPath){
    let ticket_index = -1; 
    for(let i=0;i<tickets.length;i++){
        let start = tickets[i][0]; 
        let dest = tickets[i][1]; 

        if(start == name){
            if(ticket_index == -1) ticket_index = i;  
            else if(!isPath[dest] && tickets[ticket_index] < dest ){
                ticket_index = i; 
            }
        }
    }

    return ticket_index == -1 ? 0 :  {start: tickets[ticket_index][0], dest: tickets[ticket_index][1]};
}

console.log(DFS(ticket, "ICN", {})); 