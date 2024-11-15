import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Plus, Settings, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'testuser', email: 'test@example.com', status: 'pending' },
  ]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: '1', title: 'Welcome', content: 'Welcome to Honda Click Hub', date: '2024-02-20' },
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });

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

  const addAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([...announcements, {
        id: Date.now().toString(),
        ...newAnnouncement,
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewAnnouncement({ title: '', content: '' });
      toast({
        title: "Announcement Created",
        description: "New announcement has been created successfully.",
      });
    }
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast({
      title: "Announcement Deleted",
      description: "The announcement has been deleted successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-honda-dark">
      <nav className="bg-white/10 backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
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
        <div className="space-y-8">
          {/* Pending Users Section */}
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
                      onClick={() => approveUser(user.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Approve
                    </Button>
                    <Button 
                      onClick={() => rejectUser(user.id)}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Users Section */}
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
                    onClick={() => deleteUser(user.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements Section */}
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Announcements</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-honda-red hover:bg-red-600">
                    <Plus className="w-4 h-4 mr-2" />
                    New Announcement
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Announcement</DialogTitle>
                    <DialogDescription>
                      Create a new announcement for all users.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <Input
                      placeholder="Title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement(prev => ({
                        ...prev,
                        title: e.target.value
                      }))}
                    />
                    <Input
                      placeholder="Content"
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement(prev => ({
                        ...prev,
                        content: e.target.value
                      }))}
                    />
                    <Button onClick={addAnnouncement} className="w-full">
                      Create Announcement
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-4">
              {announcements.map(announcement => (
                <div key={announcement.id} className="bg-white/5 p-4 rounded">
                  <div className="flex justify-between items-start">
                    <div className="text-white">
                      <h3 className="font-medium">{announcement.title}</h3>
                      <p className="text-gray-300 mt-1">{announcement.content}</p>
                      <p className="text-sm text-gray-400 mt-2">{announcement.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        onClick={() => deleteAnnouncement(announcement.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;