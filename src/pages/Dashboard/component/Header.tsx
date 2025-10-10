import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import GidiLogo from "@/assets/Frame 481473.png";

const DashboardHeader = ({
  user_data,
  isLoggingOut,
  handleLogout,
  setSidebarOpen,
}) => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left side: Mobile Menu + Logo */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <img src={GidiLogo} alt="GidiLogo" className="h-8 cursor-pointer" />
        </div>

        {/* Right side: Notifications + User Menu */}
        <div className="flex items-center space-x-3 sm:space-x-4">
    

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user_data?.user?.profileImage || ""} />
                  <AvatarFallback>
                    {user_data?.user?.email
                      ? user_data.user.email.charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block">
                 <p className="capitalize"> {user_data?.user?.firstname} {user_data?.user?.lastname}</p> 
                </span>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <Separator />
              <DropdownMenuItem onClick={handleLogout}>
                {isLoggingOut ? "Logging out..." : "Sign out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
