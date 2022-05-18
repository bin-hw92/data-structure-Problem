class SearchResult {
    $searchResult = null;
    data = null;
    onClick = null;
    onScroll = null;
    constructor({ $target, initialData, onClick, onScroll }) {
      this.$searchResult = document.createElement("section");
      this.$searchResult.className = "SearchResult";
      $target.appendChild(this.$searchResult);
  
      this.data = initialData;
      this.onClick = onClick;
      this.onScroll = onScroll;
  
      this.render(true);
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render(false);
      this.scroll();
    }
  
    render(flag) {
      const storage_first = JSON.parse(localStorage.getItem("resultData"));
      if(storage_first !== null && flag){
        this.data = storage_first;
      }
        this.$searchResult.innerHTML = this.data.length === 0 && !flag ? `<div>검색 결과가 없습니다.</div>` :
        this.data.map(
          cat => `
            <div class="item">
              <img src=${cat.url} alt='${cat.name}' title='${cat.name}' />
            </div>
          `
        ).join("");
        
        this.click();
  
       if(!flag) document.querySelector('.SearchInput').focus();
    }

    click(){
      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
      });
    }

    scroll(){
      window.addEventListener("scroll", () => {
          let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
          let windowHeight = window.innerHeight; // 스크린 창
          let fullHeight = document.body.scrollHeight + 48; //  margin 값은 포함 x 상태라서 div=app 에 있는 margin 24를 위아래 값을 더해줌
          if(scrollLocation + windowHeight >= fullHeight){
            let input = document.querySelector(".SearchInput");
            this.onScroll(input.value);
          }
      });
    }

    AppendPage(nextData){
      nextData.map(
                  cat => 
                  {
                    this.data.push(cat); //data 배열에 담기
                    this.$searchResultAppend = document.createElement("div");
                    this.$searchResultAppend.className = "item";
                    this.$searchResultAppend.innerHTML = `<img src=${cat.url} alt='${cat.name}' title='${cat.name}' />`
                    this.$searchResult.appendChild(this.$searchResultAppend);
                  }).join("");
                  
      this.scroll();
      this.click();
    }
  }
  