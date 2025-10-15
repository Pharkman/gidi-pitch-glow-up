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
  
export const sidebarItems = [
  { name: 'Dashboard', icon: BarChart3, active: true, available: true, path: '/' },
  { name: 'Pitch Deck Generator', icon: FileText, active: false, available: true, path: '/pitch-deck' },
  { name: 'Resume Builder', icon: User, active: false, available: true, path: '/resume' },
  { name: 'Financial Forecast', icon: BarChart3, active: false, available: true, path: '/financial' },
  { name: 'Market Estimator', icon: Target, active: false, available: true, path: '/market' },
  { name: 'YC Assistant', icon: Users, active: false, available: true, path: '/yc-assistant' },
  { name: 'AI Coach', icon: Brain, active: false, available: true, path: '/ai-coach' },
];

