import { comma } from "../utils/common.js";
import SelectedOptions from "./SelectedOptions.js";

export default function ProductDetailPage({$app, productId}){
    this.state = {
        productId,
        product: null,
        selectedOptions: []
    }
    this.$page = document.createElement('div');
    this.$page.className = 'ProductDetailPage';

    this.selectedOptions = null;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();

        //selectedOptions.js 변경 시 적용
        if(this.selectedOptions){
            this.selectedOptions.setState({
                ...this.state,
                selectedOptions: this.state.selectedOptions
            });
        }
    }

    this.render = () => {
        if(!this.state.product){
            $app.innerHTML = "Loading...";
        }else{
            $app.innerHTML = "";
            $app.appendChild(this.$page);

            const detail = this.state.product;
            const header = `<h1>${detail.name} 상품 정보</h1>`;
            const DetailTemplates = `
                                <div class="ProductDetail">
                                    <img src="${detail.imageUrl}">
                                    <div class="ProductDetail__info">
                                        <h2>${detail.name}</h2>
                                        <div class="ProductDetail__price">${comma(detail.price)}원~</div>
                                        <select>
                                            <option>선택하세요</option>
                                            ${detail.productOptions.map((option) => {
                                            return  `
                                                        <option value="${option.id}" ${option.stock === 0 ? "disabled" : ""}>
                                                            ${option.stock === 0 ? "(품절)" : ""}${detail.name} ${option.name} ${option.price > 0 ? `(+${comma(option.price)}원)` : ""}
                                                        </option>
                                                    `
                                            }).join("")}
                                        </select>
                                        <div class="ProductDetail__selectedOptions"></div>
                                    </div>
                                </div>
                                `;

            this.$page.innerHTML = header + DetailTemplates;
            //select 선택 적용 JS 만들기
            this.selectedOptions = new SelectedOptions({
                $app : this.$page.querySelector(".ProductDetail__selectedOptions"),
                initialState : {
                    product : this.state.product,
                    selectedOptions : this.state.selectedOptions
                }
            });
        }   
    }

    //이벤트 위임 기법을 이용해 이벤트 자체는 ProductDetail 최상위의 div에서 처리합니다.
    this.$page.addEventListener("change", e => {
        if(e.target.tagName === "SELECT"){
            //상품 옵션을 나타내는 option의 value에는 optionId를 담고 있습니다.
            const selectedOptionId = parseInt(e.target.value);
            const { product, selectedOptions } = this.state;

            //상품의 옵션 데이터에서 현재 선택한 optionId가 존재하는지 찾습니다.
            const option = product.productOptions.find(item => item.id === selectedOptionId);
            //이미 선택한 상품인지 선택된 상품 데이터에서 찾아봅니다.
            const selectedOption = selectedOptions.find(selectItem => selectItem.optionsId === selectedOptionId);

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