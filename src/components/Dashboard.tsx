import { useState } from 'react';
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
  X
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

const Dashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3, active: true, available: true },
    { name: 'Pitch Deck Generator', icon: FileText, active: false, available: true },
    { name: 'Resume Builder', icon: User, active: false, available: true },
    { name: 'Financial Forecast', icon: BarChart3, active: false, available: false },
    { name: 'Market Estimator', icon: Target, active: false, available: false },
    { name: 'YC Assistant', icon: Users, active: false, available: false },
    { name: 'AI Coach', icon: Brain, active: false, available: false },
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

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      // Here you would handle actual sign out logic
      console.log('Signing out...');
      // For now, just redirect to home page
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gradient-primary">GidiPitch</h1>
          </div>
          
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
                <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowSettingsModal(true)}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowHelpModal(true)}>
                  Help
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.name}
                  variant={item.active ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    !item.available ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, John!</h2>
              <p className="text-muted-foreground">
                Ready to build your next investor-ready document?
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <button
                onClick={() => handleCreateNew('Pitch Deck')}
                className="p-6 bg-card border rounded-lg hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <span className="font-medium text-sm">Pitch Deck</span>
              </button>
              
              <button
                onClick={() => handleCreateNew('Resume')}
                className="p-6 bg-card border rounded-lg hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <span className="font-medium text-sm">Resume Builder</span>
              </button>
              
              <div className="p-6 bg-card border rounded-lg opacity-50 cursor-not-allowed flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <span className="font-medium text-sm">YC Assistant</span>
              </div>
              
              <div className="p-6 bg-card border rounded-lg opacity-50 cursor-not-allowed flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <span className="font-medium text-sm">Market Estimator</span>
              </div>
              
              <div className="p-6 bg-card border rounded-lg opacity-50 cursor-not-allowed flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-orange-600" />
                </div>
                <span className="font-medium text-sm">AI Coach</span>
              </div>
            </div>

            {/* Recent Projects */}
            <Card>
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
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-muted-foreground">john.doe@example.com</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowProfileModal(false)}>
                Cancel
              </Button>
              <Button>Edit Profile</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Preferences</h4>
              <div className="space-y-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Email notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Auto-save drafts</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Modal */}
      <Dialog open={showHelpModal} onOpenChange={setShowHelpModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Help & Support</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Quick Links</h4>
              <div className="space-y-1">
                <a href="#" className="block text-sm text-primary hover:underline">
                  Getting Started Guide
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Video Tutorials
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  FAQ
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Contact Support
                </a>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setShowHelpModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;