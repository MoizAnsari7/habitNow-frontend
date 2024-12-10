import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import Sidenav from "./components/Sidenav"; // Import the Sidenav component

// Lazy load components for better performance
const HabitsPage = lazy(() => import("./pages/HabitPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingPage = lazy(() => import("./pages/SettingPage"));
const TimerPage = lazy(() => import("./pages/TimerPage"));

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.5 },
  },
};

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidenav />
        <div style={{  padding: "25px", width: "80%" }}>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route
                path="/habit"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <HabitsPage />
                  </motion.div>
                }
              />
              <Route
                path="/profile"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <ProfilePage />
                  </motion.div>
                }
              />
              <Route
                path="/timer"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <TimerPage />
                  </motion.div>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
