import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register"; // Import Register component
import Chat from "./components/Chat";
import Home from "./components/Home";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/register"
          element={<Register setToken={setToken} />}
        />{" "}
        {/* Add register route */}
        <Route path="/chat" element={<Chat token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
