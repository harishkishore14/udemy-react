import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext: any = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state: any, action: any) {
  if (action.type === "ADD_ITEM") {
    const updatedItems: any = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem: any) => cartItem.id === action.payload
    );
    const existingCartItem: any = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product: any = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state, //not needed here because we have only one value
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems: any = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item: any) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state, //not needed here because we have only one value
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }: any) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });

  function handleAddItemToCart(id: any) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
    // setShoppingCart((prevShoppingCart) => {
    //   const updatedItems: any = [...prevShoppingCart.items];

    //   const existingCartItemIndex = updatedItems.findIndex(
    //     (cartItem: any) => cartItem.id === id
    //   );
    //   const existingCartItem: any = updatedItems[existingCartItemIndex];

    //   if (existingCartItem) {
    //     const updatedItem = {
    //       ...existingCartItem,
    //       quantity: existingCartItem.quantity + 1,
    //     };
    //     updatedItems[existingCartItemIndex] = updatedItem;
    //   } else {
    //     const product: any = DUMMY_PRODUCTS.find(
    //       (product) => product.id === id
    //     );
    //     updatedItems.push({
    //       id: id,
    //       name: product.title,
    //       price: product.price,
    //       quantity: 1,
    //     });
    //   }

    //   return {
    //     items: updatedItems,
    //   };
    // });
  }

  function handleUpdateCartItemQuantity(productId: any, amount: any) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
    // setShoppingCart((prevShoppingCart) => {
    //   const updatedItems: any = [...prevShoppingCart.items];
    //   const updatedItemIndex = updatedItems.findIndex(
    //     (item: any) => item.id === productId
    //   );

    //   const updatedItem = {
    //     ...updatedItems[updatedItemIndex],
    //   };

    //   updatedItem.quantity += amount;

    //   if (updatedItem.quantity <= 0) {
    //     updatedItems.splice(updatedItemIndex, 1);
    //   } else {
    //     updatedItems[updatedItemIndex] = updatedItem;
    //   }

    //   return {
    //     items: updatedItems,
    //   };
    // });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
