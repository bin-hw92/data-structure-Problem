import Cartpage from "./components/CartPage.js";
import ProductDetailPage from "./components/ProductDetailPage.js";
import ProductListPage from "./components/ProductListPage.js";
import { init } from "./utils/Router.js";
import { request } from "./api.js";


export default function App({$app}){
    this.state = {
        productId : null,
        product: null,
        selectedOptions : [],
    }
    //1차 작업
    /* 
    this.productList = new ProductListPage({$app});
    this.productDetail = new ProductDetailPage({$app, productId: this.state.productId});

    this.setPructs = async (key, option) => {
        if(key === 'list'){
            const products = await request('/products');
            this.productList.setState(products); //목록 호출
        }else if(key === 'detail'){
            this.state.productId = option;
            const product = await request(`/products/${option}`);
            this.productDetail.setState({
                ...this.state,
                product: product,
            });
        }else if(key === 'cart'){
            new Cartpage({$app}).fetchProducts(); //장바구니 이동시에만 새롭게 js를 호출해줌
        }
    }
    
    */
    //최종 수정
    //다른 부분은 다 똑같고,  처음에 app을 불러올때 선언했던 LIST, DETAIL을 해당 페이지 갈때마다 새롭게 선언해주는 방식으로 변경
    //해당 방식이 더 효율이 좋은 것 같습니다.
    this.route = () => {
        const { pathname } = location;
        if(pathname === '/web/'){
            this.setPructs('list'); //list 페이지 api 호출
        }else if(pathname.indexOf('/web/products/') === 0){
            const [, , , productId] = pathname.split('/');
            this.setPructs('detail', productId); //detail 페이지 api 호출
        }else if(pathname.indexOf('/web/cart') === 0){
            this.setPructs('cart');
        }
    }

    //ROUTE_CHANGE 이벤트 발생 시 마다 App의 this.route 함수가 호출되게 하는 효과
    init(this.route);

    this.setPructs = async (key, option) => {
        if(key === 'list'){
            const products = await request('/products');
            new ProductListPage({$app}).setState(products); //목록 호출
        }else if(key === 'detail'){
            const product = await request(`/products/${option}`);
            new ProductDetailPage({$app, productId: option}).setState({
                ...this.state,
                product: product,
            });
        }else if(key === 'cart'){
            new Cartpage({$app}).fetchProducts(); //장바구니 이동시에만 새롭게 js를 호출해줌
        }

    }

    //뒤로가기, 앞으로가기 발생 시 popstate 이벤트가 발생합니다.
    window.addEventListener("popstate", this.route);

    this.route();
}