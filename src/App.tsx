import Header from "./component/Header";
import Shop from "./component/Shop";
import { DUMMY_PRODUCTS } from "./dummy-products";
import Product from "./component/Product";
import CartContextProvider from "./store/shopping-cart-context";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
