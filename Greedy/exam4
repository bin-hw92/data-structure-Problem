/*
섬 연결하기

문제 설명
n개의 섬 사이에 다리를 건설하는 비용(costs)이 주어질 때, 최소의 비용으로 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용을 return 하도록 solution을 완성하세요.

다리를 여러 번 건너더라도, 도달할 수만 있으면 통행 가능하다고 봅니다. 예를 들어 A 섬과 B 섬 사이에 다리가 있고, B 섬과 C 섬 사이에 다리가 있으면 A 섬과 C 섬은 서로 통행 가능합니다.

제한사항

섬의 개수 n은 1 이상 100 이하입니다.
costs의 길이는 ((n-1) * n) / 2이하입니다.
임의의 i에 대해, costs[i][0] 와 costs[i] [1]에는 다리가 연결되는 두 섬의 번호가 들어있고, costs[i] [2]에는 이 두 섬을 연결하는 다리를 건설할 때 드는 비용입니다.
같은 연결은 두 번 주어지지 않습니다. 또한 순서가 바뀌더라도 같은 연결로 봅니다. 즉 0과 1 사이를 연결하는 비용이 주어졌을 때, 1과 0의 비용이 주어지지 않습니다.
모든 섬 사이의 다리 건설 비용이 주어지지 않습니다. 이 경우, 두 섬 사이의 건설이 불가능한 것으로 봅니다.
연결할 수 없는 섬은 주어지지 않습니다.
입출력 예

n	costs	return
4	[[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]]	4
*/

function solution(n, costs) {
    let answer = 0;
    // 처음에는 자기 자신의 값을 부모로 가지는 배열 생성
    const parent = [];
    for(let i=0; i<n; i++) parent.push(i);

    costs.sort((a,b)=>a[2]-b[2]); // 정답에 해당 가중치를 더해준다 (오름차순으로 정렬해서 작은값 선택 가능)
    // 각 섬의 부모를 찾는 재귀 함수
    // 만약 초기 값이 아니라면 parent[x]를 이용해 위로 올라가서 부모값 찾음
    const getParent = (parent, x, i) => {
      if(parent[x] === x) return x;
      return parent[x] = getParent(parent,parent[x], i);
    }

    // 두 섬의 부모를 하나로 합쳐준다.
    // 이때 두 부모중 작은 값을 가지는 부모로 합쳐준다.
    const unionParent = (parent, x, y) => {
       const n1 = getParent(parent,x);
       const n2 = getParent(parent,y);
       if(n1<n2) return parent[n2] = n1;
       else return parent[n1] = n2;
    }

    // 두 섬의 부모를 찾고, 부모가 같으면 true, 다르면 false return
     const findParent = (parent, x, y) => {
       const n1 = getParent(parent,x, 'x');
       const n2 = getParent(parent,y, 'y');
       if(n1===n2) return true;
       else return false;
    }
    
    for(const cost of costs){
        if(!findParent(parent,cost[0],cost[1])){
            answer += cost[2];
            unionParent(parent,cost[0],cost[1]);
        }
    }
    return answer;
}

//출처 : 프로그래머스 연습문제 탐욕법 섬 연결하기, https://programmers.co.kr/learn/courses/30/lessons/42861?language=javascript
---------------------------------------------------------------------------------------------------------------------------
이 문제는  Union-Find 알고리즘과 크루스칼 알고리즘을 이용해서 푸는 문제라고 합니다.
크루스칼 알고리즘은 가중치 그래프에서  최소비용 신장트리를 찾는 알고리즘이라고 합니다. (신장트리 : 그래프의 최소 연결 부분 그래프를 의미합니다.)
크루스칼 알고리즘 구현 방법은
1.그래프의 간선들의 가중치를 오름차순으로 정렬
2.사이클을 형성하지 않는 선에서 순서대로 간선을 선택
3.선택된 간선을 최소신장 집합에 추가한다.
-> 이때 사이클의 형성 여부를 판단할 때 사용하는 방법이 있는데 그것이 바로 Union-Find 알고리즘입니다.
(추가하고자 하는 간선의 양 끝 정점이 같은 집합에 속해 있는지를 판단하기 위해서 사용됩니다.)

해당 문제 자체는 어렵지 않지만, 해당 알고리즘을 사용해서 코딩을 짜는 부분이 처음 접하다보니 다른 분들 내용을 많이 참고했습니다...
