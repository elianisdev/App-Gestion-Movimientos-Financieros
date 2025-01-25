import {FC} from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteMovement: FC<ModalProps> = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h3 className="text-lg font-bold mb-4 text-center">Eliminar Movimiento</h3>
                <p className="text-gray-700 mb-6 text-center">Quieres eliminar el movimiento?</p>
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="w-1/2 py-2 text-sm mr-2 bg-gray-300 text-white rounded hover:bg-gray-400 cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onDelete}
                        className="w-1/2 py-2 text-sm ml-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteMovement;