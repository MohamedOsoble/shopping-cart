import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import styles from "./index.module.css";
import { getProducts } from "../products/products";
import { useState } from "react";

const Index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [data, error, loading] = getProducts();

  const renderButtons = (inCart, product) => {
    const item = getCartItem(product.id);

    if (inCart) {
      const itemTotal = item.quantity * item.price;
      return (
        <>
          <button id={product.id} onClick={handleAdd}>
            +
          </button>
          <button id={product.id} onClick={handleRemove}>
            -
          </button>
          <p>
            <strong>Quanity: </strong>
            {inCart.quantity}
          </p>
          <p>
            <strong>Total: </strong>
            {itemTotal.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })}
          </p>
        </>
      );
    } else {
      return (
        <>
          <button id={product.id} onClick={handleAdd}>
            Add to Cart
          </button>
        </>
      );
    }
  };

  const getCartItem = (id) => {
    return cartItems.find((item) => item.id == id);
  };

  const getItem = (id) => {
    return data.find((item) => item.id == id);
  };

  const isItemInCart = (id) => {
    return cartItems.find((cartItem) => cartItem.id == id);
  };

  const handleAdd = (e) => {
    const id = e.currentTarget.getAttribute("id");
    const item = getItem(id);
    const inCart = isItemInCart(id);

    if (inCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id == id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemove = (e) => {
    const id = e.currentTarget.getAttribute("id");
    const item = getItem(id);
    const inCart = isItemInCart(id);

    if (inCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.padding}></div>
      <Outlet
        context={[
          data,
          error,
          loading,
          cartItems,
          setCartItems,
          renderButtons,
          isItemInCart,
          handleAdd,
          handleRemove,
        ]}
      />
    </div>
  );
};

export default Index;
