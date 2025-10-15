import { X, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const InviteButton = () => (
  <button
    className="flex items-center justify-center gap-2 bg-[#FF5A1F] hover:bg-[#e14e17] text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md transition-all duration-200 hover:shadow-lg w-full mx-auto mb-6 border border-[#FF5A1F]"
    type="button"
  >
    <UserPlus className="w-5 h-5" />
    Invite to GIDIPitch
  </button>
);

interface SidebarProps {
  sidebarItems: {
    name: string;
    icon: React.ElementType;
    active: boolean;
    available: boolean;
    path: string;
  }[];
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  desktopSidebarVisible: boolean;
  setDesktopSidebarVisible: (value: boolean) => void;
  onPitchDeckClick: () => void; // ✅ new prop
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
      onPitchDeckClick(); // ✅ trigger modal
      setSidebarOpen(false);
    } else {
      navigate(item.path);
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex ${
          desktopSidebarVisible ? "w-64" : "w-16"
        } transition-all duration-300 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-col justify-between h-screen`}
      >
        <div className="p-2 mt-3">
          <nav className="space-y-2">
            {(sidebarItems || []).map((item) => (
              <Button
                key={item.name}
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start ${
                  !item.available ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!item.available}
                onClick={() => handleNavigation(item)}
                title={!desktopSidebarVisible ? item.name : undefined}
              >
                <item.icon
                  className={`${
                    desktopSidebarVisible ? "mr-3" : "mx-auto"
                  } h-4 w-4`}
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
              ? "px-4 mt-auto"
              : "flex justify-center pb-4 mt-auto"
          }
        >
          {desktopSidebarVisible ? (
            <InviteButton />
          ) : (
            <Button
              size="icon"
              variant="default"
              className="bg-[#FF5A1F] hover:bg-[#e14e17] text-white mb-6 shadow-md"
              title="Invite Team Member"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
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
            className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-md"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>

          <aside className="relative w-64 bg-white shadow-lg flex flex-col justify-between h-full">
            <div className="p-4">
              <nav className="space-y-2 mt-6">
                {(sidebarItems || []).map((item) => (
                  <Button
                    key={item.name}
                    variant={item.active ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      !item.available ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!item.available}
                    onClick={() => handleNavigation(item)}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
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
          </aside>
        </div>
      )}
    </>
  );
}
