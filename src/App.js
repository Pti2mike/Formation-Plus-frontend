import React from "react";
import StudentList from "./components/StudentList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Formation-Plus</h1>
      <StudentList />
    </div>
  );
}

export default App;
