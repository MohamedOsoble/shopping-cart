import { useEffect, useState } from "react";
import styles from "./products.module.css";
import { useOutletContext } from "react-router-dom";

const getProducts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setData(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return [data, error, loading];
};

const Products = () => {
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

  const renderButtons = (inCart, product) => {
    if (inCart) {
      return (
        <>
          <button id={product.id} onClick={handleAdd}>
            +
          </button>
          <button id={product.id} onClick={handleRemove}>
            -
          </button>
          <p>{inCart.quantity}</p>
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

  const productCard = (product) => {
    const inCart = isItemInCart(product.id);

    return (
      <div id={product.id} key={product.id} className={styles.card}>
        <h1 className={styles.title}>{product.title}</h1>
        <img className={styles.image} src={product.image}></img>
        <p>
          {product.price.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
          })}
        </p>
        {renderButtons(inCart, product)}
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <div className={styles.container}>
      {data.map((product) => {
        return productCard(product);
      })}
    </div>
  );
};

export { Products, getProducts };
