# 평가
- 코드가 계산 되어 값을 만드는 것 
- (평가 == 계산)

# 일급 
- 값으로 다룰 수 있다 
- 변수에 담을 수 있다
- 함수의 인자로 사용될 수 있다
- 함수의 결과로 사용될 수 있다

# 일급 함수 
- 함수를 값으로 다룰 수 있다 
- 조합성과 추상화의 도구 
- 함수의 결과를 함수에 담을 수 있다 
<script>
    const add = a => a + 5
</script>

# 고차 함수 
- 함수를 값으로 다루는 함수 
- 함수를 인자로 받아서 실행해주는 함수
<script>
    const apply1 = f => f(1); 
    const add2 = a => a + 2; 
    console.log(appl1(add2)); 

    // 함수를 인자로 받아서 실행한다 n번만큼 
    const times = (f , n) => {
        let i = -1; 
        while(++i < n){
            f(i); 
        }
    }; 

    times(console.log , 3); 
</script>



- 함수를 만들어서 리턴하는 함수 
<script> 

</script>

# 함수를 인자로 받아서 실행하는 함수 
- apply1 
- times

# 함수를 만들어 리턴하는 함수 (크롤저를 만들어 리턴하는 함수)
- 클로저란 말은 함수를 리턴한고 함수를 기억하고 있다라는 뜻 

<script>
    const addMaker = a => b => a + b; 
    const add10 = addMaker(10); 
    console.log(add10(5)); // 15 리턴 
</script>

# ES6 리스트 순회 
- for i++ 
- for of 
<script> 
    // ES5 방식 
    const list = [1,2,3]; 

    for(let i=0; i< list.length;i++){
        console.log(list[i]); 
    }   

    // ES6 방식 
    for(const a of list){
        console.log(a); 
    }
</script>


# Array에 대해 알기
<script> 
    const arr = [1,2,3]; 
    for(const a of arr){

    }

</script>

# Set에 대해 알기
- set은 set[0], set[1]이런식으로 접근이 가능하지않다. 
<script>
    const set = new Set([1,2,3]); 
    for(const a of set) {

    }


</script>

# Map에 대해 알기 
- map은 map[0], mao[1]이렇게 접근할 수 없다 
<script>
    const map = new Map(['a',1], ['b',2], ['c',3]); 
    for(const a of map) {

    }

    for(const a of map.values()){}
    for(const a of map.keys()){}
    for(const a of map.entries()){}

</script>

# Symbol.iterator 
- Symbol은 어떤 객체에 키로 사용할 수 있다 

# 이터러블/이터레이터 프로토콜
- 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값 
- Array는 이터러블이다 
<script> 
    let iterator = arr[Symbol.iterator](); 
</script>
- 이터레이터: {value, done} 객체를 리턴하는 next()를 가진 값 
<script>
    iterator.next(); // {value , done}
</script>
- 이터러블/이터레이터 프로토콜: 이터러블을 for ... of, 전개 연산자 등과 함께 동작하도록한 규얅 

# 사용자 정의 이터러블을 통해 알아보기
<script>
    const iterable = {
        [Symbol.iterator](){
            let i = 3; 
            return {
                next() {
                    return i == 0 ? {done: true} : {value: i--, done:false}; 
                },
                [Symbol.iterator]() {return this; }
            }
        }
    } 

    
    const arr2 = [1,2,3]; 
    for (const a of arr2) log(a); 

    let iter2  = arr2[Symbol.iterator](); 
    iter2.next();  
</script>

# 제너레이터/이터레이터
- 제너레이터: 이터레이터이자 이터러블을 생성하는 함수 
<script>
    function *gen(){
        yield 1;
        yield 2;
        yield 3;
    }

    function *gen2(){
        yield 1;
        yield 2;
        yield 3;
        return 100; 
    }

    let iter = gen(); 
    console.log(iter.next()); 


    function *infinity(i = 0){
        while(true) yield i++; 
    }

    function *limit(;, iter){
        for(const a of iter){
            yield a; 
            if(a == l) return; 
        }
    }
</script>


# Curry 
- 함수를 값으로 다루면서 원하는 시점에 평가하는 함수 
- 함수를 받아서 함수를 리턴한다. 
- 이때 원하는 인자가 충족됬을떄 실행 한다 
<script>
    const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._); 

    const mult = curry((a,b) => a * b);
    console.log(mult(1)(2)); 
