import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = memo(({
    isOpen,
    title,
    onConfirm,
    onCancel,
    confirmText = "확인",
    cancelText = "취소",
    confirmButtonClass = "bg-gray-800 text-white rounded-lg hover:bg-gray-900"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-2xl">
                <h3 className="text-lg font-medium text-center text-[#222] mb-6">
                    {title}
                </h3>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-2 ${confirmButtonClass}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
});

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    confirmButtonClass: PropTypes.string
};

ConfirmationModal.displayName = 'ConfirmationModal';

export default ConfirmationModal; 