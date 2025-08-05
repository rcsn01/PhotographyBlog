import React from 'react';
import Link from 'next/link';
import styles from './MenuBar.module.css';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Project', href: '/dev' },
  { label: 'Gallery', href: '/raw' },
];

const MenuBar: React.FC = () => (
  <nav className={styles.menuBar}>
    <ul className={styles.menuList}>
      {menuItems.map((item) => (
        <li key={item.label} className={styles.menuItem}>
          <Link href={item.href} className={styles.menuLink}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default MenuBar;
