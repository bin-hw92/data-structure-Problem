import { request } from "../api.js";
import { comma } from "../utils/common.js";
import { routeChange } from "../utils/Router.js";
import { getItem, removeItem } from "../utils/Storage.js"

export default function CartPage ({$app}) {
    this.$Cart = document.createElement("div");
    this.$Cart.className = "CartPage";

    const cartData = getItem("products_cart", []);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.fetchProducts = async () => {
        //Promise는 -> 비동기 처리를 의미하므로, 아래 같은 경우 request가 다 이뤄지기 전까지 기다린다는 의미 배열로 넣어야하기 때문에 all 과 map으로 처리
        const products = await Promise.all(cartData.map(async (cartItem) => {
            const product = await request(`/products/${cartItem.productId}`); //이미지는 따로 등록되어있지 않기 때문에 api를 통해 해당 id 값들을 가지고 옴
            const selectedOption = product.productOptions.find(option => option.id === cartItem.optionId);

            return {
                imageUrl : product.imageUrl,
                productName : product.name,
                quantity: cartItem.quantity,
                productPrice : product.price,
                opitonName : selectedOption.name,
                optionPrice : selectedOption.price
            }
        }));

        this.setState({products});
    }
    this.render = () => {
        if(cartData.length === 0){
            alert('장바구니가 비어 있습니다.');
            routeChange("/web/"); //목록으로 돌려보내기
        }else{
            $app.innerHTML = "";
            $app.appendChild(this.$Cart);
            const header = "<h1>장바구니</h1>";
            const CartTemplates = `
                                <div class="Cart">
                                   <ul>
                                    ${this.state.products.map(cart => {
                                       return `
                                            <li class="Cart__item">
                                                <img src="${cart.imageUrl}">
                                                <div class="Cart__itemDesription">
                                                <div>${cart.productName} ${cart.opitonName} ${comma(cart.productPrice)}원 ${cart.quantity}개</div>
                                                <div>${comma((cart.productPrice + cart.optionPrice))}원</div>
                                                </div>
                                        </li>
                                        `
                                    }).join("")}
                                   </ul>
                                   <div class="Cart__totalPrice">
                                   총 상품가격 ${this.getTotalPrice()}원
                                 </div>
                                 <button class="OrderButton">주문하기</button>
                                </div>
                                `;
            this.$Cart.innerHTML = header + CartTemplates;
        }
    }

    this.getTotalPrice = () => {
        return comma(this.state.products.reduce((acc, option) => acc + ((option.productPrice + option.optionPrice) * option.quantity), 0));
    }
    
    this.$Cart.addEventListener("click", e => {
        if(e.target.className === "OrderButton"){
            alert("주문 되었습니다.");
            removeItem("products_cart");
            routeChange("/web/");//목록으로 이동
        }
    });
}