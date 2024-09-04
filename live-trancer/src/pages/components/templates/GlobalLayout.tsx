import { ReactNode } from "react";
import Link from "next/link";
import styles from "./GlobalLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneAlt } from "@fortawesome/free-solid-svg-icons";

interface GlobalLayoutProps {
  children: ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/dashboard" className={styles.navLink}>
                LiveTrancer
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/transcription" className={styles.navLink}>
                <FontAwesomeIcon
                  icon={faMicrophoneAlt}
                  className={styles.mic}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2024 LiveTrancer. version: 0.1.0</p>
      </footer>
    </div>
  );
}
