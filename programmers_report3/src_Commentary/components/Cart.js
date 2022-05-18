import { routeChange } from "../utils/router";
import { removeItem } from "../utils/storage";


export default function Cart({$app, initialState}){
    this.state = initialState;
    this.$cart = document.createElement('div');
    this.$cart.className = "Cart";

    $app.appendChild(this.$cart);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.getTotalPrice = () => {
        return this.state.reduce((acc, option) => acc + ((option.productPrice + option.optionPrice) * option.quantity), 0);
    }

    this.render = () => {
        this.$cart.innerHTML = `
                            <ul>
                                ${this.state.map(item => {
                                    `
                                    <li class="Cart__item">
                                        <img src="${item.imageUrl}">
                                        <div class="cart__itemDescription>
                                            <div>${item.productName} ${item.optionName} ${item.quantity}개</div>
                                            <div>${item.productPrice + item.optionPrice}원</div>
                                        </div>
                                    </li>
                                    `
                                }).join("")}
                                <div class="Cart__totalPrice">총 상품가격 ${this.getTotalPrice()}</div>
                                <button class="OrderButton">주문하기</button>
                            </ul>
                            `;
        return this.$cart
    }

    this.$cart.addEventListener("click", e => {
        if(e.target.className === "OrderButton"){
            alert("주문 되었습니다!");
            removeItem("products_cart");
            routeChange("/");//목록으로 이동
        }
    });

    this.render();
}