import React, { useState } from 'react';
import GoodDeedsModal from './good_deeds_modal'; // Assuming this is the correct path for the modal component

interface GoodDeed {
  id: number;
  title: string;
  description: string;
}

interface UserCardProps {
  user: {
    id: number;
    name: string;
    username: string;
  };
  goodDeeds: GoodDeed[];
  onAddFriend: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, goodDeeds, onAddFriend }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddFriendClick = () => {
    onAddFriend(user.id);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded shadow-md space-x-4 transition-transform hover:scale-105 hover:shadow-xl">
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="text-xl font-bold">{user.name} ({user.username})</h3>
          <p>Good Deeds: {goodDeeds.length}</p>
          <button
            onClick={handleOpenModal}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Good Deeds
          </button>
        </div>
      </div>

      {!isModalOpen && (
        <button
          onClick={handleAddFriendClick}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Friend
        </button>
      )}

      <GoodDeedsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        username={user.username}
        goodDeeds={goodDeeds}
      />
    </div>
  );
};

export default UserCard;
