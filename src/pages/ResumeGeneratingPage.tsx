import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ResumeGeneratingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/resume-builder-editor'); // Update this route if your resume editor uses a different path
    }, 3500); // 3.5 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-white rounded-lg shadow-lg p-10 flex flex-col items-center">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-2">Generating Your Resume...</h2>
        <p className="text-muted-foreground mb-4 text-center max-w-md">
          We’re assembling your resume, applying your chosen style, and getting everything ready. This usually takes just a few seconds!
        </p>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="bg-primary h-2 animate-pulse w-2/3 rounded-full" style={{ animationDuration: '2s' }}></div>
        </div>
      </div>
    </div>
  );
} 