</script>


# 함수 조합으로 함수 만들기

<script>
    go(
        products, 
        filter(p => p.price < 20000), 
        map(p => p.price), 
        reduce(add),
        console.log
    ); 

    const total_price = pipe(
        map(p => p.price), 
        reduce(add)); 

    go(
        products, 
        filter(p=>p.price >=20000), 
        total_price, 
        console.log
    )

    const base_total_price = (predi) => pipe(
        filter(predi), 
        total_price)); 
    
    go(
        products, 
        base_total_price(p => p.price >= 20000), 
        console.log
    ); 
</script>


# Range 
- 숫자 하나를 받아서 그 숫자 만큼의 배열을 만드는 함수 
<script>
    const range = l => {
        let i = -1; 
        let res = []; 
        while(++i < l){
            res.push(i); 
        }; 
        return res; 
    };

    console.log(range(5)); 
    // [0,1,2,3,4]; 

    const add = (a,b) => a + b; 

    const list = range(5); 
    console.log(reduce(add, list)); 
</script>


# 느긋한 range (L.range)
- console.log(list)를 할경우 iterator를 출력한다.  배열을 출력하는게아니라
- Range함수와의 차이는 바로 전체 배열을 만드는가 아니면 한개씩 만든다 
<script>
    const L = {}; 
    
    // Generator를 이용해 iterator를 만든다 
    L.range = function *(l) {
        let i = -1; 
        while(++i < l){
            yield i; 
        }; 
    };

    console.log(L.range(5)); 
    // [0,1,2,3,4]; 

    const add = (a,b) => a + b; 

    const list = L.range(5); 
    console.log(reduce(add, list)); 
</script>


# range와 L.range의 성능 테스트
<script>
    function test(name, time, f){
        console.time(name); 
        while(time--) f(); 
        console.timeEnd(name); 
    }

    test('range',10, ()=> reduce(add , range(100000))); 
    test('L.range',10, ()=> reduce(add , L.range(100000))); 
</script>


# take 
- limit와 iterator를 인자로 받아서 개수를 제한시켜서 가지고오는 함수 
- take(10, range(100000))과 take(10, L.range(100000))를 비교해보면 누가 더 효율적인지 알 수 있다

<script>
    const take = (l, iter) => {
        let res = []; 
        for(const a of iter){
            res.push(a); 
            if(res.length == l) return res; 
        }
        return res; 
    }; 
    console.log(take(5, range(100))); 
</script>

# 지연성 
# L.map
- map을 지연성이 가지되 이터레이터로 
- 지연성이라는 말은 평가를 미루는 제때 평가를 하는 

<script>
    const L = {}; 
    L.map = function *(f, iter){
        for (const a of iter){
            yield f(a); 
        }
    }; 
    
    let it = L.map(a => a + 10 ,[1,2,3]);  
    console.log(it.next()); 
    console.log([... it]); 
    console.log(it.next().value; 
</script>

# L.filter 
<script>
    const L = {}; 
    L.filter = function *(f, iter){
        for (const a of iter){
            if(f(a)) yield a;  
        }
    }; 
    
    let it = L.filter(a => a % 2 , [1,2,3,4]); 
    console.log(it.next());

</script>

# range map filter, take reduce 중첩 사용 vs  L.range, L.map, L.filter, take, reduce 중첩 사용 

<script>
    go(
        range(10), 
        map(n => n + 10), 
        filter(n => n % 2), 
        take(2),
        console.log
    ); 


    go(
        L.range(10), 
        L.map(n => n + 10), 
        L.filter(n => n % 2), 
        take(2),
        console.log
    ); 

</script>

# map filter 계열 함수들이 가지는 결합 법칙
- map을 모두 적용하고 그 다음 filter를 모두 적용하는 것이랑 map 하나 적용하고 바로 filter 적용하는것이랑 결과는 같다
- 즉 지연성을 가지도록 하는게 더 효율적일 수 있다. 
- 앞의 처리 순서에 따라서 결과가 바뀌지 않는 순수함수라면 지연성을 가지는 함수로 해도 상관없다 이런 뜻 (먼저하던지 나중에하던지)
