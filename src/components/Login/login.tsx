import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FormData {
    email: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = () => {
        navigate("/home");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm">

                <div className="flex justify-center mb-6">
                    <img
                        src="https://app.ikualo.com/icons/Ikualo-384x384.png"
                        alt="Logo"
                        className="w-20 h-20"
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <input
                            type="email"
                            placeholder="Ingresa tu email"
                            {...register("email", { required: "El email es obligatorio", pattern: { value: /^\S+@\S+$/i, message: "Email no válido" } })}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Continuar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
