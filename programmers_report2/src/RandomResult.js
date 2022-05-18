class RandomResult {
  $searchResult = null;
  data = null;
  visible = null;
  constructor({ $target, initialData, onClick, visible }) {
    this.$randomResult = document.createElement("section");
    this.$randomResult.className = "RandomResult";
    $target.appendChild(this.$randomResult);

    this.data = initialData;
    this.onClick = onClick;
    this.visible = visible;

    this.render();
  }

  setState(nextData, visible) {
    this.data = nextData;
    this.visible = visible;
    this.render();
  }

  render() {
    const storage_first = JSON.parse(localStorage.getItem("randomData"));
    if(storage_first !== null){
        this.data = storage_first;
        this.visible = true;
    }
    if (this.visible) {
        this.$randomResult.innerHTML =  this.data.map(cat => `
                                                    <div class="item">
                                                        <img src=${cat.url} alt='${cat.name}' title='${cat.name}' />
                                                    </div>  ` ).join("")
                                                    + `<div class="prev">이전</div>`
                                                    + `<div class="next">다음</div>`;

        this.$randomResult.querySelectorAll(".item").forEach(($item, index) => {
            if(index > 4) $item.style.display = "none";
            $item.addEventListener("click", () => {
                this.onClick(this.data[index]);
            });
        });

        this.$next = this.$randomResult.querySelector(".next");
        this.$next.addEventListener("click", () => {
            let min = 50;
            let max = 0;
            this.$randomResult.querySelectorAll(".item").forEach(($item, idx) => {
                if($item.style.display === '' || $item.style.display === 'block'){
                    if(min > idx){
                        min = idx;
                    }
                    if(max < idx){
                        max = idx;
                    }
                }
            });
            this.$randomResult.querySelectorAll(".item").forEach(($item, idx) => {
                if(idx === min) $item.style.display = "none";
                if(idx === max+1) $item.style.display = "block";
            });
        });
        
        this.$prev = this.$randomResult.querySelector(".prev");
        this.$prev.addEventListener("click", () => {
            let min = 100;
            let max = 0;
            this.$randomResult.querySelectorAll(".item").forEach(($item, idx) => {
                if($item.style.display === '' || $item.style.display === 'block'){
                    if(min > idx){
                        min = idx;
                    }
                    if(max < idx){
                        max = idx;
                    }
                }
            });
            this.$randomResult.querySelectorAll(".item").forEach(($item, idx) => {
                if(idx === min-1) $item.style.display = "block";
                if(idx === max) $item.style.display = "none";
            });
        });

        this.$randomResult.style.display = "flex";
    }else{
        this.$randomResult.style.display = "none";       
    }
  }
}
