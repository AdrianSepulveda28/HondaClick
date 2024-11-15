import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-honda-dark">
      <nav className="bg-white/10 backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Honda Click Hub</h1>
          <div className="flex gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-white hover:text-honda-red">
                Dashboard
              </Button>
            </Link>
            <Link to="/announcement">
              <Button variant="ghost" className="text-white hover:text-honda-red">
                Announcements
              </Button>
            </Link>
            <Link to="/settings">
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
            <h2 className="text-xl font-bold text-white mb-4">Welcome Back!</h2>
            <p className="text-gray-300">
              Access your Honda Click community features and stay connected with fellow riders.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Latest Updates</h2>
            <p className="text-gray-300">
              Check out the latest news and updates from the Honda Click community.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Community Events</h2>
            <p className="text-gray-300">
              Stay updated with upcoming rides and community gatherings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;