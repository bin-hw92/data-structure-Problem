### 베스트앨범

#### 문제 설명
스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다. 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.

1. 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
2. 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.

노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때, 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.

#### 제한사항
- genres[i]는 고유번호가 i인 노래의 장르입니다.
- plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
- genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.
- 장르 종류는 100개 미만입니다.
- 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
- 모든 장르는 재생된 횟수가 다릅니다.

#### 입출력 예
|genres|plays|return|
|-----|-----|-------|
|["classic", "pop", "classic", "classic", "pop"]|[500, 600, 150, 800, 2500]|[4, 1, 3, 0]|

```
function solution(genres, plays) {
    const genreAnswer = new Map();
    genres.map((genre, index) => [genre, plays[index]])
          .forEach(([genre, play], index) => {
                   const data = genreAnswer.get(genre) || {total : 0, songs: []}
                    genreAnswer.set(genre, {
                        total: data.total + play,
                        songs: [...data.songs, {play, index}]
                        .sort((a, b) => b.play - a.play)
                        .slice(0, 2)
                    });
            });
    return [...genreAnswer].flatMap((item, x) => item[1])
                           .sort((a, b) => b.total - a.total)
                           .flatMap(x => x.songs)
                           .flatMap(x => x.index)
}
```

#### 출처 : 프로그래머스 연습문제 베스트앨범, https://programmers.co.kr/learn/courses/30/lessons/42579?language=javascript
--------------------------------------------------------------------------------------------------------------------
해당 문제는 노래를 각각 같은 노래로 묶고 play 값이 높은 순으로 나오며, 노래 종류별로 제일 높은 번호를 2개씩 반환하는 문제입니다.<br>
그렇기 때문에 Map에 노래별로 제목을 객체명(key)으로 묶는데 값(value)에 해당 노래의 번호와 play값을 배열로 묶고, 토탈 play값을 따로 묶을 필요가 있습니다.<br>
그후 토탈이 높은 노래부터 두개씩 반환하면 끝이 납니다.
