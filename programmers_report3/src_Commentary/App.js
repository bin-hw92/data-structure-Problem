import Cartpage from "./components/CartPage.js";
import ProductDetailPage from "./components/ProductDetailPage.js";
import ProductListPage from "./components/ProductListPage.js";
import { init } from "./router.js";


export default function App({$app}){
    this.route = () => {
        const { pathname } = location;

        if(pathname === '/'){
            new ProductListPage({$app}).render();
        }else if(pathname.indexOf('/products/') === 0){
            const [, , productId] = pathname.split('/');
            new ProductDetailPage({
                $app,
                productId,
            }).render();
        }else if(pathname.indexOf('/cart') === 0){
            new Cartpage({
                $app
            }).render();
        }
    }

    //ROUTE_CHANGE 이벤트 발생 시 마다 App의 this.route 함수가 호출되게 하는 효과
    init(this.route);


    //뒤로가기, 앞으로가기 발생 시 popstate 이벤트가 발생합니다.
    window.addEventListener("popstate", this.route);

    this.route();
}