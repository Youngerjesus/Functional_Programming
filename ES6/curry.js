const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._); 
