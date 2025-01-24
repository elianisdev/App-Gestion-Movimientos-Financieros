import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login.tsx";
import Home from "./components/Home/Home.tsx";
import AddMovement from "./components/AddMovement/AddMovement.tsx";
import { Flip, ToastContainer} from "react-toastify";
import {Register} from "./components/Auth/Register.tsx";

const App: React.FC = () => {

    return (
        <>
            <Router>
                <Routes>
                    <Route index path="/" element={<Login />} />
                    <Route path="/register-user" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/add" element={<AddMovement />} />
                </Routes>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                draggable
                theme="light"
                transition={Flip}
            />
        </>
    );
};

export default App;