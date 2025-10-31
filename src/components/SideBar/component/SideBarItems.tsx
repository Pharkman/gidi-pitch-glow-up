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
import Home from '../../../../public/assets/Home.png'
import Presentaion from '../../../../public/assets/Presentation.png'
import Resume from '../../../../public/assets/ReadCvLogo.png'
import Yc from '../../../../public/assets/HeadCircuit.png'
import Market from '../../../../public/assets/Crosshair.png'  
import Coach from '../../../../public/assets/Robot.png'
export const sidebarItems = [
  { name: 'Dashboard', img: Home, active: true, available: true, path: '/' },
  { name: 'Pitch Deck Generator', img: Presentaion, active: false, available: true, path: '/pitch-deck' },
  { name: 'Resume Builder', img: Resume, active: false, available: true, path: '/resume' },
  { name: 'YC Assistant', img: Yc, active: false, available: true, path: '/yc' },
  { name: 'Business Proposal', img: Market, active: false, available: true, path: '/bus-modal' },
  { name: 'AI Coach', img: Coach, active: false, available: true, path: '/ai-coach' },
];

