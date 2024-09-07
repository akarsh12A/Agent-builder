import React from "react";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
import Trainingmaterials from "./Trainingmaterials";
import "./Trainingmaterials.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Trainingmaterials />
      </div>
    </div>
  );
}

export default App;
