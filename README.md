# testExam (프로그래머스의 자료구조, 알고리즘 연습 문제)

###### 프로그래머스에서 제공하는 연습문제들을 기록하기 위해 만든 프로젝트 입니다.


* `해시`
* `스택/큐`
* `힙(heap)`
* `정렬`
* `완전탐색`
* `깊이/너비 우선 탐색(DFS/BFS)`
* `이진탐색`
* `그래프`  
* `카카오 테스트 문제`
-------------------------------------------------

해당 유형 문제 등 자료구조와 알고리즘 문제를 풀어보고, 

문제 코딩 내용을 혹시 몰라 옮겨놓은 프로젝트 입니다.


출처 : 프로그래머스 연습문제, https://programmers.co.kr/learn/challenges

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
# 그리디 (탐욕법)

탐욕법(그리디) 알고리즘이란?
탐욕법(이하 '그리디') 알고리즘이란 현재 상황에서 가장 좋은 것(최선의 선택)을 고르는 알고리즘을 말합니다.
그리디 알고리즘은 동적 프로그래밍을 간단한 문제 해결에 사용하면 지나치게 많은 일을 한다는 것을 착안하여 고안되었습니다.

그리디 알고리즘은 현재 상황에서 가장 좋은 결과를 선택해나가는 방식입니다. 하지만 이 가장 좋은 결과는 최종적인 결과 도출에 대한 최적해를 보장해주는 것은 아닙니다!

거스름돈 문제로써,  거스름돈을 큰 단위부터 줄 경우 어떻게 나올 수 있는가?
```
fucntion solution(money){
    let answer = 0
    const change = [500, 100, 50, 10]
    let remain = money
    for(const i of change){
        answer += remain // i
        remain = remain % i
     }
    return answer;
}
```
이런식으로 최적의 답은 아니더라도, 현재 주어진 상황에서 가장 좋은 결과를 찾는 알고리즘 입니다.

# 완전 탐색

전체 요소를 일일이 순회하여 가능한 모든 경우의 수를 도출하는 것
알고리즘으로는 브루트 포스, 비트 마스트, 백 트래킹, 순열 등이 존재합니다.

대부분 재귀를 통해 모든 상황을 탐색하는 알고리즘이라고 보면 됩니다.

### 완전탐색
```
let set = new Set();
numOfCase([1,7],'')
function numOfCase(arr,str) {
	if(arr.length) {
    	for(let i = 0; i <arr.length; i++) {
        	let copy = [...arr];
          	copy.splice(i,1);
          	numOfCase(copy,str + arr[i])
        }
    }
  	if(str > 0) set.add(Number(str))
}
console.log(Array.from(set)) 
// [17,1,71,7]
```
### 순열
```
function combination(arr, num) {
  let result = [];
  if(num == 1) return arr.map(e => [e]);
  
  arr.forEach((e,i,array) => {
    let rest = [...array.slice(0,i), ...array.slice(i+1)];
    let combinations = combination(rest,num-1);
    let combiArr = combinations.map(x => [e, ...x])
    result.push(...combiArr);
  }) 
  return result;
}
```

# 해시

키와 값을 받아 키를 해싱(Hashing)하여 나온 index에 값을 저장하는 선현 자료구조
삽입은 O(1)이며 키를 알고 있다면 삭제, 탐색도 O(1)로 수행한다.

선형 탐사법, 제곱 탐사법, 이중 해싱, 분리 연결법 등이 있습니다.
주로 특정 정보 값을 알고 싶을 때 사용합니다.

배열과 Map, Set을 이용해 만들 수 있습니다.

### javascript Object ~ Hash Table
```
const table = {};
tahble["key"] = 100;
table["key2"] = "Hello";
console.log(table["key"]); //100
table["key"] = 349;
console.log(table["key"]); //349
delete table["key"];
console.log(table["key"]); //undefined
```

### Map
```
const table = new Map();
table.set("key", 100);
table.set('key2", "Hello");
console.log(table["key"]); //undefined
console.log(table.get("key)); //100
const object = { a: 1 };
table.set(object, "A1");
console.log(table.get(object)); //A1
table.delete(object);
console.log(table.get(object)); //undefined
console.log(table.keys()); // {'key', 'key2'}
console.log(table.values()); // {100, 'Hello'}
table.clear();
console.log(table.values()); // {}
```

### Set
```
const table = new Set();
table.add("key"); //Key와 Value가 동일하게 들어간다.
table.add("key2");
console.log(table.has("key")); // true
console.log(table.has("key3")); //false
table.delete("key2");
console.log(table.has("key2")); //false
table.add("key3");
console.log(table.size); //2
table.clear();
console.log(table.size); //0
```




