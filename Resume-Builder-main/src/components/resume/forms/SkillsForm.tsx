import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Heart, Plus, X } from 'lucide-react';

interface SkillsFormProps {
  skills: { technical: string[]; soft: string[] };
  onChange: (skills: { technical: string[]; soft: string[] }) => void;
}

export const SkillsForm = ({ skills, onChange }: SkillsFormProps) => {
  const [technicalInput, setTechnicalInput] = useState('');
  const [softInput, setSoftInput] = useState('');

  const addTechnicalSkill = () => {
    if (technicalInput.trim() && !skills.technical.includes(technicalInput.trim())) {
      onChange({
        ...skills,
        technical: [...skills.technical, technicalInput.trim()],
      });
      setTechnicalInput('');
    }
  };

  const addSoftSkill = () => {
    if (softInput.trim() && !skills.soft.includes(softInput.trim())) {
      onChange({
        ...skills,
        soft: [...skills.soft, softInput.trim()],
      });
      setSoftInput('');
    }
  };

  const removeTechnicalSkill = (skill: string) => {
    onChange({
      ...skills,
      technical: skills.technical.filter((s) => s !== skill),
    });
  };

  const removeSoftSkill = (skill: string) => {
    onChange({
      ...skills,
      soft: skills.soft.filter((s) => s !== skill),
    });
  };

  const handleTechnicalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnicalSkill();
    }
  };

  const handleSoftKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSoftSkill();
    }
  };

  const suggestedTechnical = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'SQL', 'Git', 'AWS', 'Docker', 'MongoDB', 'REST APIs'
  ];

  const suggestedSoft = [
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork',
    'Time Management', 'Adaptability', 'Critical Thinking', 'Creativity'
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-display font-semibold text-foreground">Skills</h2>
        <p className="text-muted-foreground text-sm">
          Add your technical and soft skills to showcase your capabilities.
        </p>
      </div>

      {/* Technical Skills */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          <Label className="text-base font-medium">Technical Skills</Label>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Add a technical skill (e.g., React, Python)"
            value={technicalInput}
            onChange={(e) => setTechnicalInput(e.target.value)}
            onKeyDown={handleTechnicalKeyDown}
          />
          <Button onClick={addTechnicalSkill} variant="secondary" className="shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {skills.technical.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.technical.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1 py-1.5 px-3">
                {skill}
                <button
                  onClick={() => removeTechnicalSkill(skill)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Suggested skills (click to add):</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedTechnical
              .filter((s) => !skills.technical.includes(s))
              .slice(0, 8)
              .map((skill) => (
                <button
                  key={skill}
                  onClick={() =>
                    onChange({ ...skills, technical: [...skills.technical, skill] })
                  }
                  className="text-xs px-2 py-1 rounded bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  + {skill}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-accent" />
          <Label className="text-base font-medium">Soft Skills</Label>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Add a soft skill (e.g., Leadership, Communication)"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={handleSoftKeyDown}
          />
          <Button onClick={addSoftSkill} variant="secondary" className="shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {skills.soft.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.soft.map((skill) => (
              <Badge key={skill} variant="outline" className="gap-1 py-1.5 px-3 border-accent text-accent">
                {skill}
                <button
                  onClick={() => removeSoftSkill(skill)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Suggested skills (click to add):</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedSoft
              .filter((s) => !skills.soft.includes(s))
              .slice(0, 6)
              .map((skill) => (
                <button
                  key={skill}
                  onClick={() => onChange({ ...skills, soft: [...skills.soft, skill] })}
                  className="text-xs px-2 py-1 rounded bg-muted hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  + {skill}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
