"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (!isActive && timeLeft === 0 && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused, timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 dark:bg-red-900">
      <div className="bg-white dark:bg-red-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-red-800 dark:text-red-200 text-center">
          Timer
        </h1>
        <div className="flex items-center mb-6">
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="Set duration in seconds"
            className="flex-1 mr-4 rounded-md border-red-300 dark:border-red-600 dark:bg-red-700 dark:text-black-200"
          />
          <Button
            onClick={handleSetDuration}
            className="text-orange-800 dark:text-red-200 border border-red-300 dark:border-black-600 px-4 py-2 rounded-md"
          >
            Set
          </Button>
        </div>
        <div className="text-6xl font-bold text-green-800 dark:text-black-200 mb-8 text-center">
          {timeLeft} seconds
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            className="text-red-800 dark:text-red-200 border border-red-300 dark:border-black-600 px-4 py-2 rounded-md"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            className="text-red-800 dark:text-red-200 border border-red-300 dark:border-yellow-600 px-4 py-2 rounded-md"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            className="text-red-800 dark:text-red-200 border border-red-300 dark:border-yellow-600 px-4 py-2 rounded-md"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
