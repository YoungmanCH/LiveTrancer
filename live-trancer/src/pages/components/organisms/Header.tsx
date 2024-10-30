import Link from 'next/link';
import { forwardRef } from "react";
import styles from './Header.module.css';

const Headerfhosadhiofo = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <header className={styles.header} ref={ref}>
      <Link href="/home" className={styles.logo}>LIVE TRANCER</Link>
      <nav className={styles.navbar}>
        <Link href="/home">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/apis">APIs</Link>
        <Link href="/news">News</Link>
      </nav>
    </header>
  );
});

Headerfhosadhiofo.displayName = "Header";

export default Headerfhosadhiofo;
