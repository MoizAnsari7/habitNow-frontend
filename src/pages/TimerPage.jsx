import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";

const TimerPage = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [tab, setTab] = useState("stopwatch"); // Active tab: stopwatch, countdown, intervals
  const [records, setRecords] = useState([]); // Store lap/last record
  const [selectedSound, setSelectedSound] = useState("default-alarm"); // Default alarm sound
  const alarmAudioRef = useRef(null);

  // Predefined sounds
  const sounds = [
    { id: "default-alarm", label: "Default Alarm", src: "/sounds/default-alarm.mp3" },
    { id: "chime", label: "Chime", src: "/sounds/chime.mp3" },
    { id: "beep", label: "Beep", src: "/sounds/beep-01a.wav" },
  ];

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

    if (tab === "countdown" && time === 0 && isRunning) {
      handleAlarm(); // Trigger alarm when countdown reaches zero
      setIsRunning(false); // Stop the timer
    }

    return () => clearInterval(timer);
  }, [isRunning, time, tab]);

  // Handle alarm
  const handleAlarm = () => {
    const sound = sounds.find((s) => s.id === selectedSound);
    if (sound) {
      alarmAudioRef.current.src = sound.src;
      alarmAudioRef.current.play();

      // Automatically stop alarm after 5 seconds
      setTimeout(() => {
        alarmAudioRef.current.pause();
        alarmAudioRef.current.currentTime = 0;
      }, 5000);
    }
  };

  // Reset logic
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    stopAlarm(); // Ensure alarm is stopped on reset
  };

  // Record logic
  const handleRecord = () => {
    setRecords([...records, time]);
  };

  // Stop alarm
  const stopAlarm = () => {
    alarmAudioRef.current.pause();
    alarmAudioRef.current.currentTime = 0;
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer-page">
      {/* Hidden audio element */}
      <audio ref={alarmAudioRef}></audio>

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
        {tab === "countdown" && (
          <input
            type="number"
            placeholder="Enter seconds"
            onChange={(e) => setTime(parseInt(e.target.value, 10))}
            style={{
              padding: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginRight: "10px",
              width: "80px",
              textAlign: "center",
            }}
          />
        )}
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
        <button
          className={tab === "stopwatch" ? "active" : ""}
          onClick={() => setTab("stopwatch")}
        >
          Stopwatch
        </button>
        <button
          className={tab === "countdown" ? "active" : ""}
          onClick={() => setTab("countdown")}
        >
          Countdown
        </button>
        <button
          className={tab === "intervals" ? "active" : ""}
          onClick={() => setTab("intervals")}
        >
          Intervals
        </button>
      </div>

      {/* Sound Selection */}
      {tab === "countdown" && (
        <div className="sound-selection">
          <label>
            Select Alarm Sound:{" "}
            <select
              value={selectedSound}
              onChange={(e) => setSelectedSound(e.target.value)}
              style={{
                padding: "5px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
            >
              {sounds.map((sound) => (
                <option key={sound.id} value={sound.id}>
                  {sound.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

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
