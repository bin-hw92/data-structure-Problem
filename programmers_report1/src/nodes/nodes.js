class Nodes {
    $target = null;
    state = null;
    onClick = null;
    onBackClick = null;
    constructor({ $app, initialState, onClick, onBackClick }) {
      this.state = initialState;
      this.$target = document.createElement("div");
      this.$target.className = "Nodes";
      $app.appendChild(this.$target);
  
      this.onClick = onClick;
      this.onBackClick = onBackClick;
  
      this.render();
    }
    setState = (nextState) => {
      //상태값 세팅
      this.state = nextState;
      this.render(); //render로 보내기
    };
  
    render = () => {
      if (this.state.nodes) {
        const nodesTemplate = this.state.nodes
          .map((node) => {
            const iconPath =
              node.type === "FILE"
                ? "./assets/file.png"
                : "./assets/directory.png";
            return `
                      <div class="Node" data-node="${node.id}">
                          <img src="${iconPath}" />
                          <div>${node.name}</div>
                      </div>
                  `;
          })
          .join("");
  
        //Root 폴터 렌더링이 아닌 경우 뒤로가기를 렌더링
        this.$target.innerHTML = !this.state.isRoot
          ? `
                  <div class="Node">
                      <img src="./assets/prev.png" />
                  </div>
                   ${nodesTemplate} `
          : nodesTemplate;
      }
  
      this.$target.querySelectorAll(".Node").forEach($node => {
          $node.addEventListener("click", (e) => {
              const $nodeId = e.target.closest(".Node").dataset.node;
              console.log($nodeId);
              if($nodeId === undefined){
                  this.onBackClick();
                  return;
              }
              const selectNode = this.state.nodes.find((node) => node.id === $nodeId);
              if (selectNode) {
                this.onClick(selectNode);
                return;
              }
          });
      });
  
    };
  }
  
  export default Nodes;