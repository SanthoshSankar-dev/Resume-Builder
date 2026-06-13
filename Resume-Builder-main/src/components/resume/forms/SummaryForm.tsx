import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText } from 'lucide-react';

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

export const SummaryForm = ({ summary, onChange }: SummaryFormProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-display font-semibold text-foreground">Professional Summary</h2>
        <p className="text-muted-foreground text-sm">
          Write a compelling summary that highlights your key qualifications and career goals.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="summary" className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              Summary
            </Label>
            <Button variant="ghost" size="sm" className="text-primary gap-1.5" disabled>
              <Sparkles className="w-4 h-4" />
              AI Enhance
              <span className="text-xs text-muted-foreground">(Coming Soon)</span>
            </Button>
          </div>
          <Textarea
            id="summary"
            placeholder="Results-driven software engineer with 5+ years of experience in full-stack development. Passionate about building scalable applications and mentoring junior developers. Proven track record of delivering high-quality code and improving team productivity..."
            value={summary}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[200px]"
          />
          <p className="text-xs text-muted-foreground">
            Tip: Keep your summary between 3-5 sentences. Focus on your most relevant achievements and skills.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-medium text-foreground">Writing Tips</h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              Start with your professional title and years of experience
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              Include 2-3 key skills or areas of expertise
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              Mention a significant achievement with metrics if possible
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              End with what you're looking for in your next role
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
