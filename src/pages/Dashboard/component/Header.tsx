import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Loader,
  Loader2,
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
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetUser } from "@/lib/query";


const DashboardHeader = ({
  user_data,
  isLoggingOut,
  handleLogout,
  setSidebarOpen,
  desktopSidebarVisible,
  setDesktopSidebarVisible,
}) => {
  const navigate = useNavigate();
  const token = `${user_data?.user?.tokens}` ;



  


    if (isLoggingOut) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <Loader2 size={40} className="animate-spin text-[#FF3D00]"/>
      </div>
    );
  }


  return (
    <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-1 md:px-6">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
        

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none">
            {/* <img
              src={Gidi_small}
              alt="Gidi Logo Small"
              className="h-8 block md:hidden transition-all duration-300"
            /> */}
            <img
              src={GidiLogo}
              alt="Gidi Logo"
              className="h-8 hidden md:block transition-all duration-300"
            />
          </div>

  {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 hover:border-[#FF5619] hover:bg-[#FFF3EF] transition-all duration-300 shadow-sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5 text-gray-800" />
          </button>
          {/* Desktop Sidebar Toggle */}
          <button
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all duration-300"
            onClick={() => setDesktopSidebarVisible(!desktopSidebarVisible)}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: desktopSidebarVisible ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {desktopSidebarVisible ? (
                <PanelLeftClose className="h-5 w-5 text-gray-500" />
              ) : (
                <PanelLeft className="h-5 w-5 text-gray-500" />
              )}
            </motion.div>
          </button>

          {/* Optional Title */}
          <h1 className="text-[16px] text-[#1D1D1D] pl-20 font-semibold hidden md:block tracking-tight">
            Dashboard
          </h1>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3 md:gap-5">
         <div className="flex items-center justify-center bg-primary p-[2px] rounded-full">
  <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-full py-[4px] px-4">
    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide uppercase">
      Tokens: 
    </span>
    <p className="text-[16px] sm:text-[16px] font-bold text-primary animate-pulse">
      {token}
    </p>
  </div>
</div>

          {/* Notification Bell */}
          <button className=" sm:flex items-center justify-center p-2 rounded-full bg-gray-50 hover:bg-[#FFF3EF] hover:text-[#FF5619] border border-gray-200 transition-all duration-300 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-1 block h-2.5 w-2.5 bg-[#FF5619] rounded-full"></span>
          </button>

          {/* USER MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-full transition-all duration-300"
              >
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage src={user_data?.user?.profileImage || ""} />
                  <AvatarFallback className="bg-[#FF5619] text-white font-semibold">
                    {user_data?.user?.firstname && user_data?.user?.lastname
                      ? `${user_data.user.firstname.charAt(0)}${user_data.user.lastname.charAt(0)}`.toUpperCase()
                      : user_data?.user?.email
                      ? user_data.user.email.charAt(0).toUpperCase()
                      : "NA"}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 rounded-lg shadow-lg border border-gray-100"
            >
              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="hover:bg-gray-50"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="hover:bg-gray-50"
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-50">
                Help
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50"
              >
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
