import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <div className={styles.logo}>LIVE TRANCER</div>
        <nav className={styles.navbar}>
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Products</a>
          <a href="#">News</a>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.centerPeople}></div>
        <div className={styles.centerPeopleContent}>
          <h1>REAL TIME</h1>
          <h1>VOICE CHANGER</h1>
          <p>Experience real-time voice transformation with the power of AI.</p>
        </div>
      </main>
    </div>
  );
}
