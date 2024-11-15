import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface PendingUsersProps {
  users: User[];
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
}

const PendingUsers = ({ users, onApprove, onReject }: PendingUsersProps) => {
  return (
    <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Pending Users</h2>
      <div className="space-y-4">
        {users.filter(user => user.status === 'pending').map(user => (
          <div key={user.id} className="flex items-center justify-between bg-white/5 p-4 rounded">
            <div className="text-white">
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-gray-300">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => onApprove(user.id)}
                className="bg-green-500 hover:bg-green-600"
              >
                Approve
              </Button>
              <Button 
                onClick={() => onReject(user.id)}
                variant="destructive"
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingUsers;