/*
단어 변환

문제 설명
두 개의 단어 begin, target과 단어의 집합 words가 있습니다. 아래와 같은 규칙을 이용하여 begin에서 target으로 변환하는 가장 짧은 변환 과정을 찾으려고 합니다.

1. 한 번에 한 개의 알파벳만 바꿀 수 있습니다.
2. words에 있는 단어로만 변환할 수 있습니다.
예를 들어 begin이 "hit", target가 "cog", words가 ["hot","dot","dog","lot","log","cog"]라면 "hit" -> "hot" -> "dot" -> "dog" -> "cog"와 같이 4단계를 거쳐 변환할 수 있습니다.

두 개의 단어 begin, target과 단어의 집합 words가 매개변수로 주어질 때, 최소 몇 단계의 과정을 거쳐 begin을 target으로 변환할 수 있는지 return 하도록 solution 함수를 작성해주세요.

제한사항
각 단어는 알파벳 소문자로만 이루어져 있습니다.
각 단어의 길이는 3 이상 10 이하이며 모든 단어의 길이는 같습니다.
words에는 3개 이상 50개 이하의 단어가 있으며 중복되는 단어는 없습니다.
begin과 target은 같지 않습니다.
변환할 수 없는 경우에는 0를 return 합니다.
입출력 예
begin	target	words	return
"hit"	"cog"	["hot", "dot", "dog", "lot", "log", "cog"]	4
"hit"	"cog"	["hot", "dot", "dog", "lot", "log"]	0
*/

function solution(begin, target, words) {
    const result = [];
    let len = words.length;
    if(words.filter(name => name === target).length === 0){
        return 0;
    }
    
    return dfs(begin, target, words, result, 0, len);
}
const dfs = (begin, target, words, result, cnt, answer) => {
//console.log(begin);
    if(begin === target){
        return cnt;
    }
    for(const i in words){
        if(!result[i] && checkWord(begin, words[i])){
            result[i] = true;
            answer = Math.min(answer, dfs(words[i], target, words, result, cnt + 1, answer));
            result[i] = false;
        }
    }
        //console.log(begin, answer);
    return answer;
}
const checkWord = (begin, after) => {
    if(begin.length !== after.length){
        return false;
    }
    let cnt = 0;
    for(const i in begin){
        if(begin.charAt(i) !== after.charAt(i)){
            cnt++;
        }
    }
    return cnt === 1;
}

//출처 : 프로그래머스 연습문제 DFS/BFS 단어변환, https://programmers.co.kr/learn/courses/30/lessons/43163?language=javascript
-----------------------------------------------------------------------------------------------------------------------------
해당 문제는 문자를 한글자씩 변경이 가능합니다.
그렇기 떄문에 dfs를 통해 words를 조회하기 전에 begin이 words를 통해 target으로 변환이 가능한지 먼저 체크 후
dfs를 돌리면 됩니다. 
이때 각각 words 순서별로 몇번째만에 변경이 가능한지 카운트를 하고, 해당 words 단어들이 begin과 한글자만 다른지 체크를 진행해서 target 글자 완성된
카운트 중 최소값은 반환하면 해결됩니다.
