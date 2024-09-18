import { ReactNode } from "react";
import Link from "next/link";
import styles from "./GlobalLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
// import '@fontsource/jersey 15';
// import '@fontsource/jersey 15/400.css';

interface GlobalLayoutProps {
  children: ReactNode;
  isChoosen: boolean;
  setIsChoosen: (value: boolean) => void;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  isMildTranslation: boolean;
  setIsMildTranslation: (value: boolean) => void;
  
}

export default function GlobalLayout({
  children,
  isChoosen,
  setIsChoosen,
  isRecording, 
  setIsRecording,
  isMildTranslation,
  setIsMildTranslation
}: GlobalLayoutProps) {
  const resetState = () => {
    setIsChoosen(false);
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/home" onClick={resetState} className={isChoosen ? (isMildTranslation ? styles.navLink : styles.navLink_pro):styles.none}>
                {isMildTranslation ? "General" : "Professional"}
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
