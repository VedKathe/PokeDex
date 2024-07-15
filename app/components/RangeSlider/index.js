import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const initialRanges = [
  [0, 50],
  [10, 60],
  [20, 70],
  [30, 80],
  [40, 90],
  [50, 100],
];

const StatsName = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Def.", "Speed"]

const MultiRangeSliderDropdown = () => {
  const [ranges, setRanges] = useState(initialRanges);
  const [isOpen, setIsOpen] = useState(false);

  const handleRangeChange = (index, newRange) => {
    const updatedRanges = ranges.map((range, i) =>
      i === index ? newRange : range
    );
    setRanges(updatedRanges);
  };

  const applyChanges = () => {
    // Handle apply logic here
    console.log('Applied ranges:', ranges);
    setIsOpen(false);
  };

  const resetChanges = () => {
    setRanges(initialRanges);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 w-48 bg-blue-500 text-white rounded"
      >
        Open Sliders
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-98 bg-white border border-gray-300 rounded shadow-lg p-4">
          {ranges.map((range, index) =>( 
            <div key={index} className='flex flex-row grow justify-evenly w-full px-6'>
            <div className='w-100'>{StatsName[index]}</div>
            <div  className="mb-4 flex flex-row gap-2 border-2 rounded-lg grow  mx-10 w-full  items-center p-2">
                
                <label>{range[0]}</label>
              <Slider
                range
                min={0}
                max={100}
                value={ranges[index]} // Use value prop instead of defaultValue
                onChange={(newRange) => handleRangeChange(index, newRange)}
              />
              <label>{range[1]}</label>
            </div>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              onClick={applyChanges}
              className="w-1/2 px-4 py-2 bg-green-500 text-white rounded mr-2"
            >
              Apply
            </button>
            <button
              onClick={resetChanges}
              className="w-1/2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiRangeSliderDropdown;
