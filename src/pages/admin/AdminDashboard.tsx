import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import PendingUsers from "@/components/admin/PendingUsers";
import UsersList from "@/components/admin/UsersList";

interface User {
  id: string;
  username: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'testuser', email: 'test@example.com', status: 'pending' },
  ]);

  const handleLogout = () => {
    navigate('/');
  };

  const approveUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: 'approved' as const } : user
    ));
    toast({
      title: "User Approved",
      description: "The user has been approved successfully.",
    });
  };

  const rejectUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: 'rejected' as const } : user
    ));
    toast({
      title: "User Rejected",
      description: "The user has been rejected.",
    });
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-honda-dark">
      <nav className="bg-white/10 backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link to="/admin/home">
              <Button variant="ghost" className="text-white hover:text-honda-red">
                Home
              </Button>
            </Link>
            <Link to="/admin/announcement">
              <Button variant="ghost" className="text-white hover:text-honda-red">
                Announcements
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="ghost" className="text-white hover:text-honda-red">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="text-white hover:text-honda-red"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <PendingUsers 
            users={users}
            onApprove={approveUser}
            onReject={rejectUser}
          />
          <UsersList 
            users={users}
            onDelete={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;