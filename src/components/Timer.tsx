import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState<number>(300); 
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); 

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  const pauseTimer = () => {
    if (isActive) {
      setIsActive(false);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(300); 
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isActive && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false); 
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  return (
    <div className="ml-[30px] w-full flex flex-row item-center mt-[5px]">
      <div className="bg-cream text-[#256B4A] rounded-2xl p-1 w-20 flex justify-center item-center font-semibold">
        {formatTime(time)}
      </div>
      <button onClick={isActive ? pauseTimer : startTimer} className="w-[30px] ml-[10px]">
        <img src={isActive ? "./pause.png" : "./play.png"} alt={isActive ? "Pause" : "Play"} />
      </button>
      <button onClick={resetTimer} className="w-[30px] ml-[5px]">
        <img src="./reset.png" alt="Reset" />
      </button>
    </div>
  );
};

export default CountdownTimer;
