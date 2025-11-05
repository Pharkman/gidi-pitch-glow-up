import { useEffect, useState } from 'react';
import noDecks from '../../../public/assets/nodecks.png'
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
import { getUserDetails, logout, useDeleteDeneratedDeck, useGetGeneratedDecks, useGetTokenFromQuery, useGetUser, useSearchDeck } from '@/lib/query';
import { useSearchParams } from 'react-router-dom';
import DashboardHeader from './component/Header';
import Sidebar from '@/components/SideBar/SideBar';
import { sidebarItems } from '@/components/SideBar/component/SideBarItems';
import CreatePitchDeckModal from '../PitchDeck/component/CreatePitchDeckModal';
import SearchBar from '@/components/SearchBar/SearchBar';
import GreetingHeader from '@/components/Greeting/GreetingHeader';
import { FiTrash2 } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Spinner from '@/components/spinner';
// Reusable ToolCard component
const ToolCard = ({
  image,
  label,
  onClick,
  disabled,
  variant = "grid",
  subtitle,
}) => {
  const { mutate: deleteDeck, isPending } = useDeleteDeneratedDeck();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation(); 
    setDeleting(true);
    deleteDeck(onClick, {
      onSuccess: () => {
        setDeleting(false);
        toast.success("Deck deleted successfully");
      },
      onError: () => {
        setDeleting(false);
       toast.error("Failed to delete deck");
      },
    });
  };

  if (variant === "project") {
    return (
      <div className="bg-white rounded-xl shadow-md p-0 w-full border border-[#E4E4E4CC]">
        {/* Image */}
        <img
          src={image}
          alt={label}
          className="object-cover w-full h-[172px] rounded-t-xl"
        />

        {/* Content */}
        <div className="w-full px-4 py-3">
          {/* Title */}
          <div className="font-semibold text-[#1D1D1D] text-base text-foreground mb-1">
            {label}
          </div>

          {/* Subtitle and Button Row */}
          <div className="flex items-center justify-between">
            {subtitle && (
              <div className="text-sm text-muted-foreground">{subtitle}</div>
            )}
            <div className="flex items-center gap-2">
              {/* View Deck Button */}
              <button
                onClick={() => {
                  localStorage.setItem("deckId", onClick || "");
                  window.location.href = "/deck";
                }}
                className="border border-[#FF5A1F] text-[#FF5A1F] bg-white/90 backdrop-blur-sm text-xs px-3 py-1.5 rounded-md shadow-sm hover:bg-[#FF5A1F] hover:text-white transition-all duration-200"
              >
                View Deck
              </button>

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                disabled={isPending || deleting}
                className="border border-red-500 text-red-500 bg-white/90 text-xs px-3 py-1.5 rounded-md shadow-sm hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center gap-1"
              >
                {deleting ? <Loader2 size={16} className='animate-spin'/> : <FiTrash2 className="text-sm" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default (grid)
  return (
    <div
      className={`flex flex-col items-center bg-white border border-[#E4E4E4CC] shadow-md rounded-[12px] pb-3 p-[3px] ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={disabled ? undefined : onClick}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-disabled={disabled}
    >
      <div className="bg-[#F5F5F5] mx-auto flex justify-center w-full mb-2 rounded-[12px] h-[106px]">
        <img src={image} alt={label} className="object-contain" />
      </div>
      <span
        className={`font-semibold text-base text-center ${
          disabled ? "opacity-50" : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
};


const Dashboard = () => {
  const {data:user_data} = useGetUser();
  const [searchValue, setSearchValue] = useState("");
  const { data: searchResults, isLoading: isSearching } = useSearchDeck(searchValue);
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
            <div className='flex justify-between max-sm:flex-col max-sm:gap-4'>
           <div className="flex flex-col items-start space-y-6 max-sm:space-y-4">
 
    <div>
      <GreetingHeader username={username} />
      <p
        className="
          text-[#858585] text-[15px] md:text-[15px]  
          max-sm:text-[13px] max-sm:leading-snug
        "
      >
        Ready to  your next <span className="">investor-ready</span> document?
      </p>
    </div>
  </div>

  <div>
  <SearchBar onSearch={(term) => setSearchValue(term)} />
  </div>
  </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-sm:gap-4 mb-8">
              <ToolCard image={FreePik2} label="Pitch Deck" onClick={() => handleCreateNew('Pitch Deck')} />
              <ToolCard image={FreePiks5} label="AI Pitch Practice" onClick={() => handleCreateNew('AI Picth Practice')} disabled />
              <ToolCard image={FreePiks4} label="Business Proposal" onClick={() => handleCreateNew('Business Proposal')} disabled />
              <ToolCard image={FreePik3} label="Resume Builder" onClick={() => handleCreateNew('Resume')} disabled />
              <ToolCard image={Freepik1} label="YC Assistant" onClick={() => handleCreateNew('YC Assistant')} disabled />
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
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  {isSearching ? (
  <p className="text-gray-500 text-sm col-span-full text-center py-8">
      <div className='flex justify-center items-center mx-auto'>
     <Spinner />
  </div>
  </p>
) : searchValue ? (
  searchResults?.data?.decks?.length > 0 ? (
    searchResults.data.decks.map((deck) => (
      <ToolCard
        key={deck._id}
        variant="project"
        image={deck?.slides?.[0]?.imageUrl || freePik_build1}
        label={deck.startupName || "Untitled Deck"}
        subtitle={`Updated ${new Date(deck.updatedAt).toLocaleDateString()}`}
        onClick={deck._id}
      />
    ))
  ) : (
    <p className="text-gray-500 text-center col-span-full py-8">
      No decks found for “{searchValue}”
    </p>
  )
) : isLoadingGeneratedDecks ? (
   <p className="text-gray-500 text-sm col-span-full text-center py-8">
      <div className='flex justify-center items-center mx-auto'>
     <Spinner />
  </div>
  </p>
) : generated_decks?.data?.decks?.length > 0 ? (
  generated_decks.data.decks.map((deck) => (
    <ToolCard
      key={deck._id}
      variant="project"
      image={deck?.slides?.[0]?.imageUrl || freePik_build1}
      label={deck.startupName || "Untitled Deck"}
      subtitle={`Updated ${new Date(deck.updatedAt).toLocaleDateString()}`}
      onClick={deck._id}
    />
  ))
) : (
  <div className="text-center col-span-full py-8">
    <img src={noDecks} alt="No decks" className="mx-auto mb-4" />
    <p className="font-semibold text-[#1D1D1D]">No Recent Work Yet</p>
    <p className="text-[#5D5D5D] text-sm">
      Your recent projects will appear here once you create a pitch deck or resume.
    </p>
  </div>
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