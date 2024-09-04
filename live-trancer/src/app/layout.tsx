import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './styles/layout.module.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={styles.body}>
        <div className={styles.container}>
          <header className={styles.header}>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Link href="/dashboard" className={styles.navLink}>
                    LiveTrancer
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            <p>© 2024 LiveTrancer. version: 0.0.1</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
