import SelectedOptions from "./SelectedOptions";


export default function ProductDetail({$app, initialState}){
    let isInitialized = false; //최초 렌더링 된건지 확인용 계속 나올 경우 깜빡임이 됨
    this.state = initialState;

    this.$productDetail = document.createElement('div');
    this.$productDetail.className = "ProductDetail";

    $app.appendChild(this.$productDetail);


    //fetchProduct 이후 화면이 렌더링 되었을 때 동작할 수 있도록 let으로 생성만 해둡니다.

    let selectedOptions = null;
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();

        if(selectedOptions){
            selectedOptions.setState({
                selectedOptions: this.state.selectedOptions
            });
        }
    }

    this.render = () => {
        const { product} = this.state;
        if(!isInitialized){
            this.$productDetail.innerHTML = `
                                        <img src="${product.imageUrl}">
                                        <div class="ProductDetail__info">
                                            <h2>${product.name}</h2>
                                            <div class="ProductDetail__price>${product.price}원~</div>
                                            <select>
                                                <option>선택하세요</option>
                                                ${product.productOptions.map((option) => {
                                                return  `
                                                            <option value="${option.id}" ${option.stock === 0 ? "disabled" : ""}>
                                                                ${option.stock === 0 ? "(품절)" : ""}${product.name} ${option.name} ${option.price > 0 ? `(+${option.price}원)` : ""}
                                                            </option>
                                                        `
                                                }).join("")}
                                            </select>
                                            <div class="ProductDetail__selectOptions"></div>
                                        </div>
                                    `;

            selectedOptions = new SelectedOptions({
                $app : this.$productDetail.querySelector(".ProductDetail__selectedOptions"),
                initialState : {
                    product : this.state.product,
                    selectedOptions : this.state.selectedOptions
                }
            });
            isInitialized = true;
        }
    }
    this.render();

    //이벤트 위임 기법을 이용해 이벤트 자체는 ProductDetail 최상위의 div에서 처리합니다.
    this.$productDetail.addEventListener("change", e => {
        if(e.target.tagName === "SELECT"){
            //상품 옵션을 나타내는 option의 value에는 optionId를 담고 있습니다.
            const selectedOptionId = parseInt(e.target.value);
            const { product, selectedOptions } = this.state;

            //상품의 옵션 데이터에서 현재 선택한 optionId가 존재하는지 찾습니다.
            const option = product.productOptions.find(item => item.id === selectedOptionId);
            //이미 선택한 상품인지 선택된 상품 데이터에서 찾아봅니다.
            const selectedOption = selectedOptions.find(selectItem => selectItem.optionId === selectedOptionId);

            //존재하는 옵션이고 선택된 옵션이 아닌 경우에만 selectedOptions에 현재 선택한 옵션 추가
            if(option && !selectedOption){
                const nextSelectOptions = [
                    ...selectedOptions,
                    {
                        productId : product.id,
                        optionsId: option.id,
                        optionName : option.name,
                        optionPrice: option.price,
                        quantity: 1
                    }
                ]
                this.setState({
                    ...this.state,
                    selectedOptions: nextSelectOptions
                })
            }
        }
    });
}