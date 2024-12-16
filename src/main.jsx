import ReactDOM from "react-dom/client";  // Import from 'react-dom/client'
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import { TaskProvider } from "./context/TaskProvider";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot

// Render the app with TaskProvider wrapped around it
root.render(
  <TaskProvider>
    <App />
  </TaskProvider>
);
