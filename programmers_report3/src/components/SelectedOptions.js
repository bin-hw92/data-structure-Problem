import { routeChange } from "../utils/Router.js";
import { getItem, removeItem, setItem } from "../utils/Storage.js";
import { comma } from "../utils/common.js";

export default function SelectedOptions({$app, initialState}){
    this.state = initialState;

    this.$selected = document.createElement('div');
    $app.appendChild(this.$selected);

    //상품가격 총합 구하기
    this.getTotalPrice = () => {
        const { product, selectedOptions } = this.state;
        const { price: productPrice } = product;

        return comma(selectedOptions.reduce((acc, option) => acc + ((productPrice + option.optionPrice) * option.quantity), 0)); //0번부터 상품 값과 옵션값 더한 최종값 출력
    }

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        const { product, selectedOptions = []} = this.state;
        if(product && selectedOptions){
            this.$selected.innerHTML = `
                                    <h3>선택된 상품</h3>
                                    <ul>
                                        ${selectedOptions.map((select) => {
                                            return `<li>
                                                ${select.optionName} ${comma((product.price + select.optionPrice))}원
                                                <input type="text" data-optionid="${select.optionsId}" value="${select.quantity}" />
                                            </li>`
                                        }).join("")}
                                    </ul>
                                    <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
                                    <button class="OrderButton">주문하기</button>
                                    `;

            
        }
    }

    this.$selected.addEventListener('change', e=> {
        //이벤트가 INPUT 태그에서 발생한 경우에만 처리
        if(e.target.tagName === 'INPUT'){
            try{
                const nextQuantity = parseInt(e.target.value);
                const nextSelectedOptions = [...this.state.selectedOptions];
                //input의 값이 숫자인 경우에만 처리하기
                if(typeof nextQuantity === 'number'){
                    const {product} = this.state;
                    const optionId = e.target.dataset.optionid;
                    const option = product.productOptions.find(option => option.id === parseInt(optionId));
                    const selectedOptionIndex = nextSelectedOptions.findIndex(selected => selected.optionsId === parseInt(optionId));
                    //INPUT에 입력한 값이 재고수량을 넘을 경우 재고수량으로 입력한 것으로 바꿔버리기
                    nextSelectedOptions[selectedOptionIndex].quantity = option.stock >= nextQuantity ? nextQuantity : option.stock;

                    this.setState({
                        ...this.state,
                        selectedOptions: nextSelectedOptions
                    })
                }
            }catch (e){
                throw new Error(e);
            }
        }
    });

    this.$selected.addEventListener("click", e => {
        if(e.target.className === "OrderButton"){
            const {selectedOptions} = this.state;
            //기존에 담겨진 장바구니 데이터가 있을 수 있으므로 가져와보고 없으면 빈배열 처리
            const cartData = getItem("products_cart", []);
            //장바구리 데이터 만들기
            setItem('products_cart', cartData.concat(selectedOptions.map(selected => (
                {
                        productId : selected.productId,
                        optionId : selected.optionsId,
                        quantity : selected.quantity 
                    }))//map
                ) //concat
            );//setItem

            //localStorage에 products_cart를 담고 장바구니로 이동
            routeChange('/web/cart');//화면 전환
        }
    });

    this.render();
}