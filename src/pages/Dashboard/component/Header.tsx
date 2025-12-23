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
import DeckloLogo from "../../../../public/assets/DecloLogo.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetUser } from "@/lib/query";
import NotificationButton from "@/pages/Notification/NotificationButton";


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
        <Loader2 size={40} className="animate-spin text-primary"/>
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
  src={DeckloLogo}
  alt="Gidi Logo"
  className="h-5 hidden md:block transition-all duration-300"
/>

          </div>

  {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/30 transition-all duration-300 shadow-sm"
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
          <NotificationButton />

          {/* USER MENU */}
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="
        flex items-center gap-2 p-1.5 rounded-full transition-all duration-300
        hover:bg-blue-50
        data-[state=open]:bg-blue-50
      "
    >
      <Avatar className="h-10 w-10 border border-gray-200">
        <AvatarImage src={user_data?.user?.profileImage || ""} />
        <AvatarFallback className="bg-primary text-white font-semibold">
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
      className="
       cursor-pointer
        hover:bg-primary
        focus:bg-primary
        data-[highlighted]:bg-primary
        active:bg-primary
        focus:text-white
        data-[highlighted]:text-white
      "
    >
      Profile
    </DropdownMenuItem>

    <DropdownMenuItem
      onClick={() => navigate("/settings")}
      className="
        cursor-pointer
        hover:bg-primary
        focus:bg-primary
        data-[highlighted]:bg-primary
        active:bg-primary
        focus:text-white
        data-[highlighted]:text-white
      "
    >
      Settings
    </DropdownMenuItem>

    <DropdownMenuItem
      onClick={() => navigate("/help")}
      className="
        cursor-pointer
        hover:bg-primary
        focus:bg-primary
        data-[highlighted]:bg-primary
        active:bg-primary
        focus:text-white
        data-[highlighted]:text-white
        hover:mb-2
      "
    >
      Help
    </DropdownMenuItem>

    <Separator />

    <DropdownMenuItem
      onClick={handleLogout}
      className="
        cursor-pointer
        hover:text-white
        hover:bg-red-800
        focus:bg-red-500
        data-[highlighted]:bg-red-600
        hover:mt-3
      "
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
