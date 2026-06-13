import { useState } from 'react';
import { Experience } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Briefcase, Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExperienceFormProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export const ExperienceForm = ({ experience, onChange }: ExperienceFormProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    };
    onChange([...experience, newExperience]);
    setExpandedId(newExperience.id);
  };

  const removeExperience = (id: string) => {
    onChange(experience.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addAchievement = (id: string) => {
    const exp = experience.find((e) => e.id === id);
    if (exp) {
      updateExperience(id, 'achievements', [...exp.achievements, '']);
    }
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index);
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-display font-semibold text-foreground">Work Experience</h2>
        <p className="text-muted-foreground text-sm">
          List your work history, starting with your most recent position.
        </p>
      </div>

      <div className="space-y-4">
        {experience.map((exp) => (
          <Card key={exp.id} className="overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">
                    {exp.position || 'New Position'}
                  </p>
                  <p className="text-sm text-muted-foreground">{exp.company || 'Company name'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExperience(exp.id);
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {expandedId === exp.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                expandedId === exp.id ? "max-h-[1200px]" : "max-h-0"
              )}
            >
              <CardContent className="pt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`position-${exp.id}`}>Job Title</Label>
                    <Input
                      id={`position-${exp.id}`}
                      placeholder="Software Engineer"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input
                      id={`company-${exp.id}`}
                      placeholder="Google Inc."
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`location-${exp.id}`}>Location</Label>
                    <Input
                      id={`location-${exp.id}`}
                      placeholder="Mountain View, CA"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${exp.id}`}
                      placeholder="Jan 2020"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${exp.id}`}
                      placeholder="Dec 2023"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onCheckedChange={(checked) =>
                          updateExperience(exp.id, 'current', checked)
                        }
                      />
                      <Label htmlFor={`current-${exp.id}`} className="text-sm text-muted-foreground">
                        I currently work here
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`description-${exp.id}`}>Job Description</Label>
                    <Textarea
                      id={`description-${exp.id}`}
                      placeholder="Describe your role and responsibilities..."
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3 sm:col-span-2">
                    <Label>Key Achievements</Label>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder="Increased sales by 25% through..."
                            value={achievement}
                            onChange={(e) => updateAchievement(exp.id, index, e.target.value)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAchievement(exp.id, index)}
                            className="shrink-0 text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addAchievement(exp.id)}
                        className="gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Achievement
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}

        <Button onClick={addExperience} variant="outline" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>
    </div>
  );
};
