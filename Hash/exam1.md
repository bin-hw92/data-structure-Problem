### 완주하지 못한 선수

#### 문제 설명
수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

#### 제한사항
- 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
- completion의 길이는 participant의 길이보다 1 작습니다.
- 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
- 참가자 중에는 동명이인이 있을 수 있습니다.

#### 입출력 예
|participant|completion|return|
|----------|-----------|-----|
|["leo", "kiki", "eden"]|["eden", "kiki"]|"leo"|
|["marina", "josipa", "nikola", "vinko", "filipa"]|["josipa", "filipa", "marina", "nikola"]|"vinko"|
|["mislav", "stanko", "mislav", "ana"]|["stanko", "ana", "mislav"]|"mislav"|

#### 입출력 예 설명
예제 #1<br>
"leo"는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #2<br>
"vinko"는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #3<br>
"mislav"는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.

```
function solution(participant, completion) {
    const answer = new Map();
    participant.map((x) => {
       if(!answer.has(x)) answer.set(x, 1);
        else answer.set(x, answer.get(x) + 1);
    });
    completion.map(x => {
       if(answer.get(x) == 1) answer.delete(x);
        else answer.set(x, answer.get(x) - 1);
    });
    
    return [...answer].flatMap(x => x[0]).join()
}
```

### 출처 : 프로그래머스 연습문제 완주하지 못한 선수, https://programmers.co.kr/learn/courses/30/lessons/42576?language=javascript
---------------------------------------------------------------------------------------------------------------------------
해당 문제는 해시를 이용한 문제로 가장 기초적인 문제인것 같습니다.

출발 인원을 처음에 Map에 넣을 때 동명이인 수를 같이 넣어두고, 완주자를 구하면 되기 때문입니다.
