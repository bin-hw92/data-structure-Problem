class KeyWords{
    onClick = null;
    constructor({$target, onClick}){
        const $keyWords = document.createElement('section');
        $keyWords.className = "keyword-wrap";
        this.$keyWords = $keyWords;

        $target.appendChild(this.$keyWords);

        this.onClick = onClick;

        this.keyWordList();
    }

    keyWordList(){
        if(localStorage.getItem("keywords") !== null){
            const list = localStorage.getItem("keywords").split(",");
            this.$keyWords.innerHTML = list.reduce((result, key, idx) => {
                if(idx === 0){
                    result = `<div class="keyword-card" data-value="${key}">${key} <span data-id="${idx}">x</span></div>` 
                }else{
                    result +=  `<div class="keyword-card" data-value="${key}">${key} <span data-id="${idx}">x</span></div>`
                }
                return result;
            },0);

            this.$keyWords.querySelectorAll(".keyword-card").forEach((item, idx) => {
                item.addEventListener("click", (e) => {
                    let target = e.target;
                    if(target.tagName === "SPAN"){
                        const answer = list.reduce((result, key, idx) => {
                            if(idx !== Number(target.dataset.id)){
                                result.push(key);
                            }
                            return result;
                        },[]);
                        localStorage.setItem("keywords", answer.join(","));
                    }else{
                        const value = target.dataset.value; 
                        this.onClick(value);
                    }
                    this.keyWordList();
                });
            });
        }
    }
}