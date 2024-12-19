import ReactDOM from "react-dom/client";  // Import from 'react-dom/client'
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormProvider } from "../src/context/FormContext";  

import App from "./App";
import { TaskProvider } from "./context/TaskProvider";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot

// Render the app with TaskProvider wrapped around it
root.render(
  <TaskProvider>
     <FormProvider> 
    <App />
    </FormProvider> 
  </TaskProvider>
);
