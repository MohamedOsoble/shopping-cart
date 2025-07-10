import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.section}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="shop">Shop</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.section}>
              <input type="text" placeholder="Search..."></input>
              <button type="submit" className={styles.button}>
                Search
              </button>
            </div>
          </li>
          <li className={styles.item}>
            <Link to="cart">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
