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

    _each(list, function(val){
        new_list.push(mapper(val)); 
    }); 

    return new_list;
}

function _get(obj, key){
    obj == null ? undefined : obj[key]; 
}

function _each(list, iter){
    for(let i=0;i<list.length;i++){
       iter(list[i]);  
    }
    return list; 
}


function _curry(fn){
    return function (a,b){
        if(arguments.length == 2) return fn(a,b);
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


