import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Singup from "./components/Singup/Singup";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        console.log(user);
        setUserName(user.displayName)
      }
      else {
        setUserName("");
      }
    })
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home name={userName} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
