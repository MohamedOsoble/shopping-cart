import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import styles from "./index.module.css";

const Index = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.padding}></div>
      <Outlet />
    </div>
  );
};

export default Index;
