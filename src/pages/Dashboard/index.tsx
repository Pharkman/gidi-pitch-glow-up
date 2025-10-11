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
import { getUserDetails, logout, useGetTokenFromQuery, useGetUser } from '@/lib/query';
import { useSearchParams } from 'react-router-dom';
import DashboardHeader from './component/Header';
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
const InviteButton = () => (
  <button
    className="flex items-center gap-2 bg-[#FF5A1F] hover:bg-[#e14e17] text-white px-6 py-2 rounded-lg font-semibold text-base shadow transition-colors"
    type="button"
  >
    <UserPlus className="w-5 h-5" />
    Invite to GIDIPitch
  </button>
);

const Dashboard = () => {
  const {data:user_data, isLoading} = useGetUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedTool, setSelectedTool] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserDetails();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3, active: true, available: true },
    { name: 'Pitch Deck Generator', icon: FileText, active: false, available: true },
    { name: 'Resume Builder', icon: User, active: false, available: true },
    { name: 'Financial Forecast', icon: BarChart3, active: false, available: true },
    { name: 'Market Estimator', icon: Target, active: false, available: true },
    { name: 'YC Assistant', icon: Users, active: false, available: true },
    { name: 'AI Coach', icon: Brain, active: false, available: true },
  ];



  const handleCreateNew = (tool: string) => {
    setSelectedTool(tool);
    setShowCreateModal(true);
  };

  const handleStartCreation = (method: string) => {
    console.log(`Starting ${selectedTool} with ${method}`);
    setShowCreateModal(false);
    // Here you would navigate to the respective tool
  };

 const handleLogout = async () => {
  setIsLoggingOut(true);
  await logout();
  setIsLoggingOut(false);
};

 const { mutate: setToken } = useGetTokenFromQuery();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  
  

  // Call token setter immediately when token exists
  useEffect(() => {
    if (token) {
      setToken(
        { token },
        {
          onSuccess: () => {
            console.log("Token saved successfully ✅");
          },
          onError: (err: any) => {
            console.error("Failed to set token ❌", err);
          },
        }
      );
    }
  }, [token, setToken]);

  const username = `${user_data?.user?.firstname} ${user_data?.user?.lastname}`;


  return (
    <div className="min-h-screen bg-background flex flex-col">
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
<aside className={`hidden md:flex ${desktopSidebarVisible ? 'w-64' : 'w-16'} transition-all duration-300 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-col justify-between h-screen`}>
  <div className="p-2 mt-3">
    <nav className="space-y-2">
      {sidebarItems.map((item) => (
        <Button
          key={item.name}
          variant={item.active ? 'default' : 'ghost'}
          className={`w-full justify-start ${!item.available ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!item.available}
          title={!desktopSidebarVisible ? item.name : undefined}
        >
          <item.icon className={`${desktopSidebarVisible ? 'mr-3' : 'mx-auto'} h-4 w-4`} />
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
  <div className={desktopSidebarVisible ? '' : 'flex justify-center pb-4'}>
    {desktopSidebarVisible ? (
      <InviteButton />
    ) : (
      <Button size="icon" variant="ghost" title="Invite Team Member">
        <UserPlus className="h-4 w-4" />
      </Button>
    )}
  </div>
</aside>

{/* Sidebar (Mobile Drawer) */}
{sidebarOpen && (
  <div className="fixed inset-0 z-50 flex md:hidden">
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/40"
      onClick={() => setSidebarOpen(false)}
    />
    
    {/* Toggle Button (Mobile) */}
    <button 
      className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-md"
      onClick={() => setSidebarOpen(false)}
    >
      <X className="h-5 w-5" />
    </button>

    {/* Drawer */}
    <aside className="relative w-64 bg-white shadow-lg flex flex-col justify-between h-full">
      <div className="p-4">
        <button
          className="absolute top-3 right-3"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
        <nav className="space-y-2 mt-6">
          {sidebarItems.map((item) => (
            <Button
              key={item.name}
              variant={item.active ? 'default' : 'ghost'}
              className={`w-full justify-start ${!item.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!item.available}
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


        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${desktopSidebarVisible ? '' : 'md:ml-0'}`}>
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div>
             {/* <h2 className="text-2xl font-bold tracking-tight">
  {user?.name ? `Welcome back, ${user.name.split(' ')[0]}` : 'Welcome back'}
</h2> */}
<h2
  className="
    text-2xl font-bold tracking-tight text-gray-900 
    max-sm:text-lg max-sm:font-semibold max-sm:mb-1 max-sm:leading-snug capitalize mb-3
  "
>
  {username ? `Welcome back, ${username}` : "Welcome back"}
</h2>


              <p className="text-muted-foreground">
                Ready to build your next investor-ready document?
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
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
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <ToolCard variant="project" image={freePik_build1} label="Pitch Desk" subtitle="Updated 8mins ago" />
              <ToolCard variant="project" image={freepik_build2} label="Resume Builder" subtitle="Updated 8mins ago" onClick={() => handleCreateNew('Resume')} disabled />
              <ToolCard variant="project" image={freepik_build3} label="YC Assistant" subtitle="Updated 8mins ago" onClick={() => handleCreateNew('YC Assistant')} disabled />
              <ToolCard variant="project" image={freepik_build4} label="Market Estimator" subtitle="Updated 8mins ago" onClick={() => handleCreateNew('Market Estimator')} disabled />
              <ToolCard variant="project" image={freepik_build5} label="AI Coach" subtitle="Updated 8mins ago" onClick={() => handleCreateNew('AI Coach')} disabled />
              <ToolCard variant="project" image={freepik_build6} label="AI Coach" subtitle="Updated 8mins ago" onClick={() => handleCreateNew('AI Coach')} disabled />
            </div>

                 </div>
        </main>
      </div>

      {/* Pitch Deck Creator */}
      {selectedTool === 'Pitch Deck' && (
        <PitchDeckCreator 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
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