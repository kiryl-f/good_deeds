import React from 'react';

interface Deed {
  id: number;
  title: string;
  description: string;
}

const DeedCard: React.FC<{ deed: Deed }> = ({ deed }) => {
  const handleShare = () => {
    alert(`Share this good deed: ${deed.title}`);
  };

  return (
    <div className="flex flex-row items-center justify-between w-1/3 bg-white shadow-lg rounded-lg p-4 mb-4 transform transition-transform hover:scale-105 hover:shadow-xl">
      <div className="flex-grow">
        <h2 className="text-xl font-bold mb-2 text-gray-600">{deed.title}</h2>
        <p className="text-gray-600">{deed.description}</p>
      </div>
      <div className="ml-4">
        <img
          src="/share.png"
          alt="Share"
          width={50}
          height={50}
          onClick={handleShare}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DeedCard;
