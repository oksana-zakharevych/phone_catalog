import React, { useState, useRef, useEffect } from 'react';
import styles from './DropdownSelect.module.scss';

type Props = {
  options: (string | number)[];
  label?: string;
  className?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
};

export const DropdownSelect: React.FC<Props> = ({
  options = [],
  label = '',
  className = '',
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState(options.length > 0 ? options[0] : '');
  const selected = value !== undefined ? value : internalSelected;

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string | number) => {
    if (value === undefined) {
      setInternalSelected(option);
    }
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} ${className}`} ref={dropdownRef}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.wrapper}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.button} ${isOpen ? styles.open : ''}`}
        >
          <span>{selected}</span>
          <svg
            className={`${styles.icon} ${isOpen ? styles.rotate : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <ul className={styles.menu}>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`${styles.item} ${selected === option ? styles.selected : ''}`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};