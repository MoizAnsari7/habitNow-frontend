import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import Sidenav from "./components/Sidenav/Sidenav"; // Import the Sidenav component
import HomePage from "./components/Home/HomePage";
import BottomNavbarPage from "./components/BottomNavbar/BottomNavbarPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load components for better performance
const HabitsPage = lazy(() => import("./pages/Habits/HabitPage"));
const ProfilePage = lazy(() => import("./pages/Profile/ProfilePage"));
// const SettingPage = lazy(() => import("./pages/SettingPage"));
const TimerPage = lazy(() => import("./pages/Timer/TimerPage"));
const TaskPage = lazy(() => import("./pages/Task/TaskPage"));
const RecurringTaskPage = lazy(() =>
  import("./pages/RecurringTask/RecurringTaskPage")
);
const MyTaskPage = lazy(() => import("./pages/MyTask/MyTaskPage"));
const CategoriesPage = lazy(() => import("./pages/Categories/CategoriesPage"));
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const RegisterPage = lazy(() => import("./pages/Register/RegisterPage"));

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
    <AuthProvider>
      <Router>
        <div className="MainDiv" style={{ position: "relative" }}>
          <Sidenav />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <LoginPage />
                    </motion.div>
                  }
                />

                <Route
                  path="/register"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <RegisterPage />
                    </motion.div>
                  }
                />

                <Route
                  path="/"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
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
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    </motion.div>
                  }
                />
                <Route
                  path="/timer"
                  element={
                    <motion.div
                      variants={pageVariants}
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ProtectedRoute>
                        <TimerPage />
                      </ProtectedRoute>
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
                      <ProtectedRoute>
                        <HabitsPage />
                      </ProtectedRoute>
                    </motion.div>
                  }
                />

                <Route
                  path="/task"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ProtectedRoute>
                        <TaskPage />
                      </ProtectedRoute>
                    </motion.div>
                  }
                />

                <Route
                  path="/myTask"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ProtectedRoute>
                        <MyTaskPage />
                      </ProtectedRoute>
                    </motion.div>
                  }
                />

                <Route
                  path="/recurringTask"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ProtectedRoute>
                        <RecurringTaskPage />
                      </ProtectedRoute>
                    </motion.div>
                  }
                />

                <Route
                  path="/categories"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ProtectedRoute>
                        <CategoriesPage />
                      </ProtectedRoute>
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
    </AuthProvider>
  );
}

export default App;
