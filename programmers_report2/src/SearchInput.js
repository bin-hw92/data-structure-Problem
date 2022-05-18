const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onClick }) {
    const $searchWrap = document.createElement('div');
    this.$searchWrap = $searchWrap;
    $searchWrap.className = "SearchWrap";

    const $toggleBox = document.createElement("input");
    this.$toggleBox = $toggleBox;
    $toggleBox.type = "checkbox";

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $searchWrap.appendChild($searchInput);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });
    $searchInput.addEventListener("click", e => {
      e.target.value = '';
    });

    const $randomBtn = document.createElement("button");
    this.$randomBtn = $randomBtn;
    $randomBtn.className = "randomBtn";
    $randomBtn.append('랜덤검색');
    $searchWrap.appendChild($randomBtn);

    $target.appendChild($searchWrap);

    $randomBtn.addEventListener("click", e => {
      onClick();
    });
  }
  render() {}
}
