import React from 'react';

interface Friend {
  id: number;
  name: string;
  username: string;
}

interface FriendCardProps {
  friend: Friend;
  onRemove: (friendId: number) => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ friend, onRemove }) => {
  return (
    <div className="flex justify-between items-center p-4 my-4 bg-gray-100 rounded-lg mb-2 shadow-md transition-transform hover:scale-105 hover:shadow-xl">
      <div>
        <p className="text-lg text-gray-700 font-bold">{friend.name}</p>
        <p className="text-gray-600">{friend.username}</p>
      </div>
      <button
        onClick={() => onRemove(friend.id)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        Remove
      </button>
    </div>
  );
};

export default FriendCard;
