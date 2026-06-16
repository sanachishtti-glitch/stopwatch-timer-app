
"use client";

import React, { useState, useEffect, useRef } from "react";

export default function ProfessionalApp() {
  const [activeTab, setActiveTab] = useState<"timer" | "stopwatch">("stopwatch");

  // bg
// 07393c
// 2A5A5d
// upbg
// 90ddf0
// 187176
  return (
    <div className="min-h-screen bg-[#0a3d40] text-black flex flex-col items-center py-10 px-4 font-sans">
      {/* Header / Tabs */}
      <div className="w-full max-w-md bg-[#187176] p-2 rounded-2xl flex justify-center mb-10 shadow-xl border border-[#187176]">
        <button
          onClick={() => setActiveTab("timer")}
          className={`w-1/2 py-3 rounded-xl text-sm md:text-base font-bold transition-all duration-300 ${
            activeTab === "timer"
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
              : "text-black hover:text-gray-200"
          }`}
        >
        Timer (Countdown)
        </button>
        <button
          onClick={() => setActiveTab("stopwatch")}
          className={`w-1/2 py-3 rounded-xl text-sm md:text-base font-bold transition-all duration-300 ${
            activeTab === "stopwatch"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
              : "text-white hover:text-purple-200"
          }`}
        >
         Stopwatch
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-md">
        {activeTab === "timer" ? <TimerModule /> : <StopwatchModule />}
      </div>
    </div>
  );
}

// --- Component 1: Timer (Countdown) ---
function TimerModule() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimeSet = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds === 0) return;
    setTimeLeft(totalSeconds);
    setIsActive(false);
  };

  const startTimer = () => {
    if (timeLeft === null || timeLeft <= 0) return;
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    stopTimer();
    setTimeLeft(null);
  };

  useEffect(() => {
    if (isActive && timeLeft && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert("Time's up!");
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const formatDisplay = (secs: number | null) => {
    if (secs === null) return "00:00:00";
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#187176] rounded-3xl p-8 shadow-2xl border border-[#0a3d40] flex flex-col items-center gap-6">
      <div className="w-full bg-gray-500 rounded-xl py-4 md:py-6 text-center border-4 border-[#0a3d40] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]">
         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"> 


          {formatDisplay(timeLeft)}
        </h2>
      </div>





      {!isActive && timeLeft === null && (
        <div className="grid grid-cols-3 gap-2 w-full">
          <InputBox label="Hr" value={hours} setValue={setHours} max={23} />
          <InputBox label="Min" value={minutes} setValue={setMinutes} max={59} />
          <InputBox label="Sec" value={seconds} setValue={setSeconds} max={59} />
          <button 
            onClick={handleTimeSet}
            className="col-span-3 bg-[#0a3d40] hover:bg-[#0a3d40] py-2 rounded-lg text-white mt-2 transition"
          >
            Set Time
          </button>
        </div>
      )}

      {(isActive || timeLeft !== null) && (
        <div className="flex gap-4 w-full">
          <button
            onClick={isActive ? stopTimer : startTimer}
            className={`flex-1 py-4 rounded-xl font-bold text-xl shadow-lg transition transform active:scale-95 ${
              isActive 
                ? "bg-red-500 hover:bg-red-500 text-white" 
                : "bg-green-600 hover:bg-green-600 text-white"
            }`}
          >
            {isActive ? "Stop" : " Start"}
          </button>
          <button
            onClick={resetTimer}
            className="flex-1 py-4 rounded-xl bg-[#0a3d40] hover:bg-[#2a5a5b] text-white font-bold text-xl shadow-lg transition transform active:scale-95"
          >
             Reset
          </button>
        </div>
      )}
    </div>
  );
}

function InputBox({ label, value, setValue, max }: any) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-white mb-1">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => {
            let val = parseInt(e.target.value);
            if(val > max) val = max;
            setValue(val);
        }}
        className="w-full bg-gray-500 text-white text-center py-3 rounded-lg border border-[#0a3d40] outline-none text-xl shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]"
      />
    </div>
  );
}

// --- Component 2: Stopwatch (FIXED) ---
function StopwatchModule() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const startStop = () => setIsRunning(!isRunning);
  
  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const mill = Math.floor((ms % 1000) / 10);
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${mill.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#187176] rounded-3xl p-8 shadow-2xl border border-[#187176] flex flex-col items-center gap-6">
      {/* Circular Progress UI */}
      <div className="relative w-64 h-64 flex items-center justify-center rounded-full bg-gray-500 border-8 border-[#0a3d50] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        
        {/* Rotating Indicator Ring - FIXED HERE */}
        <div 
          className="absolute w-full h-full rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin"
          style={{ 
            animationDuration: '1s',
            // YEH LINE IMPORTANT HAI - Jab stop karein to yahan ruk jayega
            animationPlayState: isRunning ? 'running' : 'paused'
          }}
        />
        
        <div className="z-10 text-center">
            <h2 className="text-4xl font-mono font-bold text-white drop-shadow-md">
                {formatTime(time)}
            </h2>
            <p className="text-white-200 text-sm mt-2 uppercase tracking-widest">
                {isRunning ? "Running" : "Paused"}
            </p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <button
            onClick={startStop}
            className={`py-4 rounded-xl font-bold text-xl shadow-lg transition transform active:scale-95 ${
                isRunning 
                ? "bg-red-500 hover:bg-red-500 text-white" 
                : "bg-green-600 hover:bg-green-600 text-white"
            }`}
        >
            {isRunning ? "Stop" : "Start"}
        </button>
        <button
            onClick={reset}
            className="py-4 rounded-xl bg-[#0a3d50] hover:bg-[#2a5a5b] text-white font-bold text-xl shadow-lg transition transform active:scale-95"
        >
            Reset
        </button>
      </div>
    </div>
  );
}

