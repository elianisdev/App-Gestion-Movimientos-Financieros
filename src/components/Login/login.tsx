import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleContinue = () => {
        if (email.trim() !== "") {
            navigate("/home"); // Navega a la pantalla principal
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Bienvenido</h1>
                <input
                    type="email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    onClick={handleContinue}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default Login;
