import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import ResetPassword from "./routes/ResetPassword";
import SignupByPhone from "./routes/SignupByPhone";
import Home from "./routes/Home";
import Playlist from "./routes/Playlist";

// Importing CSS Files:
import './custom-styles/layout-style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/password-reset" element={<ResetPassword />} />
        <Route path="/login/phone" element={<SignupByPhone />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </Router>
  );
}

export default App;
