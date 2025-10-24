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

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-6 py-3 border-b bg-white shadow-sm">
      {/* Left Section - Logo & Undo / Redo */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 text-gray-600 hover:text-black transition cursor-pointer">
          <Undo2 className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Undo</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 hover:text-black transition cursor-pointer">
          <Redo2 className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Redo</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Buttons - hidden on small screens */}
        <div className="hidden md:flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition">
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

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-0">
              <Avatar className="h-[38px] w-[38px]">
                <AvatarImage src={user_data?.user?.profileImage || ""} />
                <AvatarFallback className="bg-primary text-white font-semibold">
                  {user_data?.user?.firstname && user_data?.user?.lastname
                    ? `${user_data.user.firstname.charAt(0)}${user_data.user.lastname.charAt(0)}`
                    : user_data?.user?.email
                    ? user_data.user.email.charAt(0).toUpperCase()
                    : "NA"}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-44 mt-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 text-[15px] text-gray-800 p-2"
          >
            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-orange-50 focus:bg-orange-100 focus:text-orange-600 cursor-pointer"
            >
              <User className="w-5 h-5 text-orange-500" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate("/settings")}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-orange-50 focus:bg-orange-100 focus:text-orange-600 cursor-pointer"
            >
              <Settings className="w-5 h-5 text-orange-500" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-orange-50 focus:bg-orange-100 focus:text-orange-600 cursor-pointer">
              <HelpCircle className="w-5 h-5 text-orange-500" />
              <span>Help</span>
            </DropdownMenuItem>

            <Separator className="my-2" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-red-600 rounded-md hover:bg-red-50 focus:bg-red-100 cursor-pointer"
            >
              <LogOut className="w-5 h-5 text-red-500" />
              <span>{isLoggingOut ? "Logging out..." : "Sign out"}</span>
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

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-[60px] right-4 bg-white border rounded-xl shadow-lg w-44 p-3 flex flex-col gap-2 z-50 animate-slide-down">
          <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition">
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
