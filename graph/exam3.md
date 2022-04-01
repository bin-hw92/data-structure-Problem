### 배달

#### 문제 설명
N개의 마을로 이루어진 나라가 있습니다. 이 나라의 각 마을에는 1부터 N까지의 번호가 각각 하나씩 부여되어 있습니다. 각 마을은 양방향으로 통행할 수 있는 도로로 연결되어 있는데, 서로 다른 마을 간에 이동할 때는 이 도로를 지나야 합니다. 도로를 지날 때 걸리는 시간은 도로별로 다릅니다. 현재 1번 마을에 있는 음식점에서 각 마을로 음식 배달을 하려고 합니다. 각 마을로부터 음식 주문을 받으려고 하는데, N개의 마을 중에서 K 시간 이하로 배달이 가능한 마을에서만 주문을 받으려고 합니다. 다음은 N = 5, K = 3인 경우의 예시입니다.

![배달_1_uxun8t](https://user-images.githubusercontent.com/45866008/161217824-c3f4b1f7-6203-4d18-b851-96cff41b5f65.png)

위 그림에서 1번 마을에 있는 음식점은 [1, 2, 4, 5] 번 마을까지는 3 이하의 시간에 배달할 수 있습니다. 그러나 3번 마을까지는 3시간 이내로 배달할 수 있는 경로가 없으므로 3번 마을에서는 주문을 받지 않습니다. 따라서 1번 마을에 있는 음식점이 배달 주문을 받을 수 있는 마을은 4개가 됩니다.
마을의 개수 N, 각 마을을 연결하는 도로의 정보 road, 음식 배달이 가능한 시간 K가 매개변수로 주어질 때, 음식 주문을 받을 수 있는 마을의 개수를 return 하도록 solution 함수를 완성해주세요.

#### 제한사항
- 마을의 개수 N은 1 이상 50 이하의 자연수입니다.
- road의 길이(도로 정보의 개수)는 1 이상 2,000 이하입니다.
- road의 각 원소는 마을을 연결하고 있는 각 도로의 정보를 나타냅니다.
- road는 길이가 3인 배열이며, 순서대로 (a, b, c)를 나타냅니다.
  - a, b(1 ≤ a, b ≤ N, a != b)는 도로가 연결하는 두 마을의 번호이며, c(1 ≤ c ≤ 10,000, c는 자연수)는 도로를 지나는데 걸리는 시간입니다.
  - 두 마을 a, b를 연결하는 도로는 여러 개가 있을 수 있습니다.
  - 한 도로의 정보가 여러 번 중복해서 주어지지 않습니다.
- K는 음식 배달이 가능한 시간을 나타내며, 1 이상 500,000 이하입니다.
- 임의의 두 마을간에 항상 이동 가능한 경로가 존재합니다.
- 1번 마을에 있는 음식점이 K 이하의 시간에 배달이 가능한 마을의 개수를 return 하면 됩니다.

#### 입출력 예
|N|road|K|result|
|-|---|-|----|
|5|[[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]]|3|4|
|6|[[1,2,1],[1,3,2],[2,3,2],[3,4,3],[3,5,2],[3,5,3],[5,6,1]]|4|4|

```
function solution(N, road, K) {
    let answer = 0;
    const graph = Array.from({length: N + 1}, () => Array()); //road에 있는 정보를 graph에 담기
    const dist = Array(N + 1).fill(Infinity); //최소 비용 배열
    const queue = []; //다익스트라 진행할 때 사용하기 위핸 선언 큐
    
    for(let i = 0; i < road.length; i++){
        //road에 담겨있는 정보를 graph로 저장
        //start로 시작 마을에서 target까지 cost 비용 담기
        const start = road[i][0];
        const target = road[i][1];
        const cost = road[i][2];
        
        graph[start].push([target, cost]);
        graph[target].push([start, cost]);
    }
    
    queue.push([1, 0]); //1번 시작마을 값과 비용인 0을 최초 담기
    dist[1] = 0; //1번 마을은 비용이 0으로 선언
    
    while(queue.length){
        const [current, cost] = queue.shift(); //각 마을 번호와 비용을 shift로 출력
        
        for(let i = 0; i < graph[current].length; i++){
            //current 번호에서 갈 수 있는 정보를 graph에 담겨있으므로, 해당 길이만큼 for문 실행
            const next = graph[current][i][0];
            const nextCost = graph[current][i][1];
            
            //이미 저장되어 있는 dist[next] 와 현재까지 비용 + nextCost중 더 작은 값을 dist[Next] 에 갱신, 큐에 다음 마을 정보를 저장
            if(dist[next] > dist[current] + nextCost){
                dist[next] = dist[current] + nextCost;
                queue.push([next, nextCost]);
            }
        }
    }
    
    //dist에 담긴 비용값들을 K 보다 적거나 같은 값을 출력    
    for(let i = 1; i <= N; i++){
        answer += dist[i] <= K ? 1 : 0;
    }
    
    return answer;
}
```

#### 출처: 프로그래머스 연습문제 그래프 배달, https://programmers.co.kr/learn/courses/13213/lessons/91411
