import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}> Welcome to my store</h1>
      <p className={styles.content}>
        {" "}
        Feel free to look around.. we have plenty of products
      </p>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <p>Some card with some link or something</p>
        </div>
        <div className={styles.card}>
          <p>Some other card with some other link or something</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
