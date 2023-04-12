import React from 'react';

interface ColorSelectProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorSelect = ({ colors, selectedColor, onColorChange }: ColorSelectProps) => {
    return (
        <div>
            <label htmlFor="color-select">Filter by color:</label>
            <select
                id="color-select"
                value={selectedColor}
                onChange={(e) => onColorChange(e.target.value)}
            >
            <option value="">All</option>
                {colors.map((color) => (
                <option key={color} value={color}>
                    {color}
                </option>
                ))}
            </select>
        </div>
    );
};

export default ColorSelect;
