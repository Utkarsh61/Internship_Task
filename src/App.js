import "./App.css";
import Sign_in from "./components/signup_sign/Sign_in";
import Sign_Up from "./components/signup_sign/Sign_Up";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/signup_sign/homepage/homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<Sign_Up />} />
      </Routes>
    </Router>
  );
}

export default App;
