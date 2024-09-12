import React from 'react';

interface DeedProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const Deed: React.FC<DeedProps> = ({ title, description, completed }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-4 transition-transform hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-gray-500">{completed ? 'Completed' : 'Not Completed'}</p>
    </div>
  );
};

export default Deed;
