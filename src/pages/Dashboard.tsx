import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-honda-dark">
      <nav className="bg-white/10 backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <div className="flex gap-4">
            <Link to="/home">
              <Button variant="ghost" className="text-white hover:text-honda-red">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Profile Overview</h2>
            <div className="space-y-2 text-gray-300">
              <p>Username: JohnDoe</p>
              <p>Email: john@example.com</p>
              <p>Member Since: January 2024</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Motorcycle Details</h2>
            <div className="space-y-2 text-gray-300">
              <p>Model: Honda Click</p>
              <p>Year: 2023</p>
              <p>Plate Number: ABC123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;