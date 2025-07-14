import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { ChevronRight, ChevronLeft, Briefcase, Target, User, FileText, File, ClipboardList } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { colors, typography, spacing, breakpoints } from '@/design-system/tokens';
// Example usage: <div style={{ color: colors.brand }}> ... </div>
// Tailwind classes like 'bg-primary' map to colors.brand, see tokens.ts for mapping.

interface OnboardingFlowProps {
  isOpen: boolean;
  onComplete: () => void;
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    industry: '',
    stage: '',
    goal: '',
    role: '',
    background: '',
    linkedin: '',
    location: '', // NEW FIELD
    referral: ''  // NEW FIELD
  });

  const industries = [
    'FinTech', 'HealthTech', 'EdTech', 'AgriTech', 'E-commerce',
    'AI/ML', 'Blockchain', 'IoT', 'CleanTech', 'Other'
  ];

  const stages = [
    { value: 'idea', label: 'Idea Stage', desc: 'Concept and planning phase' },
    { value: 'mvp', label: 'MVP', desc: 'Building minimum viable product' },
    { value: 'pre-seed', label: 'Pre-seed', desc: 'Early validation and fundraising' },
    { value: 'seed', label: 'Seed', desc: 'Growing user base and revenue' },
    { value: 'series-a', label: 'Series A', desc: 'Scaling and expansion' }
  ];

  const goals = [
    {
      value: 'pitch-deck',
      title: 'Pitch Deck',
      desc: 'Create investor-ready presentation',
      icon: '📊'
    },
    {
      value: 'resume',
      title: 'Resume',
      desc: 'Build founder resume/bio',
      icon: '📄'
    },
    {
      value: 'one-pager',
      title: 'One-Pager',
      desc: 'Company overview document',
      icon: '📋'
    }
  ];

  const roles = [
    { value: 'founder', label: 'Founder' },
    { value: 'co-founder', label: 'Co-founder' },
    { value: 'solo-founder', label: 'Solo Founder' }
  ];

  const backgrounds = [
    { value: 'working-class', label: 'Working class' },
    { value: 'students', label: 'Students' },
    { value: 'founder', label: 'Founder' },
    { value: 'none', label: 'None' },
  ];

  const goalIcons = {
    'pitch-deck': <FileText className="h-6 w-6 text-primary" />,
    'resume': <File className="h-6 w-6 text-primary" />,
    'one-pager': <ClipboardList className="h-6 w-6 text-primary" />,
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowConfetti(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.industry && formData.stage;
      case 2:
        return formData.goal;
      case 3:
        return true; // Optional step
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-y-auto w-full">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={400} recycle={false} />}
      <div className="bg-card border border-border rounded-xl shadow-md p-4 w-full max-w-3xl sm:w-[500px] md:w-[650px] lg:w-[800px] mx-auto">
        <div className="p-4 pb-2 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold" style={{ color: '#000' }}>
              Let's get you started
            </h2>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of 3
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="flex space-x-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full ${
                  step <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-4">
          {/* Step 1: Startup Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Briefcase className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Tell us about your startup</h3>
                <p className="text-muted-foreground">
                  This helps us tailor our tools to your needs
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    What industries are you in?
                  </Label>
                  <RadioGroup
                    value={formData.industry}
                    onValueChange={(value) => updateFormData('industry', value)}
                    className="grid grid-cols-3 gap-2"
                  >
                    {industries.map((industry) => (
                      <Card
                        key={industry}
                        className={`cursor-pointer transition-all flex items-center px-4 py-3 ${formData.industry === industry ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                        onClick={() => updateFormData('industry', industry)}
                      >
                        <RadioGroupItem value={industry} id={industry} checked={formData.industry === industry} />
                        <Label htmlFor={industry} className="ml-2 cursor-pointer w-full">
                          {industry}
                        </Label>
                      </Card>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">
                    What stage are your startups?
                  </Label>
                  <RadioGroup
                    value={formData.stage}
                    onValueChange={(value) => updateFormData('stage', value)}
                    className="grid grid-cols-2 gap-3"
                  >
                    {stages.map((stage) => (
                      <div key={stage.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={stage.value} id={stage.value} />
                        <Label htmlFor={stage.value} className="flex-1 cursor-pointer">
                          <div className="font-medium">{stage.label}</div>
                          <div className="text-sm text-muted-foreground">{stage.desc}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Main Goal */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Target className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">What do you want to create first?</h3>
                <p className="text-muted-foreground">
                  Choose your starting point - you can always create more later
                </p>
              </div>

              <div className="grid gap-4">
                {goals.map((goal) => (
                  <Card
                    key={goal.value}
                    className={`cursor-pointer transition-all hover:shadow-medium ${
                      formData.goal === goal.value
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => updateFormData('goal', goal.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{goalIcons[goal.value]}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground">{goal.desc}</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.goal === goal.value
                              ? 'bg-primary border-primary'
                              : 'border-muted-foreground'
                          }`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Founder Profile */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <User className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Tell us about yourself</h3>
                <p className="text-muted-foreground">
                  Optional: This helps us personalize your experience
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    What's your current role?
                  </Label>
                  <select
                    value={formData.role}
                    onChange={e => updateFormData('role', e.target.value)}
                    className="w-full border border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select your role</option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">
                    What stage of life are you?
                  </Label>
                  <RadioGroup
                    value={formData.background}
                    onValueChange={(value) => updateFormData('background', value)}
                    className="flex space-x-4"
                  >
                    {backgrounds.map((bg) => (
                      <div key={bg.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={bg.value} id={bg.value} />
                        <Label htmlFor={bg.value} className="cursor-pointer">
                          {bg.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="linkedin" className="text-base font-medium">
                    Let's know you better, what's your social/website link?
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourname"
                    value={formData.linkedin}
                    onChange={(e) => updateFormData('linkedin', e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* NEW: Where are you currently based? */}
                <div>
                  <Label htmlFor="location" className="text-base font-medium">
                    Where are you currently based?
                  </Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* NEW: How did you get to know GidiPitch? */}
                <div>
                  <Label htmlFor="referral" className="text-base font-medium">
                    How did you get to know GidiPitch?
                  </Label>
                  <Input
                    id="referral"
                    placeholder="e.g. Twitter, Friend, Event, etc."
                    value={formData.referral}
                    onChange={(e) => updateFormData('referral', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between p-6 border-t bg-muted/30">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center"
          >
            {currentStep === 3 ? 'Complete Setup' : 'Continue'}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#FD621E' }}>Welcome to GidiPitch!</h2>
            <p className="text-lg">Your dashboard is ready 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
}