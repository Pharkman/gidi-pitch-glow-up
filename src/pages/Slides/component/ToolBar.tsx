import React, { useState } from "react";
import { Undo2, Redo2, Play, ChevronDown, Settings, User, HelpCircle, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Separator } from '@radix-ui/react-dropdown-menu'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout, useGetUser } from '@/lib/query'
import { useNavigate } from "react-router-dom";

export default function Toolbar() {
 const [isLoggingOut, setIsLoggingOut] = useState(false);
   const handleLogout = async () => {
  setIsLoggingOut(true);
  await logout();
  setIsLoggingOut(false);
};
  const navigate = useNavigate()
  const {data:user_data} = useGetUser()
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* Left Section - Undo / Redo */}
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-gray-600 hover:text-black transition">
          <Undo2 className="w-4 h-4" />
          <span className="text-sm font-medium">Undo</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-black transition">
          <Redo2 className="w-4 h-4" />
          <span className="text-sm font-medium">Redo</span>
        </button>
      </div>

      {/* Right Section - Play / Export / Avatar */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition">
          <Play className="w-4 h-4 fill-black" />
          <span className="text-sm font-medium">Play</span>
        </button>

        <button className="flex items-center gap-2 bg-[#FF5619] text-white px-4 py-2 rounded-md hover:bg-[#e04c15] transition">
          <span className="text-sm font-medium">Export</span>
        </button>

        <div>
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


<DropdownMenuContent
  align="end"
  className="w-40 mt-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 text-[15px] text-gray-800 p-2"
>
  {/* Profile */}
  <DropdownMenuItem
    onClick={() => navigate("/profile")}
    className="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 hover:bg-orange-50 focus:bg-orange-100 focus:text-orange-600 cursor-pointer"
  >
    <User className="w-5 h-5 text-orange-500" />
    <span>Profile</span>
  </DropdownMenuItem>

  {/* Settings */}
  <DropdownMenuItem
    onClick={() => navigate("/settings")}
    className="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 hover:bg-orange-50 focus:bg-orange-100 focus:text-orange-600 cursor-pointer"
  >
    <Settings className="w-5 h-5 text-orange-500" />
    <span>Settings</span>
  </DropdownMenuItem>

  {/* Help */}
  <DropdownMenuItem
    className="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 hover:bg-orange-50 focus:bg-orange-100 focus:text-orange-600 cursor-pointer"
  >
    <HelpCircle className="w-5 h-5 text-orange-500" />
    <span>Help</span>
  </DropdownMenuItem>

  <Separator className="my-2" />

  {/* Sign out */}
  <DropdownMenuItem
    onClick={handleLogout}
    className="flex items-center gap-3 px-3 py-2 text-red-600 rounded-md transition-all duration-150 hover:bg-red-50 focus:bg-red-100 cursor-pointer"
  >
    <LogOut className="w-5 h-5 text-red-500" />
    <span>{isLoggingOut ? "Logging out..." : "Sign out"}</span>
  </DropdownMenuItem>
</DropdownMenuContent>
       </DropdownMenu>
     </div>
      </div>
    </header>
  );
}
