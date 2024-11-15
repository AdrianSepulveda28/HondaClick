import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface User {
  id: string;
  username: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface UsersListProps {
  users: User[];
  onDelete: (userId: string) => void;
}

const UsersList = ({ users, onDelete }: UsersListProps) => {
  return (
    <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">All Users</h2>
      <div className="space-y-4">
        {users.filter(user => user.status !== 'pending').map(user => (
          <div key={user.id} className="flex items-center justify-between bg-white/5 p-4 rounded">
            <div className="text-white">
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-gray-300">{user.email}</p>
              <p className="text-sm text-gray-400">Status: {user.status}</p>
            </div>
            <Button 
              variant="destructive"
              onClick={() => onDelete(user.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;