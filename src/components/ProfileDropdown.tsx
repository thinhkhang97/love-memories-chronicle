
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ProfileDropdown = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  // Extract user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt="Profile" />
            <AvatarFallback className="bg-love-100 text-love-700">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">{user?.email}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.user_metadata?.name || user?.email?.split("@")[0] || "User"}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
