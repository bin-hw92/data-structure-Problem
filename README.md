# testExam (프로그래머스의 자료구조, 알고리즘 연습 문제)

###### 프로그래머스에서 제공하는 연습문제들을 기록하기 위해 만든 프로젝트 입니다.


* `해시`
* `스택/큐`
* `힙(heap)`
* `정렬`
* `완전탐색`
* `그리디(탐욕법)`
* `깊이/너비 우선 탐색(DFS/BFS)`
* `이진탐색`
* `그래프`  
* `카카오 테스트 문제`
* `프로그래머스 매칭 문제`
-------------------------------------------------

여러 유형의 자료구조와 알고리즘 풀이 및 공부를 위한 프로젝트입니다.

주로 문제는 및 유형은 프로그래머스에 있는 문제들을 가지고 왔습니다.


출처 : 프로그래머스 연습문제, https://programmers.co.kr/learn/challenges

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
# 스택/큐

## 스택
Last In First Out이라는 개념을 가진 선형 자료구조다.
배열로 표현이 가능하며, Linked List로 표현이 가능합니다.

```
//array로 구현
const stack = [];
//push
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack); //[1,2,3]
//pop
stack.pop();
console.log(stack); //[1,2]
//get Top
console.log(stack[stack.length -1]); //2
```
## 큐
First In First Out이라는 개념을 가진 선형 자료 구조다.
Linear Queue와 Circular Queue가 존재합니다.
```
class Queue {
  constructor(){
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  
  enqueue(value){
    this.queue[this.rear++] = value;
  }
  dequeue(){
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  peek(){
    return this.queue[this.front];
  }
  size(){
    return this.rear - this.front;
  }
}

const queue = new Queue();
qeueue.enqueue(1);
qeueue.enqueue(2);
qeueue.enqueue(4);
console.log(queue.dequeue()); //1
qeueue.enqueue(8);
console.log(queue.size())//3
console.log(queue.peek())//2
console.log(queue.dequeue())//2
console.log(queue.dequeue())//4
```

# 힙
이진 트리 형태를 가지며 우선순위가 높은 요소가 먼저 나가기 위해 요소가 삽입, 삭제 될 때 바로 정렬되는 특징이 있다.
### 특징
- 우선순위가 높은 요소가 먼저 나가는 특징을 가진다.
- 루트가 가장 큰 값이 되는 최대 힙(Max Heap)과 루트가 가장 작은 값이 되는 최소 힙(Min Heap)이 있다.
- 아쉽게도 자바스크립트에선 직접 구현해서 사용해야 한다.

### 힙 요소 추가 알고리즘
- 요소가 추가될 때는 트리의 가장 마지막에 정점에 위치한다.
- 추가 후 부모 정점보다 우선순위가 높다면 부모 정점과 순서를 바꾼다.
- 이 과정을 반복하면 결국 가장 우선순위가 높은 정점이 루트가 된다.
- 완전 이진 트리의 높이는 logN이기에 힙의 요소 추가 알고리즘은 O(logN)시간복잡도를 가진다.
```
class MaxHeap{
  constructor(){
    this.heap = [null];
  }
  push(value){
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);
    
    while(parentIndex !== 0 && this.heap[parentIndex] < value) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = value;
      this.heap[currentIndex] = temp;
      
      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }
}
const heap = new MaxHeap();
heap.push(45);
heap.push(36);
heap.push(54);
heap.push(27);
heap.push(63);
console.log(heap.heap); // Result is [null, 63, 54, 45, 27, 36]
```


### 힙 요소 제거 알고리즘
- 요소 제거는 루트 정점만 가능하다.
- 루트 정점이 제거된 후 가장 마지막 정점이 루트에 위치한다.
- 루트 정점의 두 자식 정점 중 더 우선순위가 높은 정점과 바꾼다.
- 두 자식 정점이 우선순위가 더 낮을 때 까지 반복한다.
- 완전 이진 트리의 높이는 logN이기에 힙의 요소 제거 알고리즘은 O(logN)시간복잡도를 가진다.
```
pop(){
  const returnValue = this.heap[1];
  this.heap[1] = this.heap.pop();
  
  let currentIndex = 1;
  let leftIndex = 2;
  let rightIndex = 3;
  while(
    this.heap[currentIndex] < this.heap[leftIndex] ||
    this.heap[currentINdex] < this.heap[rightIndex]
  ){
    if(this.heap[leftIndex] < this.heap[rightIndex]){
      const temp = this.heap[currentIndex];
      this.heap[currentIndex] = this.heap[rightIndex];
      this.heap[rightIndex] = temp;
      currentIndex = rightIndex;
    }else{
      const temp = this.heap[currentIndex];
      this.heap[currentIndex] = this.heap[leftIndex];
      this.heap[leftIndex] = temp;
      currentIndex = leftIndex;
    }
    leftIndex = currentIndex * 2;
    rightIndex = currentIndex * 2 + 1;
  }
  
  return returnValue;
}
//Heap state : [null, 63, 54, 45, 27, 36]
const array = [];
array.push(heap.pop()); // 63
array.push(heap.pop()); // 54
array.push(heap.pop()); // 45
array.push(heap.pop()); // 36
array.push(heap.pop()); // 27
console.log(array); //Result is [63, 54, 45, 36, 27] - Heap Sort
```

