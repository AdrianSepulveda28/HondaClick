import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";
import { useQuery } from "@tanstack/react-query";
import { type Announcement } from "@/types/announcement";

const Announcement = () => {
  const navigate = useNavigate();

  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: async () => {
      // TODO: Replace with actual API call when backend is implemented
      return [
        { id: '1', title: 'Monthly Meetup', content: 'Join us for our monthly meetup this Saturday at Central Park.', date: '2024-02-20' },
        { id: '2', title: 'Maintenance Tips', content: 'Check out our new guide on maintaining your Honda Click.', date: '2024-02-18' },
      ];
    },
  });

  const handleLogout = () => {
    navigate('/');
  };

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
            <Link to="/dashboard">
              <Button variant="ghost" className="text-white hover:text-honda-red">
                Dashboard
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
        <div className="space-y-6">
          {announcements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;