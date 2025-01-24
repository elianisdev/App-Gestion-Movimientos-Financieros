import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/login.tsx";
import Home from "./components/Home/Home.tsx";
import AddMovement from "./components/AddMovement/AddMovement.tsx";

const App: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/add" element={<AddMovement />} />
            </Routes>
        </Router>
    );
};

export default App;