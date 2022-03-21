### 음양 더하기

#### 문제 설명
어떤 정수들이 있습니다. 이 정수들의 절댓값을 차례대로 담은 정수 배열 absolutes와 이 정수들의 부호를 차례대로 담은 불리언 배열 signs가 매개변수로 주어집니다. 실제 정수들의 합을 구하여 return 하도록 solution 함수를 완성해주세요.

#### 제한사항
- absolutes의 길이는 1 이상 1,000 이하입니다.
  - absolutes의 모든 수는 각각 1 이상 1,000 이하입니다.
- signs의 길이는 absolutes의 길이와 같습니다.
  - signs[i] 가 참이면 absolutes[i] 의 실제 정수가 양수임을, 그렇지 않으면 음수임을 의미합니다.

#### 입출력 예
|-----|---|-----|
|absolutes|signs|result|
|[4,7,12]|[true,false,true]|9|
|[1,2,3]|[false,false,true]|0|

```
function solution(absolutes, signs) {
    const result = [];
    
    for(const i in signs){
        if(signs[i]){
            result.push(absolutes[i]);
        }else{
            if(absolutes[i] < 0) {
                result.push(absolutes[i]);
            }else{
                let num = absolutes[i] * -1;
                result.push(num);
            }
        }
    }
    return result.reduce((item, acc) => item + acc);
}
```

#### 출처: 프로그래머스 연습문제 음양더하기, https://programmers.co.kr/learn/courses/30/lessons/76501?language=javascript
----------------------------------------------------------------------------------------------------------------------
해당 문제는 absolute에 들어있는 문자열이 signs에서 참거짓을 참조하기만 하면 바로 답이 나오는 간단한 문제입니다.

해당 정수가 false일 경우에는 음수이기 떄문에 변환 시켜주고 전체적으로 더하기만 하면 끝 입니다.

