

export default function  Nodes ({$app, initialState, onClick, onBackClick}) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Nodes";
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        //상태값 세팅
        this.state = nextState,
        this.render() //render로 보내기
    };
    
    this.onClick = onClick;
    this.onBackClick = onBackClick;

    this.render = () => {
        if(this.state.nodes){
            const nodesTemplate = this.state.nodes.map(node => {
                const iconPath = node.type === "FILE" ? "./assets/file.png" : "./assets/directory.png";
                return `
                    <div class="Node" data-node="${node.id}">
                        <img src="${iconPath}" />
                        <div>${node.name}</div>
                    </div>
                `
            }).join("");

            //Root 폴터 렌더링이 아닌 경우 뒤로가기를 렌더링
            this.$target.innerHTML = !this.state.isRoot ? `
                <div class="Node">
                    <img src="./assets/prev.png" />
                </div>
                 ${nodesTemplate} ` : nodesTemplate
        }
    };
    this.$target.addEventListener('click', (e) => {

        //closest를 이용하면 현재 클릭한 요소와 제일 인접한 요소를 가져올 수 있음
        const $node = e.target.closest(".Node").dataset.node;

        if($node === undefined){
            this.onBackClick();
            return
        }
        const selectNode = this.state.nodes.find(node => node.id === $node)
        if(selectNode){
            this.onClick(selectNode);
            return
        }
    });
    this.render();
}
