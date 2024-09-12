import React from 'react';

interface GoodDeedsModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  goodDeeds: Array<{ id: number; title: string; description: string }>;
}

const GoodDeedsModal: React.FC<GoodDeedsModalProps> = ({ isOpen, onClose, username, goodDeeds }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-black">Good Deeds by {username}</h2>
        <ul>
          {goodDeeds.map((deed) => (
            <li key={deed.id} className="mb-4">
              <h3 className="font-bold text-black">{deed.title}</h3>
              <p className='text-black'>{deed.description}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GoodDeedsModal;
