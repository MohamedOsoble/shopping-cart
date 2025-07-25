import { getProducts } from "../products/products";
import { useOutletContext } from "react-router-dom";
import styles from "../products/products.module.css";
import { useNavigate } from "react-router-dom";

const manageCart = () => {
  return cartItems;
};

const Cart = () => {
  const [
    data,
    error,
    loading,
    cartItems,
    setCartItems,
    renderButtons,
    isItemInCart,
    handleAdd,
    handleRemove,
  ] = useOutletContext();
  let navigate = useNavigate();

  const clearCart = () => {
    setCartItems([]);
  };

  const itemCard = (item) => {
    const itemTotal = item.quantity * item.price;
    return (
      <div id={item.id} key={item.id} className={styles.card}>
        <h1 className={styles.title}>{item.title}</h1>
        <img className={styles.image} src={item.image}></img>
        <p>
          {item.price.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
          })}
        </p>
        <p>
          Item total:{" "}
          {itemTotal.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
          })}
        </p>
        <>
          <button id={item.id} onClick={handleAdd}>
            +
          </button>
          <button id={item.id} onClick={handleRemove}>
            -
          </button>
          <p>Quantity: {item.quantity}</p>
        </>
      </div>
    );
  };

  const getCartTotal = () => {
    let total = 0;
    cartItems.forEach((item) => (total = total + item.price * item.quantity));
    return total;
  };

  const checkOut = () => {
    clearCart();
    alert(
      "If the store actually worked, this would be the end of the process!"
    );
    navigate("/");
  };

  if (cartItems.length < 1) return <div>There are no items in your cart</div>;
  return (
    <div>
      {cartItems.map((item) => {
        return itemCard(item);
      })}
      <p>
        Your cart total is:{" "}
        {getCartTotal().toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
        })}
      </p>
      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={checkOut}>Checkout</button>
    </div>
  );
};

export { Cart, manageCart };
