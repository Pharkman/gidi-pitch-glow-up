import { useEffect, useState } from 'react';
import { 
  Plus, 
  FileText, 
  User, 
  BarChart3, 
  Target, 
  Users, 
  Brain, 
  Bell, 
  ChevronDown,
  Clock,
  ArrowUpRight,
  Sparkles,
  FileUp,
  Zap,
  X,
  UserPlus,
  Menu,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import GidiLogo from '@/assets/Frame 481473.png'
import Freepik1 from '@/assets/dashboard1.png'
import FreePik2 from '@/assets/freepik_assistant_1752223275476 1.png'
import FreePik3 from '@/assets/freepik_assistant_1752223862097 1.png'
import FreePiks4 from '@/assets/freepik_assistant_1752224107168 1.png'
import FreePiks5 from '@/assets/freepik_assistant_1752224815977 1.png'
import freePik_build1 from '@/assets/freepik_project.png'
import freepik_build2 from "@/assets/freepik_build2.png"
import freepik_build3 from "@/assets/freepik_buld3.png"
import freepik_build4 from "@/assets/freepik_build4.png"
import freepik_build5 from "@/assets/freepik_build5.png"
import freepik_build6 from "@/assets/freepik_build6.png"
import { getUserDetails, logout, useGetGeneratedDecks, useGetTokenFromQuery, useGetUser } from '@/lib/query';
import { useSearchParams } from 'react-router-dom';
import DashboardHeader from './component/Header';
import Sidebar from '@/components/SideBar/SideBar';
import { sidebarItems } from '@/components/SideBar/component/SideBarItems';
import CreatePitchDeckModal from '../PitchDeck/component/CreatePitchDeckModal';
import SearchBar from '@/components/SearchBar/SearchBar';
// Reusable ToolCard component
const ToolCard = ({ image, label, onClick, disabled, variant = 'grid', subtitle }: {
  image: string,
  label: string,
  onClick?: () => void,
  disabled?: boolean,
  variant?: 'grid' | 'project',
  subtitle?: string
}) => {

  


  if (variant === 'project') {
    return (
      <div className="bg-white rounded-xl shadow-md p-0 w-full border-1 border-[#E4E4E4CC]">
        <img src={image} alt={label} className="object-cover w-full h-[172px] rounded-t-xl" />
        <div className="w-full px-4 py-3">
          <div className="font-semibold text-base text-foreground mb-1">{label}</div>
          {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
        </div>
      </div>
    );
  }
  // Default to grid style
  return (
    <div
      className={`flex flex-col items-center bg-white border-1 border-[#E4E4E4CC] shadow-md rounded-[12px] pb-3 p-[3px] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={disabled ? undefined : onClick}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-disabled={disabled}
    >
      <div className='bg-[#F5F5F5] mx-auto flex justify-center w-full mb-2 rounded-[12px] h-[106px]'>
        <img src={image} alt={label} className="object-contain" />
      </div>
      <span className={`font-semibold text-base text-center ${disabled ? 'opacity-50' : ''}`}>{label}</span>
    </div>
  );
};

// Reusable InviteButton component
// const InviteButton = () => (
//   <button
//     className="flex items-center justify-center gap-2 bg-[#FF5A1F] hover:bg-[#e14e17] text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md transition-all duration-200 hover:shadow-lg w-full mx-auto mb-6 border border-[#FF5A1F]"
//     type="button"
//   >
//     <UserPlus className="w-5 h-5" />
//     Invite to GIDIPitch
//   </button>
// );

const Dashboard = () => {
  const {data:user_data, isLoading} = useGetUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedTool, setSelectedTool] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [user, setUser] = useState(null);
   const [showPitchDeckModal, setShowPitchDeckModal] = useState(false);

   const {data: generated_decks, isLoading: isLoadingGeneratedDecks} = useGetGeneratedDecks();
   console.log('generated', generated_decks);
   
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserDetails();
      setUser(userData);
    };

    fetchUser();
  }, []);




  const handleCreateNew = (tool: string) => {
    setSelectedTool(tool);
    setShowCreateModal(true);
  };

 const handleLogout = async () => {
  setIsLoggingOut(true);
  await logout();
  setIsLoggingOut(false);
};

 const { mutate: setToken } = useGetTokenFromQuery();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  
  


  useEffect(() => {
    if (token) {
      setToken(
        { token },
        {
          onSuccess: () => {
            console.log("Token saved successfully ✅");
          },
          onError: (err: unknown) => {
            if (err instanceof Error) {
              console.error("Failed to set token ❌", err.message);
            } else {
              console.error("Failed to set token ❌", "An unknown error occurred");
            }
          },
        }
      );
    }
  }, [token, setToken]);

  const username = `${user_data?.user?.firstname} ${user_data?.user?.lastname}`;


  return (
  <div className="h-screen bg-background flex flex-col overflow-hidden">

      {/* Top Navigation */}
   <DashboardHeader
    user_data={user_data}
    isLoggingOut={isLoggingOut}
    handleLogout={handleLogout}
    setSidebarOpen={setSidebarOpen}
    desktopSidebarVisible={desktopSidebarVisible}
    setDesktopSidebarVisible={setDesktopSidebarVisible}
  />

      <div className="flex">
        {/* Sidebar (Desktop) */}
 <Sidebar
  sidebarItems={sidebarItems}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  desktopSidebarVisible={desktopSidebarVisible}
  setDesktopSidebarVisible={setDesktopSidebarVisible}
  onPitchDeckClick={() => setShowPitchDeckModal(true)}
/>


        {/* Main Content */}
        <main
  className={`flex-1 overflow-y-auto py-6 px-6 max-sm:px-3 max-sm:py-3 transition-all duration-300 ${desktopSidebarVisible ? '' : 'md:ml-0'}`}
  style={{ height: "calc(100vh - 80px)" }}
>
          <div className="max-w-7xl mx-auto space-y-8 max-sm:space max-sm:space-y-5 max-sm:mt-1">
            <div className='flex justify-between'>
           <div className="flex flex-col items-start space-y-6 max-sm:space-y-4">
 
    <div>
      <h2
        className="
          text-2xl font-bold tracking-tight text-gray-900 
          sm:text-2xl md:text-2xl max-sm:text-xl 
          capitalize leading-tight mb-2
        "
      >
        {username ? `Welcome back, ${username}` : "Welcome back"}
      </h2>
      <p
        className="
          text-gray-600 text-base md:text-lg 
          max-sm:text-sm max-sm:leading-snug
        "
      >
        Ready to build your next <span className="text-[#FF5619] text-[16px] font-medium">investor-ready</span> document?
      </p>
    </div>
  </div>

  <div>
     <SearchBar />
  </div>
  </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-sm:gap-4 mb-8">
              <ToolCard image={FreePik2} label="Pitch Desk" onClick={() => handleCreateNew('Pitch Deck')} />
              <ToolCard image={FreePik3} label="Resume Builder" onClick={() => handleCreateNew('Resume')} disabled />
              <ToolCard image={Freepik1} label="YC Assistant" onClick={() => handleCreateNew('YC Assistant')} disabled />
              <ToolCard image={FreePiks4} label="Market Estimator" onClick={() => handleCreateNew('Market Estimator')} disabled />
              <ToolCard image={FreePiks5} label="AI Coach" onClick={() => handleCreateNew('AI Coach')} disabled />
            </div>



{/* Recents Title */}
<section className='flex justify-between items-center'>
<div>
              <p className='text-[#2D2D2D] font-semibold text-[18px]'>Recents</p>
            </div>


            {/* View Toggle */}
            <div className="flex items-center mb-4">
              <div className="flex bg-[#F5F5F5] rounded-xl p-1 w-[76px] h-[40px]">
                <button
                  className={`flex-1 flex items-center justify-center rounded-lg transition-colors h-[32px] w-[32px] ${view === 'grid' ? 'bg-white shadow font-semibold' : ''}`}
                  onClick={() => setView('grid')}
                  aria-label="Grid view"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="5" height="5" rx="1" fill="#2D2D2D"/><rect x="12" y="3" width="5" height="5" rx="1" fill="#2D2D2D"/><rect x="3" y="12" width="5" height="5" rx="1" fill="#2D2D2D"/><rect x="12" y="12" width="5" height="5" rx="1" fill="#2D2D2D"/></svg>
                </button>
                <button
                  className={`flex-1 flex items-center justify-center rounded-lg transition-colors h-[32px] w-[32px] ${view === 'list' ? 'bg-white shadow font-semibold' : ''}`}
                  onClick={() => setView('list')}
                  aria-label="List view"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="2.5" rx="1" fill="#2D2D2D"/><rect x="3" y="8.75" width="14" height="2.5" rx="1" fill="#2D2D2D"/><rect x="3" y="13.5" width="14" height="2.5" rx="1" fill="#2D2D2D"/></svg>
                </button>
              </div>
            </div>
            </section>
            
         {/* Recents Section */}
<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
  {isLoadingGeneratedDecks ? (
    <p className="text-gray-500 text-sm col-span-full text-center py-8">Loading your decks...</p>
  ) : generated_decks?.data?.decks?.length > 0 ? (
    generated_decks.data.decks.map((deck) => (
      <ToolCard
        key={deck._id}
        variant="project"
        image={
          deck?.slides?.length > 0 && deck?.slides[0]?.imageUrl
            ? deck.slides[0].imageUrl
            : freePik_build1 // fallback image if no image available
        }
        label={deck.startupName || "Untitled Deck"}
        subtitle={`Updated ${new Date(deck.updatedAt).toLocaleDateString()}`}
        onClick={() => window.open(deck.pdfUrl || "#", "_blank")}
      />
    ))
  ) : (
    <p className="text-gray-500 text-sm col-span-full text-center py-8">
      No decks created yet. Click <span className="text-[#FF5619] font-medium cursor-pointer" onClick={() => setShowPitchDeckModal(true)}>here</span> to create one.
    </p>
  )}
</div>


                 </div>
        </main>


      </div> 
      {/* Pitch Deck Creator */}
      {showPitchDeckModal && (
  <CreatePitchDeckModal   
    isOpen={showPitchDeckModal}
    onClose={() => setShowPitchDeckModal(false)}
  />
)}

      {/* Resume Builder Modal - placeholder */}
      {selectedTool === 'Resume' && (
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Resume</DialogTitle>
            </DialogHeader>
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Resume builder coming soon!</p>
              <Button onClick={() => setShowCreateModal(false)} className="mt-4">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;