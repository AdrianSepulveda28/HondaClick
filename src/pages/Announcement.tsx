import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Announcement = () => {
  return (
    <div className="min-h-screen bg-honda-dark">
      <nav className="bg-white/10 backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Announcements</h1>
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
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-2">Monthly Meetup</h2>
            <p className="text-gray-300">
              Join us for our monthly meetup this Saturday at Central Park.
            </p>
            <p className="text-sm text-gray-400 mt-2">Posted: 2 days ago</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-2">Maintenance Tips</h2>
            <p className="text-gray-300">
              Check out our new guide on maintaining your Honda Click.
            </p>
            <p className="text-sm text-gray-400 mt-2">Posted: 5 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;