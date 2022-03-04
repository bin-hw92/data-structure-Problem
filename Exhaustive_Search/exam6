/*
모음 사전

문제 설명
사전에 알파벳 모음 'A', 'E', 'I', 'O', 'U'만을 사용하여 만들 수 있는, 길이 5 이하의 모든 단어가 수록되어 있습니다. 사전에서 첫 번째 단어는 "A"이고, 그다음은 "AA"이며, 마지막 단어는 "UUUUU"입니다.

단어 하나 word가 매개변수로 주어질 때, 이 단어가 사전에서 몇 번째 단어인지 return 하도록 solution 함수를 완성해주세요.

제한사항
word의 길이는 1 이상 5 이하입니다.
word는 알파벳 대문자 'A', 'E', 'I', 'O', 'U'로만 이루어져 있습니다.
입출력 예
word	result
"AAAAE"	6
"AAAE"	10
"I"	1563
"EIO"	1189

*/

function solution(word) {
    const TXT = ['A', 'E', 'I', 'O', 'U'];
    let result = 0;
    let flag = false;
    
    const check = (str, word) => {
        if(flag){ //word 값을 찾았기 때문에 리턴
            return;
        }else if(str.length > 5){ //word에 최대길이는 5이기 때문에 넘어가면 리턴
            return;
        }else if(str.length > 0){
            result++;
            if(word === str){
                flag = true;
            }
        }
        for(let i = 0; i < TXT.length; i++){
            check(str+TXT[i] , word); //재귀를 통해 A ~ AAAA ~ UUUUU까지 반복
        }
        return;
    }
    
    check('',word); //처음에는 0이기 떄문에 단어가 ''
    
    return result;
}

// 출처 : 프로그래머 연습문제 위클리 5주차 모음사전, https://programmers.co.kr/learn/courses/30/lessons/84512
---------------------------------------------------------------------------------------------------------
해당 문제는  A ~ UUUUU 까지 순서를 찾는 문제입니다.
재귀를 통해 완전 탐색 A ~ UUUUU 까지 탐색하면서,  제공하는 단어의 순서를 리턴하면 됩니다.
이 문제는 작년에 JAVA로 풀었던 적 있는 문제라서 해당 JAVA 내용을 보고 script로 변경한 문제입니다.

// JAVA
import java.util.*;
class Solution {
    static String[] TXT = {"A", "E", "I", "O", "U"};
    static int result;
    static boolean flag;
    public int solution(String word) {
        result = 0;
        flag = false;
        checked("",word);
        return result;
    }
    public static void checked(String str, String word){
        if(flag){
            return;
        }else if(str.length() > 5){
            return;
        }else if(str.length()>0){
            result++;
            if(word.equals(str)){
                flag = true;
            }
        }
        for(int i = 0; i < TXT.length; i++){
            checked(str+TXT[i],word);
        }
        return;
    }
}



