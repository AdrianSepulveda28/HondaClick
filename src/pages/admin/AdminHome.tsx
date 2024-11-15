import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-honda-dark">
      <nav className="bg-white/10 backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Home</h1>
          <div className="flex gap-4">
            <Link to="/admin">
              <Button variant="ghost" className="text-white hover:text-honda-red">
                Dashboard
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Admin Controls</h2>
            <p className="text-gray-300">
              Manage users, content, and system settings from this admin panel.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">User Management</h2>
            <p className="text-gray-300">
              Review and manage user accounts and permissions.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
            <p className="text-gray-300">
              Monitor system performance and user activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;