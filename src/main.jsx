import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { TaskProvider } from "./context/TaskProvider";



ReactDOM.render(
  <TaskProvider>
    <App />
  </TaskProvider>,
  document.getElementById("root")
);

