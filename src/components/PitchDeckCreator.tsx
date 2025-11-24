import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, FileText, Upload, Palette, Type, Wand2, ArrowLeft } from 'lucide-react';
import { PitchDeckEditor } from './PitchDeckEditor';
import { colors, typography } from '@/design-system/tokens';
import { useNavigate } from 'react-router-dom';

interface PitchDeckCreatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type CreationStep = 'mode-selection' | 'ai-prompt' | 'paste' | 'ai-loading' | 'ai-styling' | 'template-gallery' | 'file-upload' | 'editor';

const templates = [
  { id: 'modern', name: 'Modern', preview: '/api/placeholder/300/200', description: 'Clean and professional' },
  { id: 'minimal', name: 'Minimal', preview: '/api/placeholder/300/200', description: 'Simple and elegant' },
  { id: 'visual', name: 'Visual-first', preview: '/api/placeholder/300/200', description: 'Image-focused design' },
  { id: 'corporate', name: 'Corporate', preview: '/api/placeholder/300/200', description: 'Traditional business' },
  { id: 'startup', name: 'Startup', preview: '/api/placeholder/300/200', description: 'Bold and innovative' },
  { id: 'tech', name: 'Tech', preview: '/api/placeholder/300/200', description: 'Modern tech aesthetic' },
];

const fontPairings = [
  { id: 'modern', name: 'Modern', heading: typography.fontFamily, body: typography.fontFamily },
  { id: 'classic', name: 'Classic', heading: 'Playfair Display', body: 'Source Sans Pro' },
  { id: 'minimal', name: 'Minimal', heading: 'Poppins', body: 'Open Sans' },
  { id: 'elegant', name: 'Elegant', heading: 'Merriweather', body: 'Lato' },
];

