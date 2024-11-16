import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";
import { AnnouncementDialog } from "@/components/announcements/AnnouncementDialog";
import { type Announcement } from "@/types/announcement";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AdminAnnouncement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Partial<Announcement>>({});
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');

  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: async () => {
      // TODO: Replace with actual API call when backend is implemented
      return [
        { id: '1', title: 'Welcome', content: 'Welcome to Honda Click Hub', date: '2024-02-20' },
      ];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newAnnouncement: Omit<Announcement, 'id'>) => {
      // TODO: Replace with actual API call
      return { id: Date.now().toString(), ...newAnnouncement };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({
        title: "Success",
        description: "Announcement created successfully",
      });
      setIsDialogOpen(false);
      setCurrentAnnouncement({});
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (announcement: Announcement) => {
      // TODO: Replace with actual API call
      return announcement;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({
        title: "Success",
        description: "Announcement updated successfully",
      });
      setIsDialogOpen(false);
      setCurrentAnnouncement({});
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // TODO: Replace with actual API call
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({
        title: "Success",
        description: "Announcement deleted successfully",
      });
    },
  });

  const handleSubmit = () => {
    if (!currentAnnouncement.title || !currentAnnouncement.content) return;

    if (dialogMode === 'create') {
      createMutation.mutate({
        title: currentAnnouncement.title,
        content: currentAnnouncement.content,
        date: new Date().toISOString().split('T')[0],
      });
    } else {
      updateMutation.mutate(currentAnnouncement as Announcement);
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleLogout = () => {
    navigate('/');
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
          <Button
            className="bg-honda-red hover:bg-red-600"
            onClick={() => {
              setDialogMode('create');
              setCurrentAnnouncement({});
              setIsDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Announcement
          </Button>
        </div>
        
        <div className="space-y-6">
          {announcements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              isAdmin
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <AnnouncementDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        announcement={currentAnnouncement}
        setAnnouncement={setCurrentAnnouncement}
        onSubmit={handleSubmit}
        mode={dialogMode}
      />
    </div>
  );
};

export default AdminAnnouncement;