# 정렬
요소들을 일정한 순서대로 열거하는 알고리즘
### 특징
- 정렬 기준은 사용자가 정할 수 있다.
- 크게 비교식과 분삭식 정렬로 나눌 수 있다.
- 대부분의 언어가 빌트인으로 제공해준다.
- 삽입, 선택, 버블, 머지, 힙, 퀵 정렬 등 다양한 정렬 방식이 존재한다.

### 비교식 정렬
- 버블 정렬 : 서로 인접한 두 요소를 검사하여 정렬하는 알고리즘 (* O(n2) 시간복잡도)
- 선택 정렬 : 선택한 요소와 가장 우선순위가 높은 요소를 교환하는 정렬 알고리즘 (* O(n2) 시간복잡도)
- 삽입 정렬 : 선택한 요소를 삽입 할 수 있는 위치를 찾아 삽입하는 방식의 정렬 알고리즘 (* O(n2) 시간복잡도)

### 분산식 정렬
- 분할 정복 : 문제를 작은 2개의 문제로 분리하고 더 이상 분리가 불가능 할 때 처리한 후 합치는 전략 다양한 알고리즘에 응용된다.
- 합병 정렬 : 분할 정복 알고리즘을 이용한 최선과 최악이 같은 안정적인 정렬 알고리즘 (* O(n log n) 시간복잡도)
- 퀵 정렬 : 분할 정복 알고리즘을 이용한 매우 빠르지만 최악의 경우가 존재하는 불안정 정렬 (* O(n log n) 시간복잡도)
```
const array = [5,9,10,3,8,3,2];
// 다음과 같이 그냥 정렬하면 ASCII 문자 순서로 정렬되어 우리가 원하는 숫자 크기대로 정렬되지 않는다.
array.sort();
console.log(array); //10,2,3,3,5,8,9
// 10이 먼저 나오는 이유는 ASCII 문자 '1'이 '2'보다 작기 때문

array.sort((a,b) => a - b); //오름차순 정렬
console.log(array); //2,3,3,5,8,9,10
array.sort((a,b) => a - b); //내림차순 정렬
console.log(array); //10,9,8,5,3,3,2
```

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

# 깊이/너비 우선 탐색(DFS/BFS)
### 너비 우선 탐색(BFS)
그래프 탐색 알고리즘으로 같은 깊이에 해당하는 정점부터 탐색하는 알고리즘
### 특징
- Queue를 이용하여 구현할 수 있다.
- 시작 지점에서 가까운 정점부터 탐색한다.
- V가 정점의 수, E가 간선의 수일 때 BFS의 시간복잡도는 O(V + E)다.

### 깊이 우선 탐색(DFS)
그래프 탐색 알고리즘으로 최대한 깊은 정점부터 탐색하는 알고리즘
### 특징
- Stack을 이용하여 구현할 수 있다.
- 시작 정점에서 깊은 것 부터 찾는다.
- V가 정점의 수, E가 간선의 수일 때 BFS의 시간복잡도는 O(V + E)다.

```
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "G", "H", "I"],
  D: ["B", "E", "F"],
  E: ["D"],
  F: ["D"],
  G: ["C"],
  H: ["C"],
  I: ["C", "J"],
  J: ["I"]
};

const BFS = (graph, startNode) => {
  const visited = []; // 탐색을 마친 노드들
  let needVisit = []; // 탐색해야할 노드들

  needVisit.push(startNode); // 노드 탐색 시작

  while (needVisit.length !== 0) { // 탐색해야할 노드가 남아있다면
    const node = needVisit.shift(); // queue이기 때문에 선입선출, shift()를 사용한다.
    if (!visited.includes(node)) { // 해당 노드가 탐색된 적 없다면
      visited.push(node); 
      needVisit = [...needVisit, ...graph[node]];
    }
  }
  return visited;
};

console.log(BFS(graph, "A"));
// ["A", "B", "C", "D", "G", "H", "I", "E", "F", "J"]

const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "G", "H", "I"],
  D: ["B", "E", "F"],
  E: ["D"],
  F: ["D"],
  G: ["C"],
  H: ["C"],
  I: ["C", "J"],
  J: ["I"]
};

const DFS = (graph, startNode) => {
  const visited = []; // 탐색을 마친 노드들
  let needVisit = []; // 탐색해야할 노드들

  needVisit.push(startNode); // 노드 탐색 시작

  while (needVisit.length !== 0) { // 탐색해야할 노드가 남아있다면
    const node = needVisit.shift(); // queue이기 때문에 선입선출, shift()를 사용한다.
    if (!visited.includes(node)) { // 해당 노드가 탐색된 적 없다면
      visited.push(node); 
      needVisit = [...graph[node], ...needVisit];
    }
  }
  return visited;
};

console.log(DFS(graph, "A"));
// ["A", "B", "D", "E", "F", "C", "G", "H", "I", "J"]
```

