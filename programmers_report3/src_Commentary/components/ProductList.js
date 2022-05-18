import { routeChange } from "../utils/Router.js";


export default function ProductList({$app, initialState}){
    this.$ProductList = document.createElement('ul');
    $app.appendChild(this.$ProductList);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        if(!this.state){
            return;
        }
        this.$ProductList.innerHTML = `
                                    ${this.state.map(node => {
                                        return `
                                                <li class="Product" data-product-id="${node.id}">
                                                        <img src="${node.imageUrl}" >
                                                        <div class="Product__info">
                                                            <div>${node.name}</div>
                                                            <div>${node.price}~</div>
                                                        </div>
                                                </li>
                                                `
                                    }).join("")}
                                `;
    }

    this.$ProductList.addEventListener("click", (e) => {
        const $li = e.target.closest('li');
        const { productId } = $li.dataset;

        if(productId){
            routeChange(`/products/${productId}`);
        }
    });

    this.render();
}