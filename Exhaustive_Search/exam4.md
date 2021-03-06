### 피로도

#### 문제 설명
XX게임에는 피로도 시스템(0 이상의 정수로 표현합니다)이 있으며, 일정 피로도를 사용해서 던전을 탐험할 수 있습니다. 이때, 각 던전마다 탐험을 시작하기 위해 필요한 "최소 필요 피로도"와 던전 탐험을 마쳤을 때 소모되는 "소모 피로도"가 있습니다. "최소 필요 피로도"는 해당 던전을 탐험하기 위해 가지고 있어야 하는 최소한의 피로도를 나타내며, "소모 피로도"는 던전을 탐험한 후 소모되는 피로도를 나타냅니다. 예를 들어 "최소 필요 피로도"가 80, "소모 피로도"가 20인 던전을 탐험하기 위해서는 유저의 현재 남은 피로도는 80 이상 이어야 하며, 던전을 탐험한 후에는 피로도 20이 소모됩니다.

이 게임에는 하루에 한 번씩 탐험할 수 있는 던전이 여러개 있는데, 한 유저가 오늘 이 던전들을 최대한 많이 탐험하려 합니다. 유저의 현재 피로도 k와 각 던전별 "최소 필요 피로도", "소모 피로도"가 담긴 2차원 배열 dungeons 가 매개변수로 주어질 때, 유저가 탐험할수 있는 최대 던전 수를 return 하도록 solution 함수를 완성해주세요.

#### 제한사항
- k는 1 이상 5,000 이하인 자연수입니다.
- dungeons의 세로(행) 길이(즉, 던전의 개수)는 1 이상 8 이하입니다.
    - dungeons의 가로(열) 길이는 2 입니다.
    - dungeons의 각 행은 각 던전의 ["최소 필요 피로도", "소모 피로도"] 입니다.
    - "최소 필요 피로도"는 항상 "소모 피로도"보다 크거나 같습니다.
    - "최소 필요 피로도"와 "소모 피로도"는 1 이상 1,000 이하인 자연수입니다.
    - 서로 다른 던전의 ["최소 필요 피로도", "소모 피로도"]가 서로 같을 수 있습니다.

#### 입출력 예
|k|dungeons|result|
|-|------|-------|
|80|[[80,20],[50,40],[30,10]]|3|

```
function solution(k, dungeons) {
    const list = combination(dungeons, dungeons.length);
    let answer = 0;
    while(list.length){
        let life = k;
        let arr = list.shift();
        let cnt = 0;
        for(const i of arr){
            if(life >= i[0]){
                life -= i[1];
                cnt++;
            }
        }
        answer = Math.max(answer, cnt);
    }
    return answer;
}

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

#### 출처 : 프로그래머스 연습문제 피로도, https://programmers.co.kr/learn/courses/30/lessons/87946?language=javascript
------------------------------------------------------------------------------------------------------------------
해당 문제는 피로도로 몇번까지 던전을 돌수 있는지 최대값 리턴 문제입니다.<br>
솔직히 여러 알고리즘을 이용해 효율성을 좀 높이는 방식을 찾고 싶었지만... 아직 잘 몰라서...<br>
효율성을 따로 테스트하지 않아, 순열탐색으로 던전의 모든 순서를 조합하고, 그걸 반복해서 최대값을 반환했습니다.

