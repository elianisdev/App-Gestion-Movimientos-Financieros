import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {LoginService} from "../../services/Auth.ts"
import {  toast } from 'react-toastify';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormData) => {

        const response = await LoginService( data.email, data.password );
        if (response.statusCode === 200) {
            toast("Has ingresado correctamente!", { type: "success" });
            localStorage.setItem("user", JSON.stringify(response));
            navigate("/home");
        } else {
            toast("Usuario y/o contraseña incorrecto(s)", { type: "error" });
        }
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

                <div className="text-center text-2xl font-semibold mb-4">
                    Login
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="py-1">
                        <input
                            type="email"
                            placeholder="Ingresa tu email"
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {value: /^\S+@\S+$/i, message: "Email no válido"}
                            })}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="py-1">
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            {...register("password", {
                                required: "La contraseña es obligatoria"
                            })}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="submit"
                    >
                        Continuar
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/register-user" className="text-blue-500 hover:underline">
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
