import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import Sidenav from "./components/Sidenav/Sidenav"; // Import the Sidenav component
import HomePage from "./components/Home/HomePage";
import BottomNavbarPage from "./components/BottomNavbar/BottomNavbarPage";

// Lazy load components for better performance
const HabitsPage = lazy(() => import("./pages/HabitPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
// const SettingPage = lazy(() => import("./pages/SettingPage"));
const TimerPage = lazy(() => import("./pages/TimerPage"));
const TaskPage = lazy(() => import("./pages/TaskPage"));
const RecurringTaskPage = lazy(() => import("./pages/RecurringTask/RecurringTaskPage"));
const MyTaskPage = lazy(() => import("./pages/MyTaskPage"));

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
      <div className="MainDiv" style={{ position: "relative" }}>
        <Sidenav />
        <div style={{ display: "flex" , width : "100%" , justifyContent: "center" , alignItems: "center" }}>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <HomePage />
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
                    style={{ display: "flex" , width : "100%" , justifyContent: "center" , alignItems: "center"}}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <TimerPage />
                  </motion.div>
                }
              />

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

<Route path="/task" element={ <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                   <TaskPage />
                  </motion.div>
                }
              />


<Route path="/myTask" element={ <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                   <MyTaskPage />
                  </motion.div>
                }
              />

<Route path="/recurringTask" element={ <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                   < RecurringTaskPage />
                  </motion.div>
                }
              />

            </Routes>
          </Suspense>
        
        </div>
      {/* Bottom Navbar */}
     <BottomNavbarPage />
      </div>
    </Router>
  );
}

export default App;
