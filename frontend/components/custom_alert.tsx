import React from 'react';

interface CustomAlertProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info'; 
  onClose: () => void; 
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type = 'info', onClose }) => {
  const alertColors = {
    success: 'bg-green-100 text-green-800 border-green-500',
    error: 'bg-red-100 text-red-800 border-red-500',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    info: 'bg-blue-100 text-blue-800 border-blue-500',
  };

  return (
    <div className={`border-l-4 p-4 rounded-md mb-4 ${alertColors[type]}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-medium">{message}</p>
        </div>
        <button onClick={onClose} className="text-xl font-semibold focus:outline-none">
          &times;
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
