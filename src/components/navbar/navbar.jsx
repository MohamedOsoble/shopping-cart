import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.link} to="/">
        Home
      </Link>
      <Link className={styles.link} to="shop">
        Shop
      </Link>
      <Link className={styles.link} to="cart">
        Cart
      </Link>
    </nav>
  );
};

export default Navbar;
