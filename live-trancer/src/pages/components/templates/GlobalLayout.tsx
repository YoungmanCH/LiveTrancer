import { ReactNode } from "react";
import Link from "next/link";
import styles from "./GlobalLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

interface GlobalLayoutProps {
  children: ReactNode;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  isMildTranslation: boolean;
  setIsMildTranslation: (value: boolean) => void;
  
}

export default function GlobalLayout({
  children,
  isRecording, 
  setIsRecording,
  isMildTranslation,
  setIsMildTranslation
}: GlobalLayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                Logo
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/dashboard" className={styles.navLink}>
                {isMildTranslation ? "Mild Translation" : "Term Translation"}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/transcription" className={styles.navLink}>
                <FontAwesomeIcon
                  icon={faCog}
                  className={styles.mic}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      {/* <footer className={styles.footer}>
        <p>© 2024 LiveTrancer. version: 0.1.0</p>
      </footer> */}
    </div>
  );
}
