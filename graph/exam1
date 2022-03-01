/*
가장 먼 노트

문제 설명
n개의 노드가 있는 그래프가 있습니다. 각 노드는 1부터 n까지 번호가 적혀있습니다. 1번 노드에서 가장 멀리 떨어진 노드의 갯수를 구하려고 합니다. 가장 멀리 떨어진 노드란 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드들을 의미합니다.

노드의 개수 n, 간선에 대한 정보가 담긴 2차원 배열 vertex가 매개변수로 주어질 때, 1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인지를 return 하도록 solution 함수를 작성해주세요.

제한사항
노드의 개수 n은 2 이상 20,000 이하입니다.
간선은 양방향이며 총 1개 이상 50,000개 이하의 간선이 있습니다.
vertex 배열 각 행 [a, b]는 a번 노드와 b번 노드 사이에 간선이 있다는 의미입니다.
*/



function solution(n, edge) {
    const graph = Array.from(Array(n + 1), () => []);
    for(const [src, dest] of edge){
        graph[src].push(dest);
        graph[dest].push(src);
    }
    //처음 배열을 0 ~ 6까지 7개 그래프를 그렸기 때문에 가장먼 거리에 대한 배열도 7개로 생성
    const distance = Array(n + 1).fill(0);
    distance[1] = 1; //1번부터 시작이기 때문에 1번 배열에 1을 넣어줌
    
    const BFS = (graph, startNode, distance) => {
      const visited = []; // 탐색을 마친 노드들
      let needVisit = []; // 탐색해야할 노드들

      needVisit.push(startNode); // 노드 탐색 시작

      while (needVisit.length !== 0) { // 탐색해야할 노드가 남아있다면
        const node = needVisit.shift(); // queue이기 때문에 선입선출, shift()를 사용한다.
        if (!visited.includes(node)) { // 해당 노드가 탐색된 적 없다면
          visited.push(node);
          for(const dest of graph[node]){ //1번 노드부터 연결 노드 검색
              if(distance[dest] === 0){//해당 연결된 노드 값이 0이면
                 distance[dest] = distance[node]+1; //node와 연결된거기 때문에 거리 +1 해줌
                    //예: 1번 노드는 2,3과 연결, 2번이 최초에는 거리가 0이기 때문에
                    //1번 거리인 1 + 1처리
                    //2번 노드 와 인접한 노드는 3,4,5번이라서 2 + 1 처리 (단 3번은 이미 1번과 인접해서 2라는 값이 있어서 패스)
              }
          }
          needVisit = [...needVisit, ...graph[node]];
        }
      }
      return visited;
    };
    BFS(graph, 1, distance);
    
    const max = Math.max(...distance);
    return distance.filter(num => num >= max).length;
}

//출처: 프로그래머스 연습문제 가장 먼 노트, https://programmers.co.kr/learn/courses/30/lessons/49189?language=javascript
-----------------------------------------------------------------------------------------------------------------------
그래프 연습 문제

가장 거리가 먼 노드의 개수를 구하는 문제 입니다.
먼저 그래프로 배열을 연결 후 BFS(넓이 탐색)을 이용해서 최초 시작인 1와 인접한 노드들의 거리를 새로운 배열에 담아두고,
가장 큰 값들의 개수를 반환하면 되는 문제입니다.

그래프 문제 중에는 그나마 가장 기초적으로 할 수 있는 문제인것 같습니다.
