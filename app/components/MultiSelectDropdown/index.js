import React, { useState, useEffect } from "react";
import styles from "./checkbox.module.css";

const MultiSelectDropdown = ({ options, name, selectedItems, onSelectionChange }) => {
  const [allSelectedItems, setAllSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (value) => {
    const isSelected = allSelectedItems.includes(value);
    const newSelectedItems = isSelected
      ? allSelectedItems.filter(item => item !== value)
      : [...allSelectedItems, value];

    setAllSelectedItems(newSelectedItems);
    onSelectionChange(newSelectedItems);
  };

  useEffect(() => {}, [options]);

  const selectedOptionsText = allSelectedItems.length > 1
    ? (
      <>
        {allSelectedItems.slice(0, 1).join(", ")}
        {" "}
        <span className="font-bold">+{allSelectedItems.length - 1} more</span>
      </>
    )
    : (allSelectedItems.length > 0 ? allSelectedItems.join(", ") : `Select ${name}`);


  return (
    <div className="relative w-48">
      <button
        className="bg-[#C9DDE2]  px-4 py-2 rounded-md w-48 "
        type="button"
        onClick={handleToggle}
      >
       {selectedOptionsText}
      </button>
      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded-md mt-2 w-48 max-h-60 overflow-y-auto shadow-lg z-10">
          {options.map((option) => (
            <li key={option} className="p-2 hover:bg-gray-100 w-full">
              <label className={styles['menu-text']}>
                <input
                  className="mr-2"
                  type="checkbox"
                  value={option}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
