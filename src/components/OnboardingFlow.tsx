import { useState } from 'react';
import { ChevronRight, ChevronLeft, Briefcase, Target, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface OnboardingFlowProps {
  isOpen: boolean;
  onComplete: () => void;
}

const OnboardingFlow = ({ isOpen, onComplete }: OnboardingFlowProps) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: '',
    stage: '',
    goal: '',
    role: '',
    background: '',
    linkedin: ''
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
    { value: 'tech', label: 'Tech' },
    { value: 'business', label: 'Business' },
    { value: 'student', label: 'Student' },
    { value: 'other', label: 'Other' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
     
    } else {
      onComplete();
      navigate('/dashboard')
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
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 overflow-y-auto max-h-screen my-4">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gradient-primary">
              Let's get you started
            </DialogTitle>
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
        </DialogHeader>

        <div className="p-6 w-full max-w-3xl mx-auto">
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
                    What industry are you in?
                  </Label>
                  <div className="grid grid-cols-2 gap-5">
                    {industries.map((industry) => (
                      <Button
                        key={industry}
                        variant={formData.industry === industry ? 'default' : 'outline'}
                        className="justify-start hover:bg-primary"
                        onClick={() => updateFormData('industry', industry)}
                      >
                        {industry}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 mt-2 block">
                    What stage is your startup?
                  </Label>
                  <RadioGroup
                    value={formData.stage}
                    onValueChange={(value) => updateFormData('stage', value)}
                    className="space-y-3"
                  >
                    {stages.map((stage) => (
                      <div key={stage.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={stage.value} id={stage.value} />
                        <Label htmlFor={stage.value} className="flex-1 cursor-pointer ">
                          <div className="font-medium mb-1 mt-2">{stage.label}</div>
                          <div className="text-sm text-muted-foreground ">{stage.desc}</div>
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
                        <div className="text-2xl">{goal.icon}</div>
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
                    Your role
                  </Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => updateFormData('role', value)}
                    className="flex space-x-4"
                  >
                    {roles.map((role) => (
                      <div key={role.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={role.value} id={role.value} />
                        <Label htmlFor={role.value} className="cursor-pointer">
                          {role.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block mt-6">
                    Background
                  </Label>
                  <RadioGroup
                    value={formData.background}
                    onValueChange={(value) => updateFormData('background', value)}
                    className="flex space-x-4"
                  >
                    {backgrounds.map((bg) => (
                      <div key={bg.value} className="flex items-center space-x-2 mb-4">
                        <RadioGroupItem value={bg.value} id={bg.value} />
                        <Label htmlFor={bg.value} className="cursor-pointer">
                          {bg.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div >
                  <Label htmlFor="linkedin" className="text-base font-medium mt-5">
                    LinkedIn or Website (Optional)
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourname"
                    value={formData.linkedin}
                    onChange={(e) => updateFormData('linkedin', e.target.value)}
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
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingFlow;