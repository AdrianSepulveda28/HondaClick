import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Announcement } from "@/types/announcement";

interface AnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement: Partial<Announcement>;
  setAnnouncement: (announcement: Partial<Announcement>) => void;
  onSubmit: () => void;
  mode: 'create' | 'edit';
}

export const AnnouncementDialog = ({
  open,
  onOpenChange,
  announcement,
  setAnnouncement,
  onSubmit,
  mode,
}: AnnouncementDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Announcement' : 'Edit Announcement'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'Create a new announcement for all users.' : 'Make changes to the announcement.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            placeholder="Title"
            value={announcement.title || ''}
            onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
          />
          <Input
            placeholder="Content"
            value={announcement.content || ''}
            onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
          />
          <Button onClick={onSubmit} className="w-full">
            {mode === 'create' ? 'Create Announcement' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};