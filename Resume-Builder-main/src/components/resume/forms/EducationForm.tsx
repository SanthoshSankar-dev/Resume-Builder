import { useState } from 'react';
import { Education } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationForm = ({ education, onChange }: EducationFormProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    };
    onChange([...education, newEducation]);
    setExpandedId(newEducation.id);
  };

  const removeEducation = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-display font-semibold text-foreground">Education</h2>
        <p className="text-muted-foreground text-sm">
          Add your educational background, starting with your most recent degree.
        </p>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <Card key={edu.id} className="overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">
                    {edu.degree || 'New Education'}{edu.field && ` in ${edu.field}`}
                  </p>
                  <p className="text-sm text-muted-foreground">{edu.institution || 'Institution name'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeEducation(edu.id);
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {expandedId === edu.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                expandedId === edu.id ? "max-h-[800px]" : "max-h-0"
              )}
            >
              <CardContent className="pt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      placeholder="University of California, Berkeley"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      placeholder="Bachelor of Science"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                    <Input
                      id={`field-${edu.id}`}
                      placeholder="Computer Science"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${edu.id}`}
                      placeholder="Aug 2018"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${edu.id}`}
                      placeholder="May 2022"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`gpa-${edu.id}`}>GPA (optional)</Label>
                    <Input
                      id={`gpa-${edu.id}`}
                      placeholder="3.8/4.0"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`description-${edu.id}`}>Description (optional)</Label>
                    <Textarea
                      id={`description-${edu.id}`}
                      placeholder="Relevant coursework, honors, activities..."
                      value={edu.description}
                      onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}

        <Button onClick={addEducation} variant="outline" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>
    </div>
  );
};
