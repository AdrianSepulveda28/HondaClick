import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileNavProps {
  links: Array<{
    href: string;
    label: string;
  }>;
  onNavigate?: () => void;
}

export const MobileNav = ({ links, onNavigate }: MobileNavProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] bg-honda-dark">
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onNavigate}
              className="text-white hover:text-honda-red transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};