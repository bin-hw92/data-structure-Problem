### 입국심사

#### 문제설명
n명이 입국심사를 위해 줄을 서서 기다리고 있습니다. 각 입국심사대에 있는 심사관마다 심사하는데 걸리는 시간은 다릅니다.

처음에 모든 심사대는 비어있습니다. 한 심사대에서는 동시에 한 명만 심사를 할 수 있습니다. 가장 앞에 서 있는 사람은 비어 있는 심사대로 가서 심사를 받을 수 있습니다. 하지만 더 빨리 끝나는 심사대가 있으면 기다렸다가 그곳으로 가서 심사를 받을 수도 있습니다.

모든 사람이 심사를 받는데 걸리는 시간을 최소로 하고 싶습니다.

입국심사를 기다리는 사람 수 n, 각 심사관이 한 명을 심사하는데 걸리는 시간이 담긴 배열 times가 매개변수로 주어질 때, 모든 사람이 심사를 받는데 걸리는 시간의 최솟값을 return 하도록 solution 함수를 작성해주세요.

#### 제한사항
- 입국심사를 기다리는 사람은 1명 이상 1,000,000,000명 이하입니다.
- 각 심사관이 한 명을 심사하는데 걸리는 시간은 1분 이상 1,000,000,000분 이하입니다.
- 심사관은 1명 이상 100,000명 이하입니다.

#### 입출력 예
|n|times|return|
|-|---|-----|
|6|[7, 10]|28|

```
//이진탐색으로 푸는 문제 1
function solution(n, times) {
    const time = times.sort((a,b) => a - b);
    let left = 1;
    let right = time[time.length - 1] * n; //심가가 걸리는 최대 경우의 수
    while(left <= right){
        const mid = Math.floor((left + right)/2);
        //sum(시간 / 심사시간)
        const sum = times.reduce((result, item) => {
                            console.log(result, Math.floor( mid / item), mid, item)
                          result = result + Math.floor( mid / item);
                          return result;
                        }, 0);
        if(sum < n){
            left = mid + 1;
        }else {
            right = mid - 1;
        }
    }
    console.log(left, right)
}
```

#### 출처 : 프로그래머스 연습문제 입국심사, https://programmers.co.kr/learn/courses/30/lessons/43238?language=javascript
--------------------------------------------------------------------------------------------------------------------
이진 탐색을 이용해 풀 수 있는 문제입니다.

n명의 사람들이 전체 입국 심사 완료 최소 시간을 구하는 문제로

1분부터 최대 (제일 오래 걸리는 심사원 * n명)까지 이기 때문에

이진 탐색을 이용해서 중간 값부터 탐색을 하면 찾을 수 있는 문제라고 합니다.

