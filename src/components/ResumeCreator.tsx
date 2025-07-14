import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, FileText, Upload, ArrowLeft, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResumeCreatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type CreationStep = 'mode-selection' | 'ai-prompt' | 'paste' | 'import' | 'ai-loading' | 'ai-summary';

export function ResumeCreator({ isOpen, onClose }: ResumeCreatorProps) {
  const [step, setStep] = useState<CreationStep>('mode-selection');
  const [aiPrompt, setAiPrompt] = useState('');
  const [pasteText, setPasteText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState('');
  const [editingSummary, setEditingSummary] = useState(false);
  const navigate = useNavigate();

  const handleAISubmit = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setStep('ai-loading');
    setTimeout(() => {
      setSummary('John Doe is a passionate software engineer with 5+ years of experience in building scalable web applications. Skilled in React, Node.js, and cloud technologies.');
      setStep('ai-summary');
      setIsGenerating(false);
    }, 2000);
  };

  const handlePasteSubmit = () => {
    if (!pasteText.trim()) return;
    setSummary('AI-generated summary based on pasted content.');
    setStep('ai-summary');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setTimeout(() => {
        setSummary('AI-generated summary based on uploaded file.');
        setStep('ai-summary');
      }, 1500);
    }
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setSummary('Regenerated AI summary: John Doe is a results-driven engineer with a strong background in full-stack development and a passion for innovation.');
      setIsGenerating(false);
    }, 1500);
  };

  const handleProceed = () => {
    onClose();
    navigate('/resume-generating');
  };

  const reset = () => {
    setStep('mode-selection');
    setAiPrompt('');
    setPasteText('');
    setUploadedFile(null);
    setSummary('');
    setEditingSummary(false);
    setIsGenerating(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { reset(); onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        {/* Mode selection step */}
        {step === 'mode-selection' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl">Create Resume</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-3 gap-2 p-6 pt-0">
              <Card className="cursor-pointer hover:shadow-lg transition-all group p-2" onClick={() => setStep('ai-prompt')}>
                <CardHeader className="text-center pb-1">
                  <div className="mx-auto w-16 h-16 bg-[#FD621E] rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">Start with AI</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Describe yourself and let AI create a professional resume summary for you
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
                    Paste your own resume content and we’ll format it beautifully
                  </p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-lg transition-all group p-2" onClick={() => setStep('import')}>
                <CardHeader className="text-center pb-1">
                  <div className="mx-auto w-16 h-16 bg-[#FD621E] rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">Import File</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Upload your existing resume and we'll redesign it beautifully
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
        {/* AI Prompt Step */}
        {step === 'ai-prompt' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setStep('mode-selection')} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-2xl">Create Resume with AI</DialogTitle>
              </div>
              <p className="text-muted-foreground text-base mt-1">Fill in your details and let AI generate your resume summary.</p>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Describe yourself</Label>
                <Textarea id="ai-prompt" placeholder="e.g. Experienced software engineer with a passion for building impactful products..." value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} className="min-h-[80px] resize-none" />
              </div>
              <Button className="w-full h-12 text-lg bg-[#FD621E] hover:bg-[#c94e17]" onClick={handleAISubmit} disabled={!aiPrompt.trim()}>
                Generate Resume Summary
              </Button>
            </div>
          </>
        )}
        {/* Paste Step */}
        {step === 'paste' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setStep('mode-selection')} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-2xl">Paste Your Resume</DialogTitle>
              </div>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-2">
                <Label htmlFor="paste-content">Paste your resume content here</Label>
                <Textarea id="paste-content" placeholder="Paste your resume here..." value={pasteText} onChange={e => setPasteText(e.target.value)} className="min-h-[120px] resize-none" />
              </div>
              <Button className="w-full h-12 text-lg bg-[#FD621E] hover:bg-[#c94e17]" onClick={handlePasteSubmit} disabled={!pasteText.trim()}>
                Continue
              </Button>
            </div>
          </>
        )}
        {/* Import Step */}
        {step === 'import' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setStep('mode-selection')} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle className="text-2xl">Import Resume File</DialogTitle>
              </div>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-2">
                <Label htmlFor="import-file">Upload your resume file</Label>
                <Input id="import-file" type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
              </div>
              {uploadedFile && <div className="text-sm text-muted-foreground mt-2">Uploaded: {uploadedFile.name}</div>}
            </div>
          </>
        )}
        {/* AI Loading Step */}
        {step === 'ai-loading' && (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <div className="text-lg font-semibold mb-2">Generating your resume summary...</div>
            <div className="text-muted-foreground text-sm">This may take a few seconds.</div>
          </div>
        )}
        {/* AI Summary Step */}
        {step === 'ai-summary' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl">Resume Summary</DialogTitle>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-4">
              <Label htmlFor="summary">AI-generated summary</Label>
              {editingSummary ? (
                <Textarea id="summary" value={summary} onChange={e => setSummary(e.target.value)} className="min-h-[80px] resize-none" />
              ) : (
                <div className="border rounded p-4 bg-muted/10 whitespace-pre-line text-muted-foreground text-base min-h-[80px]">{summary}</div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditingSummary(!editingSummary)}>{editingSummary ? 'Save' : 'Edit'}</Button>
                <Button variant="outline" onClick={handleRegenerate} disabled={isGenerating}>
                  <Wand2 className="h-4 w-4 mr-1" /> {isGenerating ? 'Regenerating...' : 'Regenerate'}
                </Button>
                <Button className="bg-[#FD621E] hover:bg-[#c94e17] text-white ml-auto" onClick={handleProceed}>
                  Proceed to Resume Builder
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
} 