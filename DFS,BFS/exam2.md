### 네트워크

#### 문제 설명
네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. 예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.

컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

#### 제한사항
- 컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
- 각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
- i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
- computer[i][i]는 항상 1입니다.

#### 입출력 예
|n|computers|return|
|-|------|-------|
|3|[[1, 1, 0], [1, 1, 0], [0, 0, 1]]|2|
|3|[[1, 1, 0], [1, 1, 1], [0, 1, 1]]|1|

```
function solution(n, computers) {
    let answer = 0;
    const visitied = [];
    for(const i in computers){
        answer += dfs(i, i, computers, visitied); //각각 컴퓨터별로 연결된 내용 확인을 위해서 반복문 사용
        //console.log(answer)
    }
    return answer;
}

const dfs = (i, n, computers, visitied) => {
    //console.log(i, n, visitied)
    if(visitied[i]){ //해당 i번이 이미 연결된게 있을 경우 0을 반환
        return 0;
    }
    visitied[i] = true; //i번이 아직 연결 확인이 안되어있을 경우 미리 true로 체크해둠
    
    for(const j in computers){
        if(computers[i][j] === 1){ //i번과 연결된 컴퓨터 확인
            dfs(j, n, computers, visitied);
        }
    }
    return 1; //0을 리턴하지 않았을 경우 통합 1개로 보고 반환
}
```

#### 출처 : 프로그래머스 연습문제 네트워크, https://programmers.co.kr/learn/courses/30/lessons/43162?language=javascript
---------------------------------------------------------------------------------------------------------------------
해당 문제는 컴퓨터끼리 연결된 네트워크 1개로 보고, 총 네트워크 개수를 반환하는 문제입니다.<br>
a,b,c 컴퓨터가 있을 때   a -> b 가 연결되어있고,  b가 c랑 연결이 되어있는 경우<br>
b는 a,b 모두와 연결이 되어  a는 b를 통해 c까지 연결이 되는 상황이기에 네트워크는 1개로 보면 됩니다.

모든 컴퓨터를 확인해서, 연결된 경우들의 합을 반환하면 문제가 해결됩니다.