const colorSchemes = [
  { id: 'blue', name: 'Professional Blue', primary: colors.brand, secondary: colors.surface, accent: '#60A5FA' },
  { id: 'purple', name: 'Creative Purple', primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
  { id: 'green', name: 'Growth Green', primary: '#10B981', secondary: '#059669', accent: '#34D399' },
  { id: 'orange', name: 'Energy Orange', primary: '#F59E0B', secondary: '#D97706', accent: '#FBBF24' },
  { id: 'dark', name: 'Executive Dark', primary: '#1F2937', secondary: '#111827', accent: '#6B7280' },
];

// Stepper component for modal
function Stepper({ step }: { step: CreationStep }) {
  const steps = [
    { key: 'ai-prompt', label: 'Generate with AI' },
    { key: 'paste', label: 'Paste' },
    { key: 'import', label: 'Import' },
  ];
  const activeIndex = step === 'ai-prompt' ? 0 : step === 'paste' ? 1 : step === 'file-upload' ? 2 : -1;
  return (
    <div className="flex justify-center gap-4 mb-6">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-white ${
              i === activeIndex ? 'bg-[#2563EB]' : 'bg-muted'
            }`}
          >
            {i + 1}
          </div>
          <span className={`ml-2 text-sm ${i === activeIndex ? 'text-[#2563EB]' : 'text-muted-foreground'}`}>{s.label}</span>
          {i < steps.length - 1 && <div className="mx-2 w-8 h-1 bg-muted rounded" />}
        </div>
      ))}
    </div>
  );
}

export function PitchDeckCreator({ isOpen, onClose }: PitchDeckCreatorProps) {
  const [step, setStep] = useState<CreationStep>('mode-selection');
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedFont, setSelectedFont] = useState('modern');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [importUrl, setImportUrl] = useState('');
  const [importedPreview, setImportedPreview] = useState('');
  const navigate = useNavigate();

  const handleAISubmit = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    setStep('ai-loading');
    
    // Simulate AI generation time
    setTimeout(() => {
      navigate('/pitch-deck-outline');
    }, 2000);
  };

  const handleStyleComplete = () => {
    navigate('/pitch-deck-outline');
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    navigate('/pitch-deck-outline');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.pptx')) {
      setUploadedFile(file);
      // After upload, show template selection
      setTimeout(() => {
        setStep('template-gallery');
      }, 1000);
    }
  };

  const reset = () => {
    setStep('mode-selection');
    setAiPrompt('');
    setSelectedTemplate('');
    setUploadedFile(null);
    setIsGenerating(false);
  };

  if (step === 'editor') {
    return (
      <PitchDeckEditor
        isOpen={isOpen}
        onClose={() => {
          reset();
          onClose();
        }}
        initialData={{
          template: selectedTemplate,
          prompt: aiPrompt,
          font: selectedFont,
          colorScheme: selectedColor,
          uploadedFile: uploadedFile,
        }}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        {/* Mode selection step */}
        {step === 'mode-selection' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl">Create Pitch Deck</DialogTitle>
            </DialogHeader>
            <div className="p-3 pt-0">
              <div className="grid md:grid-cols-3 gap-2">
                <Card className="cursor-pointer hover:shadow-lg transition-all group p-2" onClick={() => setStep('ai-prompt')}>
                  <CardHeader className="text-center pb-1">
                    <div className="mx-auto w-16 h-16 bg-[#FD621E] rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Start with AI</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Describe your startup and let AI create a professional pitch deck for you
                    </p>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      Recommended
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-all group p-2" onClick={() => setStep('paste')}>
                  <CardHeader className="text-center pb-1">
                    <div className="mx-auto w-16 h-16 bg-[#FD621E] rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Paste</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Paste your own outline or content and we’ll format it beautifully
                    </p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-all group p-2" onClick={() => setStep('file-upload')}>
                  <CardHeader className="text-center pb-1">
                    <div className="mx-auto w-16 h-16 bg-[#FD621E] rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Import File</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Upload your existing PowerPoint or PDF and we'll redesign it beautifully
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Generate with AI step (already implemented) */}
        {step === 'ai-prompt' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setStep('mode-selection')} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-2xl">Create pitch deck with AI</DialogTitle>
              </div>
              <p className="text-muted-foreground text-base mt-1">Fill in your startup details and let AI generate your pitch deck outline.</p>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-2">
                <Label htmlFor="startup-name">Startup/Business Name</Label>
                <Input id="startup-name" placeholder="e.g. Decklo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" placeholder="e.g. FinTech, HealthTech" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objective">Objective</Label>
                <Input id="objective" placeholder="e.g. Help startups create investor-ready pitch decks" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year-founded">Year Founded</Label>
                <Input id="year-founded" placeholder="e.g. 2023" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="num-customers">Number of Customers</Label>
                <Input id="num-customers" placeholder="e.g. 1000" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your business..." className="min-h-[80px] resize-none" />
              </div>
              <Button className="w-full h-12 text-lg bg-[#FD621E] hover:bg-[#c94e17]" onClick={handleAISubmit}>
                Generate Pitch Deck
              </Button>
            </div>
          </>
        )}

        {/* Paste mode step */}
        {step === 'paste' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setStep('mode-selection')} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-2xl">Paste Your Content</DialogTitle>
              </div>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="paste-content">Paste your pitch deck content here</Label>
                <Textarea
                  id="paste-content"
                  placeholder="Paste your text or outline here..."
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>
              {pasteText && (
                <div className="border rounded p-4 bg-muted/10">
                  <div className="font-semibold mb-2">Preview:</div>
                  <div className="whitespace-pre-line text-muted-foreground text-sm">{pasteText}</div>
                </div>
              )}
              <Button
                onClick={() => navigate('/pitch-deck-outline')}
                className="w-full h-12 text-lg bg-[#FD621E] hover:bg-[#c94e17]"
                disabled={!pasteText.trim()}
              >
                Continue
              </Button>
            </div>
          </>
        )}
        {/* Import mode step */}
        {step === 'file-upload' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setStep('mode-selection')} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-2xl">Import File or URL</DialogTitle>
              </div>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="import-url">Import from URL</Label>
                <Input
                  id="import-url"
                  placeholder="Paste a link to your existing deck or doc..."
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                />
                <Button
                  className="mt-2 bg-[#FD621E] hover:bg-[#c94e17]"
                  onClick={() => setImportedPreview(importUrl ? 'Preview of imported content from URL.' : '')}
                  disabled={!importUrl.trim()}
                >
                  Import
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="import-file">Or upload a PowerPoint file</Label>
                <Input
                  id="import-file"
                  type="file"
                  accept=".pptx,.pdf"
                  onChange={handleFileUpload}
                />
              </div>
              {importedPreview && (
                <div className="border rounded p-4 bg-muted/10">
                  <div className="font-semibold mb-2">Preview:</div>
                  <div className="text-muted-foreground text-sm">{importedPreview}</div>
                </div>
              )}
              <Button
                onClick={() => navigate('/pitch-deck-outline')}
                className="w-full h-12 text-lg bg-[#FD621E] hover:bg-[#c94e17]"
                disabled={!importUrl.trim() && !uploadedFile}
              >
                Continue
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}