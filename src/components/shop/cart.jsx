import { getProducts } from "../products/products";
import { useOutletContext } from "react-router-dom";
import styles from "../products/products.module.css";

const manageCart = () => {
  return cartItems;
};

const Cart = () => {
  const [data, error, loading, cartItems, setCartItems] = useOutletContext();

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
    console.log(item, id);

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
    console.log(item, id);

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
