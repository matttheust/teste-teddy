import React, { useState } from 'react';
import './Dropdown.css';

interface DropdownProps {
  options: number[];
  selected: number;
  onChange: (value: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        Clientes por página: {selected}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option} onClick={() => { onChange(option); setIsOpen(false); }}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;