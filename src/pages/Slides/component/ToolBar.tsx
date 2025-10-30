import React, { useState } from "react";
import {
  Undo2,
  Redo2,
  Play,
  ChevronDown,
  Settings,
  User,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout, useGetUser } from "@/lib/query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function Toolbar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { data: user_data } = useGetUser();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  };

  const handlePlayClick = () => {
    toast("🚧 Coming soon!", {
      icon: "⏳",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        fontSize: "15px",
        padding: "30px"
      },
    });
  };

  const handleUndoRedo = () => {
    toast("🚧 Coming soon!", {
      icon: "⏳",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        fontSize: "15px",
        padding: "30px"
      },
    });
  };

      if (isLoggingOut) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <Loader2 size={40} className="animate-spin bg-[#FF3D00]"/>
      </div>
    );
  }

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-6 py-3 border-b bg-white shadow-sm relative">
      {/* Left Section - Undo / Redo */}
      <div className="flex items-center gap-4 md:gap-6">
        <div  onClick={handleUndoRedo} className="flex items-center gap-2 text-gray-600 hover:text-black transition cursor-pointer">
          <Undo2 className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Undo</span>
        </div>
        <div onClick={handleUndoRedo} className="flex items-center gap-2 text-gray-600 hover:text-black transition cursor-pointer">
          <Redo2 className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Redo</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handlePlayClick}
            className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            <Play className="w-4 h-4 fill-black" />
            <span className="text-sm font-medium">Play</span>
          </button>

          <button
            onClick={() => {
              const deckId = localStorage.getItem("deckId");
              if (deckId) navigate(`/exportslide`);
            }}
            className="flex items-center gap-2 bg-[#FF5619] text-white px-4 py-2 rounded-md hover:bg-[#e04c15] transition"
          >
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>

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
    className="w-48 rounded-lg mt-4 shadow-lg border border-gray-100 bg-primary space-y-3 p-4 text-white"
  >
    <DropdownMenuItem
      onClick={() => navigate("/profile")}
      className="cursor-pointer"
    >
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={() => navigate("/settings")}
      className="cursor-pointer"
    >
      Settings
    </DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer">
      Help
    </DropdownMenuItem>
    <Separator className="" />
    <DropdownMenuItem
      onClick={handleLogout}
      className="hover:bg-red-500"
    >
      {isLoggingOut ? "Logging out..." : "Sign out"}
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>



        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 hover:bg-gray-100 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-[60px] right-4 bg-white border rounded-xl shadow-lg w-44 p-3 flex flex-col gap-2 z-50 animate-slide-down">
          <button
            onClick={handlePlayClick}
            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
          >
            <Play className="w-4 h-4" />
            <span>Play</span>
          </button>

          <button
            onClick={() => {
              const deckId = localStorage.getItem("deckId");
              if (deckId) navigate(`/exportslide`);
            }}
            className="flex items-center gap-2 text-white bg-[#FF5619] px-3 py-2 rounded-md hover:bg-[#e04c15] transition"
          >
            <span>Export</span>
          </button>
        </div>
      )}
    </header>
  );
}
