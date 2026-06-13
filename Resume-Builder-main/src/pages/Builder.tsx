import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ResumeData, 
  TemplateType, 
  STEPS, 
  emptyResumeData 
} from '@/types/resume';
import { StepIndicator } from '@/components/resume/StepIndicator';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { PersonalDetailsForm } from '@/components/resume/forms/PersonalDetailsForm';
import { SummaryForm } from '@/components/resume/forms/SummaryForm';
import { EducationForm } from '@/components/resume/forms/EducationForm';
import { ExperienceForm } from '@/components/resume/forms/ExperienceForm';
import { SkillsForm } from '@/components/resume/forms/SkillsForm';
import { ProjectsForm } from '@/components/resume/forms/ProjectsForm';
import { CertificationsForm } from '@/components/resume/forms/CertificationsForm';
import { 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Eye, 
  EyeOff,
  Home,
  Palette
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Builder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [template, setTemplate] = useState<TemplateType>('professional');
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [showPreview, setShowPreview] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleExportPDF = async () => {
    const resumeElement = document.getElementById('resume-content');
    if (!resumeElement) {
      toast({
        title: "Export Failed",
        description: "Could not find resume content to export.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = resumeData.personalDetails.fullName 
        ? `${resumeData.personalDetails.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
      
      pdf.save(fileName);
      
      toast({
        title: "Resume Exported!",
        description: "Your resume has been downloaded as a PDF.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your resume.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsForm
            data={resumeData.personalDetails}
            onChange={(personalDetails) => setResumeData({ ...resumeData, personalDetails })}
          />
        );
      case 2:
        return (
          <SummaryForm
            summary={resumeData.summary}
            onChange={(summary) => setResumeData({ ...resumeData, summary })}
          />
        );
      case 3:
        return (
          <EducationForm
            education={resumeData.education}
            onChange={(education) => setResumeData({ ...resumeData, education })}
          />
        );
      case 4:
        return (
          <ExperienceForm
            experience={resumeData.experience}
            onChange={(experience) => setResumeData({ ...resumeData, experience })}
          />
        );
      case 5:
        return (
          <SkillsForm
            skills={resumeData.skills}
            onChange={(skills) => setResumeData({ ...resumeData, skills })}
          />
        );
      case 6:
        return (
          <ProjectsForm
            projects={resumeData.projects}
            onChange={(projects) => setResumeData({ ...resumeData, projects })}
          />
        );
      case 7:
        return (
          <CertificationsForm
            certifications={resumeData.certifications}
            onChange={(certifications) => setResumeData({ ...resumeData, certifications })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <Home className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold hidden sm:inline">ResumeAI Builder</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTemplates(!showTemplates)}
            className="gap-2"
          >
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Templates</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="gap-2 lg:hidden"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            onClick={handleExportPDF}
            disabled={isExporting}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export PDF'}</span>
          </Button>
        </div>
      </header>

      {/* Template Selector Dropdown */}
      {showTemplates && (
        <div className="border-b border-border bg-card p-4 animate-fade-in">
          <div className="container max-w-4xl mx-auto">
            <h3 className="text-sm font-medium text-foreground mb-3">Choose a Template</h3>
            <TemplateSelector selected={template} onSelect={setTemplate} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form Section */}
        <div className={`flex-1 flex flex-col overflow-hidden ${showPreview ? 'lg:w-1/2' : 'w-full'}`}>
          {/* Step Indicator */}
          <div className="p-4 border-b border-border bg-card shrink-0">
            <StepIndicator 
              steps={STEPS} 
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>

          {/* Form Content */}
          <ScrollArea className="flex-1">
            <div className="p-6 max-w-2xl mx-auto">
              {renderStepContent()}
            </div>
          </ScrollArea>

          {/* Navigation Buttons */}
          <div className="p-4 border-t border-border bg-card flex items-center justify-between shrink-0">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </span>

            <Button
              onClick={handleNext}
              disabled={currentStep === STEPS.length}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="hidden lg:flex flex-col w-1/2 border-l border-border bg-muted/30">
            <div className="p-4 border-b border-border bg-card flex items-center justify-between">
              <h3 className="font-medium text-foreground">Live Preview</h3>
              <span className="text-xs text-muted-foreground capitalize">{template} template</span>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-6 flex justify-center">
                <div 
                  ref={previewRef}
                  className="w-full max-w-[600px] shadow-xl rounded-lg overflow-hidden bg-card"
                  style={{ aspectRatio: '8.5/11' }}
                >
                  <ResumePreview data={resumeData} template={template} />
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Mobile Preview Overlay */}
      {showPreview && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background flex flex-col animate-fade-in">
          <div className="p-4 border-b border-border flex items-center justify-between bg-card">
            <h3 className="font-medium text-foreground">Resume Preview</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground capitalize">{template}</span>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1 bg-muted/30">
            <div className="p-4 flex justify-center min-h-full">
              <div 
                className="w-full max-w-[400px] shadow-xl rounded-lg overflow-hidden bg-card"
              >
                <ResumePreview data={resumeData} template={template} />
              </div>
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border bg-card flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(false)}
              className="flex-1"
            >
              Back to Editor
            </Button>
            <Button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex-1 gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
