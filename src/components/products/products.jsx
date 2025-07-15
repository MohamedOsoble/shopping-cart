import { useEffect, useState } from "react";
import styles from "./products.module.css";

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

  return { data, error, loading };
};

const productCard = (product) => {
  return (
    <div key={product.id} className={styles.card}>
      <h1 className={styles.title}>{product.title}</h1>
      <img className={styles.image} src={product.image}></img>
      <p>£{product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

const Products = () => {
  const { data, error, loading } = getProducts();

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

export default Products;