# 이진탐색
특정 요소를 찾을 때 선형 탐색으로 찾을 경우 시간복잡도 소용가 많이 걸릴 경우 사용하는 방법으로
정렬 되어있는 요소들을 반씩 제외하며 찾는 알고리즘 O(log n) 만큼 시간복잡도가 걸린다.
### 특징
- 반드시 정렬이 되어있어야 사용할 수 있다.
- 배열 혹은 이진 트리를 이용하여 구현할 수 있다.
- O(log n) 시간복잡도인 만큼 상당히 빠르다.

### 이진 탐색 트리의 문제점
- 최악의 경우 한쪽으로 편향된 트리가 될 수 있다.
- 그런 경우 순차 탐색과 동일한 시간복잡도를 가진다.
- 이를 해결하기 위해 다음과 같은 자료구조를 이용할 수 있다.
  - AVL 트리
  - 레드-블랙 트리	 
```
const array = [1,1,5,124,400,599,1004,2876,8712];

function binarySearch(array, findValue){
  let left = 0;
  let right = array.length -1;
  let mid = Math.floor((left + right) / 2));
  while(left < right){
    if(array[mid] === findValue){
      return mid;
    }
    if(array[mid] < findValue){
      left = mid + 1;
    }else {
      right = mid -1;
    }
    mid = Math.floor((left + right) / 2);
  }
  return -1;
}
console.log(binarySearch(array, 2876)); //7
console.log(binarySearch(array, 1)); //0
console.log(binarySearch(array, 500)); //-1
```
# 그래프
정점과 정점 사이를 연결하는 간선으로 이루어진 비선형 자료구조, 정점 집합과 간선 집합으로 표현할 수 있다.
### 특징
- 정점은 여러 개의 간선을 가질 수 있다.
- 크게 방향 그래프와 무방향 그래프로 나눌 수 있다.
- 간선은 가중치를 가질 수 있다.
- 사이클이 발생할 수 있다.

- 무방향 그래프
  - 간선으로 이어진 정점끼리는 양방향으로 이동이 가능하다. 표현하기에 (A,B)와 (B,A)는 같은 간선으로 취급된다. EX) 양방향 통행 도로
- 방향 그래프
  - 간선에 방향성이 존재하는 그래프, 양방향으로 갈 수 있더라도 <A,B>와 <B,A>는 다른 간선으로 취급된다. ex)일방 통행
- 연결 그래프
  - 모든 정점이 서로 이동 가능한 상태인 그래프
- 비연결 그래프
  - 특정 정점쌍 사이에 간선이 존재하지 않는 그래프 ex) 친한 친구 설문 그래프
- 완전 그래프
  - 모든 정점끼리 연결된 상태인 그래프
- 사이클
  - 그래프의 정점과 간선의 부분 집합에서 순환이 되는 부분

### 그래프의 구현방법
인접 행렬, 인접 리스트 두 가지 방식으로 그래프를 표현할 수 있다.
```
0 -> 1, 3
1 -> 2
2 -> 4
3 -> 2
4 -> 0
//인접 행렬
const graph = Array.from(Array(5),() => Array(5).fill(false));
graph[0][1] = true; // 0 -> 1
graph[0][3] = true; // 0 -> 3
graph[1][2] = true; // 1 -> 2
graph[2][0] = true; // 2 -> 0
graph[2][4] = true; // 2 -> 4
graph[3][2] = true; // 3 -> 2
graph[4][0] = true; // 4 -> 0

//인접 리스트
const graph = Array.from(Array(5),() => []);
graph[0].push(1); // 0 -> 1
graph[0].push(1); // 0 -> 3
graph[1].push(1); // 1 -> 2
graph[2].push(1); // 2 -> 0
graph[2].push(1); // 2 -> 4
graph[3].push(1); // 3 -> 2
graph[4].push(1); // 4 -> 0
```


