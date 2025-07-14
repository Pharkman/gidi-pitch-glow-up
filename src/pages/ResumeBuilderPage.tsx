import { useNavigate } from 'react-router-dom';
import { BarChart3, FileText, User, Target, Users, Brain, Bell, ChevronDown, Save, Share, Download, Plus, GripVertical, X, Edit, Trash2, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import PageHeader from '@/components/PageHeader';
import Logo from '@/components/Logo';
import { Sidebar } from '@/components/ui/sidebar';
import { MessageSquare, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { ResumeCreator } from '../components/ResumeCreator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const initialSections = [
  { id: 'summary', label: 'Summary', content: 'Edit your professional summary here...' },
  { id: 'experience', label: 'Experience', content: 'Add your work experience here...' },
  { id: 'education', label: 'Education', content: 'Add your education here...' },
  { id: 'skills', label: 'Skills', content: 'List your skills here...' },
];

const sampleResumes = [
  { id: 1, name: 'John Doe Resume', lastEdited: '3 days ago', status: 'Draft' },
  { id: 2, name: 'Jane Founder Resume', lastEdited: '1 week ago', status: 'Complete' },
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

export function ResumeEditorPage() {
  const [sections, setSections] = useState(initialSections);
  const [editingField, setEditingField] = useState<{ sectionIdx: number; type: 'text' | 'image' } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [newSectionLabel, setNewSectionLabel] = useState('');
  const [selection, setSelection] = useState<{ sectionIdx: number; text: string } | null>(null);
  const navigate = useNavigate();

  // Example: add image support to sections (for demo, only summary has image)
  const resumeData = sections.map((section, idx) => ({
    ...section,
    image: idx === 0 ? '/profile-demo.png' : undefined,
  }));

  const handleFieldClick = (sectionIdx: number, type: 'text' | 'image') => {
    setEditingField({ sectionIdx, type });
    if (type === 'text') {
      setEditValue(sections[sectionIdx].content);
      setShowEditModal(true);
    } else {
      setEditValue(resumeData[sectionIdx].image || '');
      setShowImageModal(true);
    }
  };

  const handleEditSave = () => {
    if (!editingField) return;
    const updated = [...sections];
    if (editingField.type === 'text') {
      updated[editingField.sectionIdx].content = editValue;
    }
    setSections(updated);
    setShowEditModal(false);
    setEditingField(null);
  };

  const handleImageSave = () => {
    setShowImageModal(false);
    setEditingField(null);
  };

  const handleSectionClick = (idx: number) => {
    setCurrentSection(idx);
    // Scroll to section in preview
    const el = document.getElementById(`resume-section-${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleAddSection = () => {
    if (!newSectionLabel.trim()) return;
    setSections([...sections, { id: Date.now().toString(), label: newSectionLabel, content: '' }]);
    setNewSectionLabel('');
  };
  const handleDeleteSection = (idx: number) => {
    if (sections.length === 1) return;
    const updated = sections.filter((_, i) => i !== idx);
    setSections(updated);
    setCurrentSection(Math.max(0, currentSection - (idx <= currentSection ? 1 : 0)));
  };
  const handleReorder = (from: number, to: number) => {
    if (from === to) return;
    const updated = [...sections];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setSections(updated);
    setCurrentSection(to);
  };

  // Handle text selection in resume preview
  const handleTextSelect = (sectionIdx: number, e: React.SyntheticEvent<HTMLDivElement>) => {
    const selectionObj = window.getSelection();
    if (selectionObj && selectionObj.toString().length > 0) {
      setSelection({ sectionIdx, text: selectionObj.toString() });
      setEditValue(sections[sectionIdx].content);
      setEditingField({ sectionIdx, type: 'text' });
      setShowEditModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Full-width header above sidebar and preview */}
      <div className="border-b bg-white px-6 py-3 flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ChevronLeft className="h-5 w-5" /></Button>
          <h1 className="text-lg font-semibold" style={{ color: '#FD621E' }}>Resume Editor</h1>
          <Badge variant="outline">Modern</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm"><Save className="h-4 w-4 mr-2" />Save</Button>
          <Button variant="outline" size="sm"><Share className="h-4 w-4 mr-2" />Share</Button>
          <DropdownMenu open={exportOpen} onOpenChange={setExportOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export <ChevronDown className="ml-1 h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => alert('Export as DOC')}>Export as DOC</DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert('Export as PDF')}>Export as PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-1">
        {/* Sidebar section list */}
        <div className="w-64 border-r bg-muted/30 flex flex-col">
          <div className="p-4 space-y-2 flex-1 overflow-y-auto">
            {sections.map((section, idx) => (
              <div key={section.id} className={`flex items-center group ${idx === currentSection ? 'ring-2 ring-primary bg-white' : ''} rounded transition-all cursor-pointer mb-1`}>
                <div className="flex-1 px-3 py-2" onClick={() => handleSectionClick(idx)}>
                  <div className="font-medium text-sm">{section.label}</div>
                </div>
                <button className="p-1 text-muted-foreground hover:text-red-600" onClick={() => handleDeleteSection(idx)} title="Delete section">
                  <Trash2 className="h-4 w-4" />
                </button>
                <button className="p-1 text-muted-foreground hover:text-blue-600" onClick={() => handleReorder(idx, Math.max(0, idx-1))} title="Move up" disabled={idx===0}>
                  <GripVertical className="h-4 w-4 rotate-180" />
                </button>
                <button className="p-1 text-muted-foreground hover:text-blue-600" onClick={() => handleReorder(idx, Math.min(sections.length-1, idx+1))} title="Move down" disabled={idx===sections.length-1}>
                  <GripVertical className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center mt-4">
              <Input
                value={newSectionLabel}
                onChange={e => setNewSectionLabel(e.target.value)}
                placeholder="Add section..."
                className="text-sm flex-1"
                onKeyDown={e => e.key === 'Enter' && handleAddSection()}
              />
              <Button size="icon" variant="ghost" onClick={handleAddSection}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
        <main className="main-wrapper flex-1 flex flex-col">
          {/* Main content: full resume preview, no overlay/box */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
            <div className="w-full max-w-2xl mx-auto">
              {/* Resume Header (Name, Title, Image) */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex-1">
                  <div id="resume-section-0" className="text-3xl font-bold cursor-pointer hover:bg-blue-50 rounded p-1 select-text" onMouseUp={e => handleTextSelect(0, e)} onClick={() => handleFieldClick(0, 'text')}>{sections[0].content || <span className="text-muted-foreground">&nbsp;</span>}</div>
                  <div className="text-lg text-muted-foreground mt-1 cursor-pointer hover:bg-blue-50 rounded p-1 select-text" onMouseUp={e => handleTextSelect(0, e)} onClick={() => handleFieldClick(0, 'text')}>Professional Summary</div>
                </div>
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-primary cursor-pointer" onClick={() => handleFieldClick(0, 'image')}>
                  <img src={resumeData[0].image} alt="Profile" className="object-cover w-full h-full" />
                </div>
              </div>
              {/* Resume Sections */}
              <div className="space-y-8">
                {sections.slice(1).map((section, idx) => (
                  <div key={section.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <h2 id={`resume-section-${idx+1}`} className="text-xl font-semibold flex-1 cursor-pointer hover:bg-blue-50 rounded p-1 select-text" onMouseUp={e => handleTextSelect(idx + 1, e)} onClick={() => handleFieldClick(idx + 1, 'text')}>{section.label}</h2>
                    </div>
                    <div className="text-base whitespace-pre-line min-h-[60px] cursor-pointer hover:bg-blue-50 rounded p-2 select-text" onMouseUp={e => handleTextSelect(idx + 1, e)} onClick={() => handleFieldClick(idx + 1, 'text')}>
                      {section.content || <span className="text-muted-foreground">Click to edit {section.label.toLowerCase()}...</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Edit Text Modal (styled like pitch deck text editor) */}
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Edit className="mr-2 h-5 w-5" />
                  Text Editor
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  className="min-h-[200px] text-base"
                  placeholder={`Edit your text here...`}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          {/* Edit Image Modal */}
          <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile Image</DialogTitle>
              </DialogHeader>
              <Input type="url" value={editValue} onChange={e => setEditValue(e.target.value)} placeholder="Paste image URL..." />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowImageModal(false)}>Cancel</Button>
                <Button onClick={handleImageSave}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}

export default function ResumeBuilderPage() {
  const navigate = useNavigate();
  const [showResumeModal, setShowResumeModal] = useState(false);
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
          {/* Sidebar nav here */}
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
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2 w-full">
              <div>
                <PageHeader heading="Resumes" subheading="Build, edit, and organize resumes for your team or yourself." />
              </div>
              <Button className="h-10 px-6" onClick={() => setShowResumeModal(true)}>Create New Resume</Button>
            </div>
            <div className="grid gap-4 w-full">
              {sampleResumes.map(resume => (
                <Card key={resume.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-muted/50 transition-colors cursor-pointer w-full">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <img src="/file.png" alt="Resume Icon" className="h-6 w-6 object-contain" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-1">{resume.name}</div>
                      <div className="text-muted-foreground text-sm">Last edited: {resume.lastEdited}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${resume.status === 'Complete' ? 'bg-green-100 text-green-800' : resume.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>{resume.status}</span>
                </Card>
              ))}
            </div>
          </div>
          <ResumeCreator isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
        </main>
      </div>
    </div>
  );
} 