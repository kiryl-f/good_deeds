import React from 'react';

interface AddDeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AddDeedModal: React.FC<AddDeedModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl"> {/* Modal is larger now */}
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            &#10005;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AddDeedModal;
