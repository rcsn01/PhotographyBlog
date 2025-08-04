import React from 'react';
import Link from 'next/link';

const menuItems = [
  { label: 'Ivan', href: '/' },
  { label: 'Dev', href: '/dev' },
  { label: 'Raw', href: '/raw' },
  // Remove or fix the info link:
  // { label: 'info', href: '#' },
];

const MenuBar: React.FC = () => (
  <nav className="menu-bar">
    <ul>
      {menuItems.map((item) => (
        <li key={item.label}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default MenuBar;