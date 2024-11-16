import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { type Announcement } from "@/types/announcement";

interface AnnouncementCardProps {
  announcement: Announcement;
  isAdmin?: boolean;
  onEdit?: (announcement: Announcement) => void;
  onDelete?: (id: string) => void;
}

export const AnnouncementCard = ({
  announcement,
  isAdmin = false,
  onEdit,
  onDelete,
}: AnnouncementCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">{announcement.title}</h2>
          <p className="text-gray-300">{announcement.content}</p>
          <p className="text-sm text-gray-400 mt-2">Posted: {announcement.date}</p>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0"
              onClick={() => onEdit?.(announcement)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
              onClick={() => onDelete?.(announcement.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};