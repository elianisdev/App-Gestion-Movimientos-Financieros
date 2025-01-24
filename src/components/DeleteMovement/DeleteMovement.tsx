import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteMovement: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h3 className="text-lg font-bold mb-4 text-center">Eliminar Movimiento</h3>
                <p className="text-gray-700 mb-6 text-center">Quieres eliminar el movimiento?</p>
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="w-1/2 py-2 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-1/2 py-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteMovement;