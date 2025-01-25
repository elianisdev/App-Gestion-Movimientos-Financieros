import {FC, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteMovement from "../DeleteMovement/DeleteMovement.tsx";
import numeral from 'numeral';
import moment from 'moment';
import {getUser} from "../../services/Auth.ts";
import {deleteMovement, getCapital, getMovements} from "../../services/Movement.ts";
import {toast} from "react-toastify";

interface Movement {
    _id: string;
    date: string;
    type: string;
    amount: number;
    description: string;
}

interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    amount: number;
}

const Home: FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
    const [user, setUser] = useState<User>();
    const [capitalAmount, setCapitalAmount] = useState('0');
    const [movements, setMovements] = useState<Movement[]>([]);

    const getSessionUser = async () => {
            const response = await getUser();
            if (response.statusCode === 200) {
                setUser(response.user);
            } else {
                navigate("/");
            }
    };

    const getCapitalUser = async () => {
        const response = await getCapital();
        if (response.statusCode === 200) {
            setCapitalAmount(numeral(response.capital).format('0,0'));
        } else {
            navigate("/");
        }
    }

    const getMovementsUser = async () => {
        const response = await getMovements();
        if (response.statusCode === 200) {
            setMovements(response.movements);
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/");
        }
        getSessionUser();
        getCapitalUser();
        getMovementsUser();
    }, []);

    const handleDeleteClick = (movement: Movement) => {
        setSelectedMovement(movement);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedMovement) {
            const response = await deleteMovement(selectedMovement._id);
            if (response.statusCode === 200) {
                toast(response.message, {type: "success"});
                await getCapitalUser();
                await getMovementsUser();
                setIsModalOpen(false);
            } else {
                toast(response.message || 'Error al eliminar el movimiento, intentalo mas tarde', {type: "error"});
            }
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
                    <div className="flex items-center py-4">
                        <img src={user?.avatarUrl} alt="Avatar" className="rounded-full mr-2" style={{
                            height: '90px'
                        }}/>
                        <div className="flex flex-col">
                            <h3 className="text-lag text-slate-700 font-bold ">Capital actual</h3>
                            <p className="text-lg text-gray-600">€ {capitalAmount}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="text-lg font-semibold text-gray-800">{user?.name} {user?.lastName}</p>
                    </div>
                </header>

                <div className="mb-4 flex justify-between">
                    <h2 className="text-lg font-bold text-slate-600">Mis Movimientos</h2>
                    <button
                        onClick={() => navigate("/add")}
                        className="bg-blue-500 text-white p-2 text-sm rounded hover:bg-blue-600 cursor-pointer"
                    >
                        Añadir Movimiento
                    </button>
                </div>

                <hr />
                {movements.length === 0 && (
                    <div className="flex justify-center items-center h-64 mb-4">
                        <p className="text-lg text-gray-600 text-center">Aun no existen movimientos asociados a la
                            cuenta,
                            <br/>
                            puedes iniciar agregando un movimiento haciendo
                            <br/>
                            click <Link to={"/add"} className="text-blue-500 hover:underline"
                                        style={{textDecoration: 'none'}}>
                                aquí
                            </Link>
                        </p>
                    </div>
                )}

                {movements.length > 0 && (
                    <div className="my-4">
                        <table className="w-full border-collapse border border-gray-300 rounded-lg">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Fecha</th>
                                <th className="border border-gray-300 px-4 py-2">Tipo</th>
                                <th className="border border-gray-300 px-4 py-2">Valor</th>
                                <th className="border border-gray-300 px-4 py-2">Descripción</th>
                                <th className="border border-gray-300 px-4 py-2">Acción</th>
                            </tr>
                            </thead>
                            <tbody>
                            {movements && movements.map((movement, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{moment(movement.date).format('DD/MM/YYYY hh:mm a')}</td>
                                    <td className="border border-gray-300 px-4 py-2">{movement.type}</td>
                                    <td className="border border-gray-300 px-4 py-2">€ {numeral(movement.amount).format('0,0')}</td>
                                    <td className="border border-gray-300 px-4 py-2">{movement.description}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDeleteClick(movement)}
                                            className="bg-red-500 text-white py-1 px-2 text-sm rounded hover:bg-red-600 cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="m-auto"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <hr />

                <DeleteMovement
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onDelete={handleConfirmDelete}
                />

                <div className="w-full flex justify-center py-4">
                    <button
                        onClick={handleLogout}
                        className="bg-red-400 text-white text-sm p-2 rounded hover:bg-red-500 cursor-pointer"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;