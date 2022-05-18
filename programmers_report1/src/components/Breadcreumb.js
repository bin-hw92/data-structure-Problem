//기초 이미지 렌더링 작업을 여기서 진행
//app와 상태값을 받아서 작업
class Breadcreumb {
  $target = null;
  state = null;

  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement("nav");
    this.$target.className = "Breadcrumb";

    //main class="App"에 해당 내용 넣기
    $app.appendChild(this.$target);

    this.render();
  }

  setState = (nextState) => {
    //상태값 세팅
    this.state = nextState;
    this.render(); //render로 보내기
  };

  render = () => {
    //현재 디렉토리 위치 받기
    // ``으로 감싼 값 안에 다시 파람을 받을 때는 한번 더 ``으로 감싸야함
    this.$target.innerHTML = `
            <div>root</div>
            ${this.state.map((node, index) => 
                `<div data-index="${index}">${node.name}</div>`
              ).join("")}
            </div>
        `;
  };
  
}

export default Breadcreumb;