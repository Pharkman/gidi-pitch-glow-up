import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  X,
  Type,
  Upload,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette
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
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [editingElement, setEditingElement] = useState<'title' | 'content' | null>(null);
  const [textContent, setTextContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);

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

  const handleTextClick = (type: 'title' | 'content') => {
    setEditingElement(type);
    setTextContent(type === 'title' ? currentSlideData.title : currentSlideData.content);
    setShowTextEditor(true);
  };

  const handleImageClick = () => {
    setShowImageEditor(true);
  };

  const saveTextContent = () => {
    if (editingElement) {
      updateSlide(currentSlideData.id, { 
        [editingElement]: textContent 
      });
    }
    setShowTextEditor(false);
    setEditingElement(null);
    setTextContent('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleAIHelp = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGeneratingContent(true);
    
    // Simulate AI assistance with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate content based on slide type and prompt
    const generatedContent = generateAIContent(aiPrompt, currentSlideData.type);
    
    if (generatedContent.title) {
      updateSlide(currentSlideData.id, { title: generatedContent.title });
    }
    if (generatedContent.content) {
      updateSlide(currentSlideData.id, { content: generatedContent.content });
    }
    
    setIsGeneratingContent(false);
    setAiPrompt('');
    setShowAIHelper(false);
  };

  const generateAIContent = (prompt: string, slideType: string) => {
    // Simulate AI content generation based on prompt and slide type
    const templates = {
      title: {
        title: `${prompt} - Innovative Solutions`,
        content: 'Transforming the future with cutting-edge technology'
      },
      content: {
        title: currentSlideData.title,
        content: `Based on your request: "${prompt}", here's comprehensive content that addresses key market opportunities, strategic advantages, and actionable insights for sustainable growth.`
      },
      chart: {
        title: currentSlideData.title,
        content: `Market analysis shows significant growth potential. ${prompt} indicates strong market demand with projected 300% growth over the next 3 years.`
      },
      image: {
        title: currentSlideData.title,
        content: `Visual representation of ${prompt} showcasing key features and benefits through compelling imagery.`
      }
    };

    return templates[slideType as keyof typeof templates] || templates.content;
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
                        <div 
                          onClick={() => handleTextClick('title')}
                          className="text-4xl font-bold cursor-pointer hover:bg-blue-50 hover:border hover:border-blue-200 rounded p-2 -m-2 transition-all duration-200"
                        >
                          {currentSlideData.title || 'Click to edit title'}
                        </div>
                        
                        <div 
                          onClick={() => handleTextClick('content')}
                          className="text-lg cursor-pointer hover:bg-blue-50 hover:border hover:border-blue-200 rounded p-4 -m-4 transition-all duration-200 min-h-[200px] flex items-start"
                        >
                          {currentSlideData.content || 'Click to edit content'}
                        </div>
                        
                        {currentSlideData.type === 'image' && (
                          <div 
                            onClick={handleImageClick}
                            className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                          >
                            {imageUrl ? (
                              <img src={imageUrl} alt="Slide image" className="max-h-full max-w-full object-contain" />
                            ) : (
                              <div className="text-center">
                                <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                <p className="text-gray-500">Click to add image</p>
                              </div>
                            )}
                          </div>
                        )}
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

        {/* Text Editor Modal */}
        <Dialog open={showTextEditor} onOpenChange={setShowTextEditor}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Type className="mr-2 h-5 w-5" />
                Text Editor
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b pb-3">
                <Button variant="outline" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button variant="outline" size="sm">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Select>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="14" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="14">14</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="32">32</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Palette className="h-4 w-4" />
                </Button>
              </div>
              
              <Textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="min-h-[200px] text-base"
                placeholder={`Enter your ${editingElement} here...`}
              />
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowTextEditor(false)}>
                  Cancel
                </Button>
                <Button onClick={saveTextContent}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Image Editor Modal */}
        <Dialog open={showImageEditor} onOpenChange={setShowImageEditor}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Image className="mr-2 h-5 w-5" />
                Image Editor
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image-upload">Upload Image</Label>
                  <div className="mt-2">
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="image-url">Or Enter URL</Label>
                  <Input
                    id="image-url"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
              
              {imageUrl && (
                <div className="border rounded-lg p-4">
                  <Label>Preview</Label>
                  <div className="mt-2 flex justify-center">
                    <img src={imageUrl} alt="Preview" className="max-h-64 max-w-full object-contain" />
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowImageEditor(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowImageEditor(false)} disabled={!imageUrl}>
                  Insert Image
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
                <Button 
                  onClick={handleAIHelp} 
                  disabled={!aiPrompt.trim() || isGeneratingContent} 
                  className="flex-1"
                >
                  {isGeneratingContent ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Help Me
                    </>
                  )}
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

// Add a default export for routing
export default function PitchDeckEditorPage() {
  // You can pass initialData or fetch from context/store as needed
  return <PitchDeckEditor isOpen={true} onClose={() => {}} initialData={{}} />;
}