import { request } from "../api.js";
import ProductList from "./ProductList.js";


export default function ProductListPage({$app}){
    this.$page = document.createElement('div');
    this.$page.className = 'ProductListPage';

    this.$page.innerHTML = '<h1>상품 목록</h1>';

    this.render = () => {
        $app.appendChild(this.$page);
    }

    this.setState = (nextState) => {
        this.state = nextState;

        
        this.productList = new ProductList({
            $app : this.$page,
            initialState : this.state
        });
    }

    const fetchProducts = async () => {
        const products = await request('/products');
        this.setState(products);
    }


    //페이지 생성 시 API 요청해오도록 처리
    fetchProducts();
}