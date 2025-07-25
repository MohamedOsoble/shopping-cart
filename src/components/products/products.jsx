import { useEffect, useState } from "react";
import styles from "./products.module.css";
import { useOutletContext, Link } from "react-router-dom";

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

  const productCard = (product) => {
    const inCart = isItemInCart(product.id);
    const productLink = "/item/" + product.id.toString();

    return (
      <div id={product.id} key={product.id} className={styles.card}>
        <Link to={productLink}>
          <h1 className={styles.title}>{product.title}</h1>
          <img className={styles.image} src={product.image}></img>
        </Link>

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
