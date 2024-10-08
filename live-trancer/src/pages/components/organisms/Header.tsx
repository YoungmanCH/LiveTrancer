import Link from 'next/link';
import { forwardRef } from "react";
import styles from './Header.module.css';

const Headerfhosadhiofo = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <header className={styles.header} ref={ref}>
      <div className={styles.logo}>LIVE TRANCER</div>
      <nav className={styles.navbar}>
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/products">Products</Link>
        <Link href="/news">News</Link>
      </nav>
    </header>
  );
});

Headerfhosadhiofo.displayName = "Header";

export default Headerfhosadhiofo;
