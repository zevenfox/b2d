import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    actionType: 'accepted' | 'declined' | null;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, actionType }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="flex items-center justify-center text-lg font-bold mb-4">Confirm {actionType === 'accepted' ? 'Approval' : 'Decline'}</h2>
                <p className="text-center">Are you sure you want to {actionType} this investment request?</p>
                <div className="flex justify-center items-center mt-6 space-x-2">
                    <button
                        className={`bg-${actionType === 'accepted' ? 'green' : 'red'}-500 hover:bg-${actionType === 'accepted' ? 'green' : 'red'}-600 text-white py-2 px-4 rounded`}
                        onClick={onConfirm}
                    >
                        {actionType === 'accepted' ? 'Approve' : 'Decline'}
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
