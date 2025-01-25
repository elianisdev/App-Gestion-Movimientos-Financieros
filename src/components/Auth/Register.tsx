import { FC } from "react";
import { useForm } from "react-hook-form";
import { userRegister } from "../../services/Auth.ts";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

interface RegisterFormData {
    email: string;
    password: string;
    name: string;
    lastName: string;
    avatarUrl: string;
}

export const Register: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterFormData) => {
        const response = await userRegister(data.email, data.password, data.name, data.lastName, data.avatarUrl);
        if (response.statusCode === 201) {
            toast(response.message, { type: "success" });
            toLogin();
        } else if (response.statusCode === 400) {
            toast(response.message, { type: "error" });
        }
        else {
            toast("Error al registrar el usuario, intentalo mas tarde", { type: "error" });
        }
    };

    const toLogin = () => {
        navigate("/");
    }

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
                    Nuevo usuario
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Nombre"
                            {...register("name", {required: "El nombre es obligatorio"})}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Apellido"
                            {...register("lastName", {required: "El apellido es obligatorio"})}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-2">
                        <input
                            type="email"
                            placeholder="Email"
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

                    <div className="mb-2">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            {...register("password", {required: "La contraseña es obligatoria"})}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="URL del avatar"
                            {...register("avatarUrl")}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="py-2 flex justify-center">

                        <button
                            className="bg-gray-300 text-white py-2 px-4 rounded cursor-pointer mr-2 text-sm
                        hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            type="button"
                            onClick={toLogin}
                        >
                            Cancelar
                        </button>

                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer text-sm
                        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="submit"
                        >
                            Registrar
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};