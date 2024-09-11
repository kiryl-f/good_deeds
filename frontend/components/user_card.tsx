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
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-xl font-bold">{user.name} ({user.username})</h3>
      <p>Good Deeds: {user.goodDeedsCount}</p>
      <button
        onClick={handleAddFriendClick}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Friend
      </button>
    </div>
  );
};

export default UserCard;
