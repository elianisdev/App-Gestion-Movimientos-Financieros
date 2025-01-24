import {FC, useState} from "react";
import { useNavigate } from "react-router-dom";
import avatarUrl from "../../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteMovement from "../DeleteMovement/DeleteMovement.tsx";
import numeral from 'numeral';


interface Movement {
    id: string;
    date: string;
    type: string;
    value: number;
    description: string;
}

const Home: FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);

    const username = "Usuario";
    const movements: Movement[] = [
        { id: "1", date: "2021-10-01", type: "Ingreso", value: 100, description: "Ingreso de prueba" },
        { id: "2", date: "2021-10-02", type: "Egreso", value: 50, description: "Egreso de prueba" },
        { id: "3", date: "2021-10-03", type: "Ingreso", value: 200, description: "Ingreso de prueba" },
        { id: "4", date: "2021-10-04", type: "Egreso", value: 150, description: "Egreso de prueba" },
        { id: "5", date: "2021-10-04", type: "Egreso", value: 150, description: "Egreso de prueba" },
        { id: "6", date: "2021-10-04", type: "Egreso", value: 150, description: "Egreso de prueba" },
        { id: "7", date: "2021-10-04", type: "Egreso", value: 150, description: "Egreso de prueba" },
        { id: "8", date: "2021-10-04", type: "Egreso", value: 150, description: "Egreso de prueba" },
        { id: "9", date: "2021-10-04", type: "Egreso", value: 150, description: "Egreso de prueba" },
    ];
    const amount = 2000;
    const formattedAmount = numeral(amount).format('0,0.00 €');
    console.log(formattedAmount);

    const handleDeleteClick = (movement: Movement) => {
        setSelectedMovement(movement);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedMovement) {
            console.log(`Deleting movement with id: ${selectedMovement.id}`);
        }
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/");
    };

    return (
        <div className=" flex justify-center items-start min-h-screen bg-gray-100 ">
        <div className="p-8 bg-white">
            <header className="flex flex-col justify-center items-center mb-4">
                <div className="flex items-center">
                    <img src={avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                    <p className="text-sm text-gray-600">capital actual<br />${amount}</p>
                </div>
                <div className="flex items-center">
                    <p className="text-lg font-bold">{username}</p>
                </div>
            </header>

            <div className="mb-4 flex justify-between">
                <h2 className="text-lg font-bold mb-4">Mis Movimientos</h2>
                <button
                    onClick={() => navigate("/add")}
                    className="bg-blue-500 text-white py-1 px-2 text-sm rounded hover:bg-blue-600"
                >
                    Añadir Movimiento
                </button>
            </div>
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        <th className="border px-4 py-2">Fecha</th>
                        <th className="border px-4 py-2">Tipo</th>
                        <th className="border px-4 py-2">Valor</th>
                        <th className="border px-4 py-2">Descripción</th>
                        <th className="border px-4 py-2">Accion</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movements.map(movement => (
                        <tr key={movement.id}>
                            <td className="border px-4 py-2">{movement.date}</td>
                            <td className="border px-4 py-2">{movement.type}</td>
                            <td className="border px-4 py-2">${movement.value}</td>
                            <td className="border px-4 py-2">{movement.description}</td>
                            <td className="border px-4 py-2 text-center">
                                <button
                                    onClick={() => handleDeleteClick(movement)}
                                    className="bg-red-500 text-white py-1 px-2 text-sm rounded hover:bg-red-600"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="m-auto" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <DeleteMovement
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />

            <div className="w-full flex justify-center">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
        </div>
    );
};

export default Home;