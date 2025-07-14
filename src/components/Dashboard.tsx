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
  X,
  MessageSquare,
  CreditCard
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
import { colors, typography, spacing, breakpoints } from '@/design-system/tokens';
import { useNavigate } from 'react-router-dom';
import PageHeader from './PageHeader';
import Logo from './Logo';
import { Sidebar } from './ui/sidebar';
import { Input } from '@/components/ui/input';
import { ResumeCreator } from './ResumeCreator';

// Example usage: <div style={{ color: colors.brand }}> ... </div>
// Tailwind classes like 'bg-primary' map to colors.brand, see tokens.ts for mapping.

const Dashboard = () => {
  const [showPitchDeckModal, setShowPitchDeckModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [supportForm, setSupportForm] = useState({ subject: '', message: '' });
  const [showResumeModal, setShowResumeModal] = useState(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3, route: '/dashboard', available: true },
    { name: 'Pitch Deck Generator', icon: FileText, route: '/pitch-decks', available: true },
    { name: 'Resume Builder', icon: User, route: '/resume-builder', available: true },
    { name: 'Financial Forecast', icon: BarChart3, route: '', available: false },
    { name: 'Market Estimator', icon: Target, route: '', available: false },
    { name: 'YC Assistant', icon: Users, route: '', available: false },
    { name: 'AI Coach', icon: Brain, route: '', available: false },
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
  };

  const handleStartCreation = (method: string) => {
    console.log(`Starting ${selectedTool} with ${method}`);
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

  const handleSupportChange = (e) => {
    setSupportForm({ ...supportForm, [e.target.name]: e.target.value });
  };
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setShowSupportModal(false);
    setShowThankYouModal(true);
    setSupportForm({ subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      {/* Remove header section (top navigation bar) */}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          footer={
            <div className="p-6 border-t space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setShowSupportModal(true)}>
                <MessageSquare className="mr-3 h-4 w-4" /> Support
              </Button>
              <Button variant="ghost" className="w-full justify-start relative">
                <CreditCard className="mr-3 h-4 w-4" /> Subscription
                <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/team-members')}>
                <Users className="mr-3 h-4 w-4" /> Team Members
              </Button>
            </div>
          }
          className="w-[220px] min-h-screen"
        >
          <nav className="space-y-2 px-4 pb-6">
            {sidebarItems.map((item) => (
              <Button
                key={item.name}
                variant={window.location.pathname === item.route ? 'default' : 'ghost'}
                className={`w-full justify-start ${!item.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!item.available}
                onClick={() => item.route && navigate(item.route)}
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
        </Sidebar>

        {/* Main Content */}
        <main className="main-wrapper">
          <PageHeader heading="Welcome back, John!" />
          <div className="w-full">
            {/* Welcome Section */}
            <div>
              <p className="text-muted-foreground mb-2 text-base">
                Ready to build your next investor-ready document?
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <button
                onClick={() => setShowPitchDeckModal(true)}
                className="p-6 bg-card border rounded-lg hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <span className="font-medium text-sm">Pitch Deck</span>
              </button>
              
              <button
                onClick={() => setShowResumeModal(true)}
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
            <div className="mb-8">
              <div className="mb-2">
                <span className="text-xl font-semibold">Recent Projects</span>
              </div>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <img src="/file.png" alt="Project Icon" className="h-6 w-6 object-contain" />
                      </div>
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.type}  Last edited {project.lastEdited}
                        </p>
                      </div>
                    </div>
                    <span
                      className={
                        project.status === 'Complete'
                          ? 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 hover:bg-green-200 transition-colors'
                          : project.status === 'In Progress'
                          ? 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors'
                          : 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors'
                      }
                    >
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats - REMOVE THIS SECTION */}
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

      {/* Pitch Deck Creator Modal */}
      <PitchDeckCreator isOpen={showPitchDeckModal} onClose={() => setShowPitchDeckModal(false)} />

      {/* Resume Creator Modal */}
      <ResumeCreator isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />

      {/* Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 bg-[#F8F6F4]">
                <AvatarImage src="" />
                <AvatarFallback className="text-base">JD</AvatarFallback>
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

      {/* Support Modal */}
      <Dialog open={showSupportModal} onOpenChange={setShowSupportModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Leave Feedback & Support</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSupportSubmit} className="space-y-4 mt-4">
            <Input name="subject" placeholder="Subject" value={supportForm.subject} onChange={handleSupportChange} required />
            <textarea name="message" placeholder="Your feedback or support request..." value={supportForm.message} onChange={handleSupportChange} className="w-full min-h-[80px] p-2 border rounded" required />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowSupportModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Thank You Modal */}
      <Dialog open={showThankYouModal} onOpenChange={setShowThankYouModal}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle>Thank You!</DialogTitle>
          </DialogHeader>
          <p className="mb-4">Your feedback or support request has been received. We'll get back to you soon.</p>
          <Button onClick={() => setShowThankYouModal(false)} className="mx-auto">Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;