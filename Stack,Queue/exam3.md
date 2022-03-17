### 프린터

#### 문제 설명
일반적인 프린터는 인쇄 요청이 들어온 순서대로 인쇄합니다. 그렇기 때문에 중요한 문서가 나중에 인쇄될 수 있습니다. 이런 문제를 보완하기 위해 중요도가 높은 문서를 먼저 인쇄하는 프린터를 개발했습니다. 이 새롭게 개발한 프린터는 아래와 같은 방식으로 인쇄 작업을 수행합니다.
```
1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
3. 그렇지 않으면 J를 인쇄합니다.
```
예를 들어, 4개의 문서(A, B, C, D)가 순서대로 인쇄 대기목록에 있고 중요도가 2 1 3 2 라면 C D A B 순으로 인쇄하게 됩니다.

내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 알고 싶습니다. 위의 예에서 C는 1번째로, A는 3번째로 인쇄됩니다.

현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 매개변수로 주어질 때, 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return 하도록 solution 함수를 작성해주세요.

#### 제한사항
- 현재 대기목록에는 1개 이상 100개 이하의 문서가 있습니다.
- 인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻입니다.
- location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현합니다.

#### 입출력 예
|priorities|location|return|
|---------|--------|-------|
|[2, 1, 3, 2]|2|1|
|[1, 1, 9, 1, 1, 1]|0|5|

```
function solution(priorities, location) {
    const queue = new Queue();
    for(let i = 0; i < priorities.length; i++){
        queue.enqueue([priorities[i], i]);
    }
    priorities.sort(function(a,b){
       return b - a; 
    });
    
    let answer = 0;
    while(true){
        const value = queue.peek();
        if(value[0] < priorities[answer]){
            queue.enqueue(queue.dequeue());
        }else{
            const value2 = queue.dequeue();
            answer++;
            if(value2[1] === location){
               return answer; 
            }
        }
    }
}

class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    enqueue(value) {
        const node = new Node(value);
        if(this.head === null){
           this.head = this.tail = node;   
        }else{
            this.tail.next = node;
            this.tail = node;
        }
        this.size += 1;
    }
    dequeue(){
        const value = this.head.value;
        this.head = this.head.next;
        this.size -= 1;
        return value;
    }
    peek(){
        return this.head.value;
    }
}
```

#### 출처 : 프로그래머스 연습문제 큐 프린터, https://programmers.co.kr/learn/courses/30/lessons/42587?language=javascript
-------------------------------------------------------------------------------------------------------------------
이 문제는 처음 전달 받은 문서를 순서대로 읽으면서, 우선 순위가 더 높은게 있으면 이전 문서를 맨뒤로 이동을 시켜줘야하는 문제입니다.

그 후 이동이 전체 다 되었을 때 원하는 문서가 몇번째로 출력되었는지 반환합니다.

그렇기때문에 큐를 이용해 첫 문서 다음 문서가 무엇인지 연결을 해야하는 문제입니다.



