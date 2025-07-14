import { useNavigate } from 'react-router-dom';
import { BarChart3, FileText, User, Target, Users, Brain, Bell, ChevronDown, MessageSquare, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { PitchDeckCreator } from '@/components/PitchDeckCreator';
import PageHeader from '@/components/PageHeader';
import Logo from '@/components/Logo';
import { Sidebar } from '@/components/ui/sidebar';

const samplePitchDecks = [
  { id: 1, name: 'AgriTech Pitch Deck', lastEdited: '2 hours ago', status: 'Draft' },
  { id: 2, name: 'FinTech Series A', lastEdited: '1 day ago', status: 'Complete' },
];

const sidebarItems = [
  { name: 'Dashboard', icon: BarChart3, route: '/dashboard', available: true },
  { name: 'Pitch Deck Generator', icon: FileText, route: '/pitch-decks', available: true },
  { name: 'Resume Builder', icon: User, route: '/resume-builder', available: true },
  { name: 'Financial Forecast', icon: BarChart3, route: '', available: false },
  { name: 'Market Estimator', icon: Target, route: '', available: false },
  { name: 'YC Assistant', icon: Users, route: '', available: false },
  { name: 'AI Coach', icon: Brain, route: '', available: false },
];

export default function PitchDecksPage() {
  const navigate = useNavigate();
  const [showPitchDeckModal, setShowPitchDeckModal] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <Sidebar
          footer={
            <div className="p-6 border-t space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => alert('Support coming soon!')}>
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
        <main className="main-wrapper flex-1">
          <div className="w-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2 w-full">
                <div>
                  <PageHeader heading="Pitch Decks" subheading="View, create, and manage all your pitch decks in one place." />
                </div>
                <Button onClick={() => setShowPitchDeckModal(true)} className="h-10 px-6">Create New Pitch Deck</Button>
              </div>
              <div className="grid gap-4 w-full">
                {samplePitchDecks.map(deck => (
                  <Card key={deck.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-muted/50 transition-colors cursor-pointer w-full">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <img src="/file.png" alt="Project Icon" className="h-6 w-6 object-contain" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg mb-1">{deck.name}</div>
                        <div className="text-muted-foreground text-sm">Last edited: {deck.lastEdited}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${deck.status === 'Complete' ? 'bg-green-100 text-green-800' : deck.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>{deck.status}</span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <PitchDeckCreator isOpen={showPitchDeckModal} onClose={() => setShowPitchDeckModal(false)} />
    </div>
  );
} 