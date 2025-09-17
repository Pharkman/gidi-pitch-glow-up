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
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PitchDeckCreator } from './PitchDeckCreator';
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
import { getUserDetails, logout } from '@/lib/query';
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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedTool, setSelectedTool] = useState('');
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
    // { name: 'AI Coach', icon: Brain, active: false, available: false },
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'AgriTech Pitch Deck',
      type: 'Pitch Deck',
      lastEdited: '2 hours ago',
      status: 'Draft'
    },
    {
      id: 2,
      name: 'Founder Resume',
      type: 'Resume',
      lastEdited: '1 day ago',
      status: 'Complete'
    },
    {
      id: 3,
      name: 'Series A Deck',
      type: 'Pitch Deck',
      lastEdited: '3 days ago',
      status: 'In Progress'
    }
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

  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 items-center px-6">
         <img src={GidiLogo} alt='GidiLogo'/>
          
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></div>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={handleLogout}>
  {isLoggingOut ? 'Logging out...' : 'Sign out'}
</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col justify-between h-screen">
          <div className="p-2 mt-3 ">
            <nav className="space-y-2 ">
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
          <div className="">
            <InviteButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div>
             <h2 className="text-2xl font-bold tracking-tight">
  {user?.name ? `Welcome back, ${user.name.split(' ')[0]}` : 'Welcome back'}
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

            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Recent Projects
                  </span>
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {project.type === 'Pitch Deck' ? (
                            <FileText className="h-5 w-5 text-primary" />
                          ) : (
                            <User className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {project.type} • Last edited {project.lastEdited}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={project.status === 'Complete' ? 'default' : 'secondary'}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}



            {/* Quick Stats */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Projects</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <Badge className="h-8 w-8 rounded-full flex items-center justify-center">
                      ✓
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Time Saved</p>
                      <p className="text-2xl font-bold">24h</p>
                    </div>
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div> */}
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