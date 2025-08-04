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
    <style jsx>{`
      .menu-bar {
        width: 100%;
        background: #23232a;
        padding: 0.5rem 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      .menu-bar ul {
        display: flex;
        justify-content: center;
        gap: 2rem;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .menu-bar li a {
        color: #fafafa;
        font-weight: 500;
        font-size: 1.1rem;
        text-decoration: none;
        transition: color 0.2s;
      }
      .menu-bar li a:hover {
        color: #38bdf8;
      }
    `}</style>
  </nav>
);

export default MenuBar;