import React, {useEffect} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type MovementFormInputs = {
    type: "Ingreso" | "Egreso";
    amount: number;
    description: string;
};

const AddMovement: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<MovementFormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<MovementFormInputs> = (data) => {
        console.log("Datos del formulario:", data);
        navigate("/home");
    };

    // Watch all form values
    const formValues = watch();

    useEffect(() => {
        console.log("Form values changed:", formValues);
    }, [formValues]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded p-6 w-full max-w-sm">
                <h3 className="text-center text-lg font-bold mb-6 border-b pb-2">Añadir Movimiento</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <div className="flex justify-center gap-2">
                            <label className="flex items-center">
                                <input className="hidden peer appearance-none"
                                       type="radio"
                                       value="Ingreso"
                                       {...register("type", { required: "Selecciona un tipo de movimiento" })}
                                />
                                <span className="bg-blue-500 text-white py-2 px-4 rounded-l cursor-pointer peer-checked:bg-blue-600">
                                    Ingreso
                                </span>
                            </label>
                            <label className="flex items-center">
                                <input className="hidden peer appearance-none"
                                       type="radio"
                                       value="Egreso"
                                       {...register("type", { required: "Selecciona un tipo de movimiento" })}
                                />
                                <span className="bg-red-500 text-white py-2 px-4 rounded-r cursor-pointer peer-checked:bg-red-600">
                                    Egreso
                                </span>
                            </label>
                        </div>
                        {errors.type && (
                            <span className="text-red-500 text-sm block text-center mt-2">{errors.type.message}</span>
                        )}
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Valor del movimiento"
                            {...register("amount", {
                                required: "El valor es requerido",
                                min: { value: 1, message: "El valor debe ser mayor a 0" },
                            })}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.amount && (
                            <span className="text-red-500 text-sm block mt-2">{errors.amount.message}</span>
                        )}
                    </div>
                    <div>
                        <textarea
                            placeholder="Descripción"
                            {...register("description", {
                                required: "La descripción es requerida",
                                maxLength: { value: 200, message: "Máximo 200 caracteres permitidos" },
                            })}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.description && (
                            <span className="text-red-500 text-sm block mt-2">{errors.description.message}</span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="float-right bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Crear
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMovement;