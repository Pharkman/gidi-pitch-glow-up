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

interface PitchDeckCreatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type CreationStep = 'selection' | 'ai-prompt' | 'ai-loading' | 'ai-styling' | 'template-gallery' | 'file-upload' | 'editor';

const templates = [
  { id: 'modern', name: 'Modern', preview: '/api/placeholder/300/200', description: 'Clean and professional' },
  { id: 'minimal', name: 'Minimal', preview: '/api/placeholder/300/200', description: 'Simple and elegant' },
  { id: 'visual', name: 'Visual-first', preview: '/api/placeholder/300/200', description: 'Image-focused design' },
  { id: 'corporate', name: 'Corporate', preview: '/api/placeholder/300/200', description: 'Traditional business' },
  { id: 'startup', name: 'Startup', preview: '/api/placeholder/300/200', description: 'Bold and innovative' },
  { id: 'tech', name: 'Tech', preview: '/api/placeholder/300/200', description: 'Modern tech aesthetic' },
];

const fontPairings = [
  { id: 'modern', name: 'Modern', heading: 'Inter', body: 'Inter' },
  { id: 'classic', name: 'Classic', heading: 'Playfair Display', body: 'Source Sans Pro' },
  { id: 'minimal', name: 'Minimal', heading: 'Poppins', body: 'Open Sans' },
  { id: 'elegant', name: 'Elegant', heading: 'Merriweather', body: 'Lato' },
];

const colorSchemes = [
  { id: 'blue', name: 'Professional Blue', primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA' },
  { id: 'purple', name: 'Creative Purple', primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
  { id: 'green', name: 'Growth Green', primary: '#10B981', secondary: '#059669', accent: '#34D399' },
  { id: 'orange', name: 'Energy Orange', primary: '#F59E0B', secondary: '#D97706', accent: '#FBBF24' },
  { id: 'dark', name: 'Executive Dark', primary: '#1F2937', secondary: '#111827', accent: '#6B7280' },
];

export function PitchDeckCreator({ isOpen, onClose }: PitchDeckCreatorProps) {
  const [step, setStep] = useState<CreationStep>('selection');
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedFont, setSelectedFont] = useState('modern');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAISubmit = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    setStep('ai-loading');
    
    // Simulate AI generation time
    setTimeout(() => {
      setStep('ai-styling');
    }, 2000);
  };

  const handleStyleComplete = () => {
    setStep('editor');
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setStep('editor');
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
    setStep('selection');
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        {step === 'selection' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl">Create Pitch Deck</DialogTitle>
            </DialogHeader>
            <div className="p-6 pt-0">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-all group" onClick={() => setStep('ai-prompt')}>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
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

                <Card className="cursor-pointer hover:shadow-lg transition-all group" onClick={() => setStep('template-gallery')}>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Start from Scratch</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Choose a template and build your pitch deck from the ground up
                    </p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-all group" onClick={() => setStep('file-upload')}>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Import File</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Upload your existing PowerPoint and we'll redesign it beautifully
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {step === 'ai-prompt' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setStep('selection')} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-2xl">Describe Your Startup</DialogTitle>
              </div>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="startup-description">Tell us about your startup idea</Label>
                <Textarea
                  id="startup-description"
                  placeholder="Describe your idea or startup... e.g., 'We're building an AI-powered fitness app that creates personalized workout plans based on user goals and available equipment.'"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>
              <Button 
                onClick={handleAISubmit} 
                className="w-full h-12 text-lg"
                disabled={!aiPrompt.trim()}
              >
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Pitch Deck
              </Button>
            </div>
          </>
        )}

        {step === 'ai-loading' && (
          <div className="p-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Generating your deck...</h3>
            <p className="text-muted-foreground">This may take a few moments</p>
          </div>
        )}

        {step === 'ai-styling' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl">Customize Your Style</DialogTitle>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-8">
              {/* Font Pairing */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Type className="mr-2 h-5 w-5" />
                  Font Pairing
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {fontPairings.map((font) => (
                    <Card 
                      key={font.id}
                      className={`cursor-pointer transition-all ${selectedFont === font.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedFont(font.id)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold" style={{ fontFamily: font.heading }}>
                            {font.name}
                          </h4>
                          <p className="text-sm text-muted-foreground" style={{ fontFamily: font.body }}>
                            Heading: {font.heading}<br />
                            Body: {font.body}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Color Scheme */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Color Scheme
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {colorSchemes.map((scheme) => (
                    <Card 
                      key={scheme.id}
                      className={`cursor-pointer transition-all ${selectedColor === scheme.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedColor(scheme.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.primary }}></div>
                            <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.secondary }}></div>
                            <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.accent }}></div>
                          </div>
                          <span className="font-medium">{scheme.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button onClick={handleStyleComplete} className="w-full h-12 text-lg">
                Create Pitch Deck
              </Button>
            </div>
          </>
        )}

        {step === 'template-gallery' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setStep('selection')} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-2xl">Choose a Template</DialogTitle>
              </div>
            </DialogHeader>
            <div className="p-6 pt-0">
              <div className="grid md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className="cursor-pointer hover:shadow-lg transition-all group"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 'file-upload' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setStep('selection')} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-2xl">Import PowerPoint</DialogTitle>
              </div>
            </DialogHeader>
            <div className="p-6 pt-0">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Upload your PowerPoint file</h3>
                <p className="text-muted-foreground mb-6">We support .pptx files up to 50MB</p>
                <Input
                  type="file"
                  accept=".pptx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Choose File
                  </Button>
                </Label>
                {uploadedFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-green-700">File uploaded: {uploadedFile.name}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}