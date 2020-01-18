const pipe = (f,...fs) => (...as) => go(f(...as), ...fs); // 여기서 a 는 나중 인자를 말한다  
