### 타겟 넘버

#### 문제 설명
n개의 음이 아닌 정수들이 있습니다. 이 정수들을 순서를 바꾸지 않고 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.
```
-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3
```
사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

#### 제한사항
- 주어지는 숫자의 개수는 2개 이상 20개 이하입니다.
- 각 숫자는 1 이상 50 이하인 자연수입니다.
- 타겟 넘버는 1 이상 1000 이하인 자연수입니다.

#### 입출력 예
|numbers|target|return|
|[1, 1, 1, 1, 1]|3|5|
|[4, 1, 2, 1]|4|2|

```
function solution(numbers, target) {
   return dfs(numbers, target, 0, 0);
}

    const dfs = (numbers, target, depth, sum) => {
        let Count = 0;
        //console.log(depth, sum);

        if (depth == numbers.length) {
            if (sum == target) {
                return 1;
            }
            return 0;
        }
        Count += dfs(numbers, target, depth + 1, sum + numbers[depth]); // a
        Count += dfs(numbers, target, depth + 1, sum - numbers[depth]); // b
        return Count;
    }
```

#### 출처 : 프로그래머스 깊이/너비 우선 탐색 타겟 넘버, https://programmers.co.kr/learn/courses/30/lessons/43165?language=javascript
--------------------------------------------------------------------------------------------------------------------------------
우선 탐색 문제입니다.<br>
dfs 깊이 탐색으로 푼 문제이며, dfs를 통해 전체 객체를 확인 후 재귀를 통해 모든 상황을 조회 후 target에 해당하는 횟수를 반환한 문제입니다.

예제 2번을 기준으로 말씀드리면,<br>
0 에서 출발 -> a,b 재귀 -> 리턴이 안되었기 때문에 다시 내려와서 a,b 실행하지만 a,b재귀니깐 a0 -> a1,b1 재귀, b0 -> a2,b2 실행<br>
계속 늘어납니다. 그리고 리턴이 된 회수를 count에 저장 후 dfs를 호출한 곳으로 반환


