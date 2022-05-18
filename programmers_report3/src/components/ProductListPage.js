import { comma } from "../utils/common.js";
import { routeChange } from "../utils/Router.js";


export default function ProductListPage({$app}){
    this.$page = document.createElement('div');
    this.$page.className = 'ProductListPage';
    this.$page.innerHTML = '<h1>상품 목록</h1>';

    this.$productList = document.createElement('ul');

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $app.innerHTML = '';
        $app.appendChild(this.$page);

        this.$productList.innerHTML = this.state.map(product => {
                                                        return `<li class="Product" data-product-id="${product.id}">
                                                                        <img src="${product.imageUrl}" >
                                                                        <div class="Product__info">
                                                                            <div>${product.name}</div>
                                                                            <div>${comma(product.price)}~</div>
                                                                        </div>
                                                                </li>`}).join("");
        this.$page.appendChild(this.$productList);
    }

    this.$productList.addEventListener("click", (e) => {
        const $li = e.target.closest('li');
        const { productId } = $li.dataset;

        if(productId){
            routeChange(`/web/products/${productId}`); //다음 화면 호출
        }
    });
}