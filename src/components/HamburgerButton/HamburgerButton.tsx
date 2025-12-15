'use client';

import { useState, useEffect } from 'react';
import styles from './HamburgerButton.module.css';

type HamburgerButtonProps = {
  onClick: () => void;
  isOpen: boolean;
  ariaLabel?: string;
};

export default function HamburgerButton({
  onClick,
  isOpen,
  ariaLabel = isOpen ? 'Zamknij menu' : 'Otwórz menu'
}: HamburgerButtonProps) {
  // Zabezpieczenie przed scrollowaniem body (opcjonalne, ale często potrzebne)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''; // ✅ naprawione: .body, nie /body
    }

    // Czyszczenie przy odmontowaniu
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <button
      className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
    >
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </button>
  );
}