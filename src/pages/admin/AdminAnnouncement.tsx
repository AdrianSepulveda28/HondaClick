import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut, Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

const AdminAnnouncement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: '1', title: 'Welcome', content: 'Welcome to Honda Click Hub', date: '2024-02-20' },
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast({
      title: "Announcement Deleted",
      description: "The announcement has been deleted successfully.",
    });
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(a => 
        a.id === editingAnnouncement.id ? editingAnnouncement : a
      ));
      setIsEditDialogOpen(false);
      setEditingAnnouncement(null);
      toast({
        title: "Announcement Updated",
        description: "The announcement has been updated successfully.",
      });
    }
  };

  const handleNewAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement = {
        id: Date.now().toString(),
        ...newAnnouncement,
        date: new Date().toISOString().split('T')[0]
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', content: '' });
      toast({
        title: "Announcement Created",
        description: "New announcement has been created successfully.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-honda-dark">
      <nav className="bg-white/10 backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Announcements</h1>
          <div className="flex gap-4">
            <Link to="/admin/home">
              <Button variant="ghost" className="text-white hover:text-honda-red">
                Home
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="ghost" className="text-white hover:text-honda-red">
                Dashboard
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
        <div className="flex justify-end mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-honda-red hover:bg-red-600">
                <Plus className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
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
                <Button onClick={handleNewAnnouncement} className="w-full">
                  Create Announcement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-6">
          {announcements.map(announcement => (
            <div key={announcement.id} className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{announcement.title}</h2>
                  <p className="text-gray-300">{announcement.content}</p>
                  <p className="text-sm text-gray-400 mt-2">Posted: {announcement.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleEdit(announcement)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(announcement.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
            <DialogDescription>
              Make changes to the announcement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              placeholder="Title"
              value={editingAnnouncement?.title || ''}
              onChange={(e) => setEditingAnnouncement(prev => 
                prev ? { ...prev, title: e.target.value } : null
              )}
            />
            <Input
              placeholder="Content"
              value={editingAnnouncement?.content || ''}
              onChange={(e) => setEditingAnnouncement(prev => 
                prev ? { ...prev, content: e.target.value } : null
              )}
            />
            <Button onClick={handleEditSubmit} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAnnouncement;