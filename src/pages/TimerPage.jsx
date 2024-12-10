import React, { useState, useEffect } from "react";
import "./Timer.css";

const TimerPage = () => {
  const [isCountdown, setIsCountdown] = useState(false);
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [tab, setTab] = useState("stopwatch"); // Active tab: stopwatch, countdown, intervals
  const [records, setRecords] = useState([]); // Store lap/last record

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning) {
      if (tab === "countdown" && time > 0) {
        timer = setInterval(() => setTime((prev) => Math.max(prev - 1, 0)), 1000);
      } else if (tab === "stopwatch") {
        timer = setInterval(() => setTime((prev) => prev + 1), 1000);
      }
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time, tab]);

  // Reset logic
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  // Record logic
  const handleRecord = () => {
    setRecords([...records, time]);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer-page"  style={{ padding:"25px", }}>
      {/* Header */}
      <div className="header">
        <h2>Timer</h2>
      </div>

      {/* Timer Display */}
      <div className="timer-display">
        <div className="circle">
          <h1>{formatTime(time)}</h1>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="timer-controls">
        <button className="start-btn" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        {tab === "stopwatch" && (
          <button className="record-btn" onClick={handleRecord}>
            Record
          </button>
        )}
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={tab === "stopwatch" ? "active" : ""} onClick={() => setTab("stopwatch")}>
          Stopwatch
        </button>
        <button className={tab === "countdown" ? "active" : ""} onClick={() => setTab("countdown")}>
          Countdown
        </button>
        <button className={tab === "intervals" ? "active" : ""} onClick={() => setTab("intervals")}>
          Intervals
        </button>
      </div>

      {/* Records Section */}
      {tab === "stopwatch" && (
        <div className="records">
          <h3>Last Record</h3>
          {records.length > 0 ? (
            records.map((record, index) => (
              <div key={index} className="record">
                {formatTime(record)}
              </div>
            ))
          ) : (
            <p>No activity recorded</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TimerPage;
