import React from 'react';
import Image from 'next/image';

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
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex items-center justify-between w-full sm:w-1/2 md:w-1/3">
      <div className="flex-grow">
        <h2 className="text-xl font-bold mb-2 text-gray-600">{deed.title}</h2>
        <p className="text-gray-600">{deed.description}</p>
      </div>
      <div className="ml-4">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14">
          <Image
            src="/share.png"
            alt="Share"
            layout="fill"
            objectFit="contain" 
            className="cursor-pointer"
            onClick={handleShare}
          />
        </div>
      </div>
    </div>
  );
};

export default DeedCard;
