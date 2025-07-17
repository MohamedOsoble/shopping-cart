import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import styles from "./index.module.css";
import { getProducts } from "../products/products";
import { useState } from "react";

const Index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [data, error, loading] = getProducts();
  return (
    <div>
      <Navbar />
      <div className={styles.padding}></div>
      <Outlet context={[data, error, loading, cartItems, setCartItems]} />
    </div>
  );
};

export default Index;
