import { DUMMY_PRODUCTS } from "../dummy-products";
import Product from "./Product";

export default function Shop({ children }: any) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {children}
        {/* {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={handleAddItemToCart} />
          </li>
        ))} */}
      </ul>
    </section>
  );
}
