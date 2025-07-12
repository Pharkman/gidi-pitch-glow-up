import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Share, 
  Download, 
  Plus, 
  Image, 
  BarChart3, 
  Table, 
  Star, 
  Expand,
  ChevronLeft,
  ChevronRight,
  Play,
  Eye,
  Settings,
  Sparkles,
  X
} from 'lucide-react';

interface PitchDeckEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    template?: string;
    prompt?: string;
    font?: string;
    colorScheme?: string;
    uploadedFile?: File | null;
  };
}

interface Slide {
  id: string;
  title: string;
  content: string;
  type: 'title' | 'content' | 'image' | 'chart';
}

const initialSlides: Slide[] = [
  { id: '1', title: 'Company Name', content: 'Your compelling tagline', type: 'title' },
  { id: '2', title: 'Problem', content: 'What problem are you solving?', type: 'content' },
  { id: '3', title: 'Solution', content: 'How do you solve this problem?', type: 'content' },
  { id: '4', title: 'Market Size', content: 'How big is your market?', type: 'chart' },
  { id: '5', title: 'Product Demo', content: 'Show your product in action', type: 'image' },
  { id: '6', title: 'Business Model', content: 'How do you make money?', type: 'content' },
  { id: '7', title: 'Traction', content: 'Prove your growth', type: 'chart' },
  { id: '8', title: 'Competition', content: 'Who are your competitors?', type: 'content' },
  { id: '9', title: 'Team', content: 'Meet the team', type: 'content' },
  { id: '10', title: 'Financials', content: 'Revenue projections', type: 'chart' },
  { id: '11', title: 'Funding', content: 'How much do you need?', type: 'content' },
  { id: '12', title: 'Thank You', content: 'Questions?', type: 'title' },
];

export function PitchDeckEditor({ isOpen, onClose, initialData }: PitchDeckEditorProps) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const addSlide = (type: 'content' | 'image' | 'chart' = 'content') => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      content: 'Add your content here...',
      type,
    };
    const newSlides = [...slides];
    newSlides.splice(currentSlide + 1, 0, newSlide);
    setSlides(newSlides);
    setCurrentSlide(currentSlide + 1);
  };

  const updateSlide = (id: string, updates: Partial<Slide>) => {
    setSlides(slides.map(slide => 
      slide.id === id ? { ...slide, ...updates } : slide
    ));
  };

  const deleteSlide = (id: string) => {
    if (slides.length > 1) {
      const newSlides = slides.filter(slide => slide.id !== id);
      setSlides(newSlides);
      if (currentSlide >= newSlides.length) {
        setCurrentSlide(newSlides.length - 1);
      }
    }
  };

  const handleAIHelp = async () => {
    if (!aiPrompt.trim()) return;
    
    // Simulate AI assistance
    console.log('AI helping with:', aiPrompt);
    setAiPrompt('');
    setShowAIHelper(false);
  };

  const currentSlideData = slides[currentSlide];

  if (isPreviewMode) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-full max-h-full w-screen h-screen p-0 m-0">
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreviewMode(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="w-full max-w-4xl aspect-video bg-white rounded-lg shadow-2xl p-12 mx-8">
              <div className="text-center space-y-8">
                <h1 className="text-4xl font-bold text-gray-900">{currentSlideData.title}</h1>
                <div className="text-xl text-gray-600 leading-relaxed">
                  {currentSlideData.content}
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="bg-white/90 hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-white px-4 py-2 bg-black/50 rounded">
                {currentSlide + 1} / {slides.length}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="bg-white/90 hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full w-screen h-screen p-0 m-0">
        <div className="flex flex-col h-full">
          {/* Top Navbar */}
          <div className="border-b bg-background px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold">Pitch Deck Editor</h1>
              <Badge variant="outline">
                {initialData.template || 'Custom'} Template
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsPreviewMode(true)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Slide Thumbnails */}
            <div className="w-64 border-r bg-muted/30 overflow-y-auto">
              <div className="p-4 space-y-2">
                {slides.map((slide, index) => (
                  <Card 
                    key={slide.id}
                    className={`cursor-pointer transition-all ${
                      index === currentSlide ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <CardContent className="p-3">
                      <div className="text-xs text-muted-foreground mb-1">
                        Slide {index + 1}
                      </div>
                      <h4 className="text-sm font-medium truncate">{slide.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {slide.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => addSlide()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Slide
                </Button>
              </div>
            </div>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col">
              {/* Toolbar */}
              <div className="border-b p-4 flex items-center space-x-2 bg-background">
                <Button variant="outline" size="sm" onClick={() => addSlide('content')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Slide
                </Button>
                <Button variant="outline" size="sm" onClick={() => addSlide('image')}>
                  <Image className="h-4 w-4 mr-2" />
                  Add Media
                </Button>
                <Button variant="outline" size="sm" onClick={() => addSlide('chart')}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Add Chart
                </Button>
                <Button variant="outline" size="sm">
                  <Table className="h-4 w-4 mr-2" />
                  Add Table
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Add Icon
                </Button>
                <div className="flex-1" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAIHelper(true)}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Helper
                </Button>
              </div>

              {/* Slide Editor */}
              <div className="flex-1 p-8 overflow-auto bg-gray-50">
                <div className="max-w-4xl mx-auto">
                  <Card className="aspect-video bg-white shadow-lg">
                    <CardContent className="p-12 h-full flex flex-col">
                      <div className="space-y-6 flex-1">
                        <input
                          type="text"
                          value={currentSlideData.title}
                          onChange={(e) => updateSlide(currentSlideData.id, { title: e.target.value })}
                          className="text-4xl font-bold bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-400"
                          placeholder="Slide Title"
                        />
                        
                        <textarea
                          value={currentSlideData.content}
                          onChange={(e) => updateSlide(currentSlideData.id, { content: e.target.value })}
                          className="text-lg bg-transparent border-none outline-none w-full flex-1 resize-none text-gray-700 placeholder-gray-400"
                          placeholder="Add your content here..."
                        />
                      </div>

                      {/* Slide Type Indicator */}
                      <div className="flex items-center justify-between mt-6">
                        <Badge variant="outline">
                          {currentSlideData.type === 'title' && 'Title Slide'}
                          {currentSlideData.type === 'content' && 'Content Slide'}
                          {currentSlideData.type === 'image' && 'Media Slide'}
                          {currentSlideData.type === 'chart' && 'Chart Slide'}
                        </Badge>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                            disabled={currentSlide === 0}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span className="text-sm text-muted-foreground px-3 py-1">
                            {currentSlide + 1} / {slides.length}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                            disabled={currentSlide === slides.length - 1}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Helper Modal */}
        <Dialog open={showAIHelper} onOpenChange={setShowAIHelper}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                AI Helper
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Ask AI to help improve this slide, suggest content, or make changes..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex space-x-2">
                <Button onClick={handleAIHelp} disabled={!aiPrompt.trim()} className="flex-1">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Help Me
                </Button>
                <Button variant="outline" onClick={() => setShowAIHelper(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}