import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './MenuBar.module.css';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Project', href: '/dev' },
  { label: 'Gallery', href: '/raw' },
];

const MenuBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.menuBar}>
      <ul className={styles.menuList}>
        {menuItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <li key={item.label} className={styles.menuItem}>
              <Link
                href={item.href}
                className={`${styles.menuLink} ${isActive ? styles.activeLink : ''}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MenuBar;
