### 여행경로

#### 문제 설명
주어진 항공권을 모두 이용하여 여행경로를 짜려고 합니다. 항상 "ICN" 공항에서 출발합니다.

항공권 정보가 담긴 2차원 배열 tickets가 매개변수로 주어질 때, 방문하는 공항 경로를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

#### 제한사항
- 모든 공항은 알파벳 대문자 3글자로 이루어집니다.
- 주어진 공항 수는 3개 이상 10,000개 이하입니다.
- tickets의 각 행 [a, b]는 a 공항에서 b 공항으로 가는 항공권이 있다는 의미입니다.
- 주어진 항공권은 모두 사용해야 합니다.
- 만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다.
- 모든 도시를 방문할 수 없는 경우는 주어지지 않습니다.

#### 입출력 예
|tickets|return|
|-----|-----|
|[["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]|["ICN", "JFK", "HND", "IAD"]|
|[["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]|["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]|

```
function solution(tickets) {
  let answer = [];
  const result = [];
  const visited = [];
  
  tickets.sort();
  
  const len = tickets.length;
  const dfs = (str, count) => {
    result.push(str);
    
    if(count === len) {
      answer = result;
      return true;
    }
    
    for(let i = 0; i < len; i++) {
      if(!visited[i] && tickets[i][0] === str) {//무한 루프에 걸릴 수 있기 때문에, 사용한 티켓인지도 체크
        visited[i] = true;
        if(dfs(tickets[i][1], count+1)) return true;
        visited[i] = false;
      }
    }
    result.pop();
    
    return false;
  }
  
  dfs("ICN", 0);
  
  return answer;
}
```

#### 출처 : 프로그래머스 연습문제 DFS 여행경로, https://programmers.co.kr/learn/courses/30/lessons/43164?language=javascript
------------------------------------------------------------------------------------------------------------------------
해당 문제는 ICN 공항에서 무조건 출발해서 티켓에 있는 경로를 방문한 순서를 반환하는 문제입니다.<br>
이때 동일한 곳을 중복 방문해서 다른 곳들로 이동하는 경우들이 있으며, 무한 루프에 빠질 수 있기 때문에 dfs에서 해당 티켓 사용 여부를 체크해서
빠지고 다음 티켓을 확인 할 수 있게 해야합니다.
