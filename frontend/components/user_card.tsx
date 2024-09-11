import React from 'react';
import { useRouter } from 'next/router';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    username: string;
    goodDeedsCount: number;
  };
  onAddFriend: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onAddFriend }) => {
  const router = useRouter();

  const handleAddFriendClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to login if not logged in
      return;
    }
    onAddFriend(user.id); // Call the add friend handler
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded shadow-md space-x-4">
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <img
          src="../public/placeholder-profile.png"
          alt="Profile Picture"
          width={60}
          height={60}
          className="rounded-full border-4 border-gray-300"
        />

        {/* User Info */}
        <div>
          <h3 className="text-xl font-bold">{user.name} ({user.username})</h3>
          <p>Good Deeds: {user.goodDeedsCount}</p>
        </div>
      </div>

      {/* Add Friend Button */}
      <button
        onClick={handleAddFriendClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add as Friend
      </button>
    </div>

  );
};

export default UserCard;
