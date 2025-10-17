import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  PanelLeft,
  PanelLeftClose,
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
import { useLocation, useNavigate } from "react-router-dom";
// import { getPageTitle } from "@/lib/utils/getPageTitle";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const DashboardHeader = ({
  user_data,
  isLoggingOut,
  handleLogout,
  setSidebarOpen,
  desktopSidebarVisible,
  setDesktopSidebarVisible,
}) => {
  const navigate = useNavigate(); 
  // const pageTitle = getPageTitle(location.pathname);
  
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between ">
        {/* Left side: Mobile Menu + Logo + Page Title */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>

   {/* Logo */}
          <img src={GidiLogo} alt="GidiLogo" className="h-8 cursor-pointer" />
          {/* Desktop Sidebar Toggle Button */}
          <button 
            className="hidden md:flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100"
            onClick={() => setDesktopSidebarVisible(!desktopSidebarVisible)}
          >
            {desktopSidebarVisible ? (
              <PanelLeftClose className="h-5 w-5 text-gray-500" />
            ) : (
              <PanelLeft className="h-5 w-5 text-gray-500" />
            )}
          </button>

       
          
          {/* Page Title */}
          <h1 className="text-[16px] text-[#1D1D1D] pl-24 font-semibold hidden md:block"></h1>
        </div>

        {/* Right side: Theme Toggle + Notifications + User Menu */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Theme Toggle */}
          {/* <ThemeToggle /> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="none" className="flex items-center space-x-0">
                <Avatar className="h-[40px] w-[40px]">
  <AvatarImage src={user_data?.user?.profileImage || ""} />
  <AvatarFallback className="bg-primary text-white font-semibold">
    {user_data?.user?.firstname && user_data?.user?.lastname
      ? `${user_data.user.firstname.charAt(0)}${user_data.user.lastname.charAt(0)}`.toUpperCase()
      : user_data?.user?.email
      ? user_data.user.email.charAt(0).toUpperCase()
      : "NA"}
  </AvatarFallback>
</Avatar>

                <ChevronDown className="h-6 w-6 md:h-9 md:w-9 block" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
             <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownMenuItem>

              {/* ✅ Navigate to /setting when clicked */}
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>

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
