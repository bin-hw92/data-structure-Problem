import { routeChange } from "../router";
import { getItem } from "./storage";
import { request } from "../api.js";
import Cart from "./Cart";

export default function Cartpage({$app}){
    this.$page = document.createElement('div');
    this.$page.className = "CartPage";

    this.$page.innerHTML = "<h1>장바구니</h1>";

    let cartComponent = null;

    const cartData = getItem("products_cart", []);
    this.state = {
        products: null
    }

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        if(cartData.length === 0){
            alert('장바구니가 비어있습니다.');
            routeChange("/"); //다시 목록으로 이동
        }else{
            $app.appendChild(this.$page); 
            //Cart 컴포넌트 생성
            if(this.state.products && !cartComponent){
                cartComponent = new Cart({
                    $app : this.$page,
                    initialState : this.state.products
                });
            }
        }
    }

    this.fetchProducts = async () => {
        //Promise는 -> 비동기 처리를 의미하므로, 아래 같은 경우 request가 다 이뤄지기 전까지 기다린다는 의미
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

    this.fetchProducts();
}