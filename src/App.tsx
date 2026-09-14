import { Home } from "lucide-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screen/Login";
import Dashboard from "./screen/Dashboard";
import SignUp from "./screen/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
