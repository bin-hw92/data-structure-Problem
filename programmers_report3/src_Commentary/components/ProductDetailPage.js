import { request } from "../api.js";
import ProductDetail from "./ProductDetail.js";

export default function ProductDetailPage({$app, productId}){
    this.state = {
        productId,
        product: null
    }

    this.$page = document.createElement('div');
    this.$page.className = 'ProductListPage';

    this.$page.innerHTML = '<h1>상품 정보</h1>';


    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        if(!this.state.product){
            $app.innerHTML = "Loading...";
        }else{
            $app.innerHTML = "";
            $app.appendChild(this.$page);

            new ProductDetail({
                $app: this.$page,
                initialState : {
                    product : this.state.product,
                    //ProductDetail의 initialState에 선택된 상품들을 담아둘 selectedOptions 추가
                    selectedOptions: []
                }
            });
        }
    }

    this.fetchProduct = async () => {
        const {productId} = this.state;
        const product = await request(`/products/${productId}`);
        this.setState({
            ...this.state,
            product,
        })
    }

    this.fetchProduct();
}