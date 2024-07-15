import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './rangeslider.module.css'

const initialRanges = [
    [0, 210],
  [0, 210],
  [0, 210],
  [0, 210],
  [0, 210],
  [0, 210],
];

const StatsName = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Def.", "Speed"]

const MultiRangeSliderDropdown = ({setStatsfilter}) => {
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
    setStatsfilter(ranges)
    setIsOpen(false);
  };

  const resetChanges = () => {
    setRanges(initialRanges);
    setStatsfilter(initialRanges)
  };

  useEffect(()=>{
    setStatsfilter(initialRanges)
  },[])

  return (
    <div className="relative inline-block rounded-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 w-48 bg-[#C9DDE2] text-black rounded"
      >
        Open Sliders
      </button>
      {isOpen && (
        <div className={styles["rangecontainer"]}>
            <div className='font-bold text-lg'>
                Select Stats
            </div>
          {ranges.map((range, index) =>( 
            <div key={index} className='flex flex-row  justify-between items-center  w-full px-6'>
            <div className=''>{StatsName[index]}</div>
            <div  className={styles["rangeslider"]}>
                
                <label>{range[0]}</label>
                <div className='w-full flex flex-row items-center  '>
              <Slider
                className='text-[#C9DDE2]'
                range
                min={0}
                max={210}
                value={ranges[index]} // Use value prop instead of defaultValue
                onChange={(newRange) => handleRangeChange(index, newRange)}
                trackStyle={[{ backgroundColor: '#2E3156' }]} // Change track color
                handleStyle={[
                  { backgroundColor: '#2E3156' }, // Change handle color
                  { backgroundColor: '#2E3156' }, // Second handle if range slider
                ]}
              />
              </div>
              <label>{range[1]}</label>
            </div>
            </div>
          ))}
          <div className="flex flex-row justify-end mt-2">
            <div className='flex flex-row'>
            <button
              onClick={resetChanges}
              className="w-1/2 px-4 py-2 bg-white text-black border-[#2E3156] rounded-lg"
            >
              Reset
            </button>
            <button
              onClick={applyChanges}
              className="w-1/2 px-4 py-2 bg-[#2E3156]  text-white border-[#2E3156] rounded-lg ml-2"
            >
              Apply
            </button>
           
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiRangeSliderDropdown;
