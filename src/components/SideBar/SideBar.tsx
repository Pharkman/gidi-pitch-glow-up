import { X, UserPlus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Plus from '../../../public/assets/UserPlus.png'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout, useGetUser } from "@/lib/query";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { FiCreditCard } from "react-icons/fi";


const InviteButton = () => (
  <button
    className="flex items-center justify-center gap-2 bg-[#FF5A1F] hover:bg-[#e14e17] text-white px-6 py-3 rounded-lg font-medium text-sm  transition-all duration-200 hover:shadow-lg w-full mx-auto mb-4 border border-[#FF5A1F]"
    type="button"
  >
    <img src={Plus} alt=""/>
    Invite to GidiPitch
  </button>
);

interface SidebarProps {
  sidebarItems: {
    name: string;
    img: string; // updated type
    active: boolean;
    available: boolean;
    path: string;
  }[];
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  desktopSidebarVisible: boolean;
  setDesktopSidebarVisible: (value: boolean) => void;
  onPitchDeckClick: () => void;
}

export default function Sidebar({
  sidebarItems,
  sidebarOpen,
  setSidebarOpen,
  desktopSidebarVisible,
  onPitchDeckClick,
}: SidebarProps) {
  const navigate = useNavigate();

  const handleNavigation = (item: any) => {
    if (!item.available) return;

    if (item.name === "Pitch Deck Generator") {
      onPitchDeckClick();
      setSidebarOpen(false);
    } else {
      navigate(item.path);
      setSidebarOpen(false);
    }
  };
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const {data:user_data, isLoading} = useGetUser();

  const handleLogout = async () => {
  setIsLoggingOut(true);
  await logout();
  setIsLoggingOut(false);
};

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex ${
          desktopSidebarVisible ? "w-64" : "w-16"
        } transition-all duration-300 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-col justify-between `}
      >
        <div className="p-2 mt-3">
          <nav className="space-y-2">
            {(sidebarItems || []).map((item) => (
              <Button
                key={item.name}
                onClick={() => handleNavigation(item)}
                disabled={!item.available}
                title={!desktopSidebarVisible ? item.name : undefined}
                className={`w-full justify-start flex items-center gap-3 leading-[100%] text-[#858585] text-sm font-medium transition-all duration-200  rounded-[8px] p-[12px]
                  ${
                    item.active
                      ? "bg-[#FFF1EC] text-[#FF5A1F] hover:text-white p-[12px]"
                      : "bg-transparent text-[#858585] hover:text-white"
                  }
                  ${!item.available ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className={`${
                    desktopSidebarVisible ? "h-[20px] w-[20px]" : "mx-auto h-4 w-4"
                  }`}
                />
                {desktopSidebarVisible && (
                  <>
                    {item.name}
                    {!item.available && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        Soon
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            ))}
          </nav>
        </div>

        <div
          className={
            desktopSidebarVisible
              ? "px-4 mt-6"
              : "flex justify-center pb-4 "
          }
        >
          {desktopSidebarVisible ? (
            <div className="">
  {/* Invite Button */}
  <div className="w-full">
    <InviteButton />
  </div>

  {/* Purchase Token Button */}
  <hr />
  <button
    type="button"
    className="
    mt-4
      flex items-center justify-center gap-2
      w-full py-3 px-4 rounded-xl
      bg-gradient-to-r from-[#FF5A1F] to-[#FF7845]
      text-white font-semibold text-sm
      shadow-md hover:shadow-lg hover:scale-[1.02]
      active:scale-95 transition-all duration-200
    "
  >
    <FiCreditCard className="w-4 h-4" />
    Purchase Tokens
  </button>
</div>

          ) : (
            // <Button
            //   size="icon"
            //   variant="default"
            //   className="bg-[#FFF1EC] hover:bg-[#FFF1EC] text-white mb-6 shadow-md"
            //   title="Invite Team Member"
            // >
            //   <UserPlus className="h-4 w-4" />
            // </Button>
            <div></div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <button
            className="absolute top-4 right-4 z-50 bg-[#FFF1EC] rounded-full p-2 shadow-md"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>

          <aside className="relative w-64 bg-white shadow-lg flex flex-col justify-between h-full">
            <div className="p-2">
              <nav className="space-y-1 mt-6">
                {(sidebarItems || []).map((item) => (
                  <Button
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    disabled={!item.available}
                      className={`w-full justify-start flex items-center gap-3 leading-[100%] text-[#858585] text-sm font-medium transition-all duration-200  rounded-[8px] p-[12px]
                  ${
                    item.active
                      ? "bg-[#FFF1EC] text-[#FF5A1F] p-[12px]"
                      : "bg-transparent text-[#858585] hover:text-white"
                  }
                  ${!item.available ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="mr-3"
                    />
                    {item.name}
                    {!item.available && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        Soon
                      </Badge>
                    )}
                  </Button>
                ))}
              </nav>
            </div>
            <div className="p-4">
              <InviteButton />
            </div>

            <hr />

            {/* <div>
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
                onClick={() => navigate("/profile")}
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

            </div> */}
          </aside>
        </div>
      )}
    </>
  );
}
