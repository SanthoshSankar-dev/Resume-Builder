import { TemplateType } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (template: TemplateType) => void;
}

const templates: { id: TemplateType; name: string; description: string }[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, simple layout',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic with blue header',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Two-column sidebar',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Elegant serif style',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Gradient accents, grid',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Minimalist luxury feel',
  },
];

export const TemplateSelector = ({ selected, onSelect }: TemplateSelectorProps) => {
  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={cn(
            "relative p-2 rounded-lg border-2 text-left transition-all duration-200",
            selected === template.id
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          {selected === template.id && (
            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-primary-foreground" />
            </div>
          )}
          
          {/* Template Preview */}
          <div className="mb-2 aspect-[8.5/11] rounded border bg-card overflow-hidden">
            {template.id === 'minimal' && (
              <div className="p-1.5 text-[3px]">
                <div className="text-center mb-1.5 pb-1 border-b border-border">
                  <div className="h-1 w-8 bg-foreground mx-auto mb-0.5 rounded-sm"></div>
                  <div className="flex justify-center gap-0.5">
                    <div className="h-0.5 w-4 bg-muted-foreground rounded-sm"></div>
                    <div className="h-0.5 w-4 bg-muted-foreground rounded-sm"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-0.5 w-6 bg-foreground rounded-sm"></div>
                  <div className="h-0.5 w-full bg-muted rounded-sm"></div>
                  <div className="h-0.5 w-3/4 bg-muted rounded-sm"></div>
                </div>
              </div>
            )}
            {template.id === 'professional' && (
              <div className="text-[3px]">
                <div className="bg-[#1e3a5f] p-1.5 mb-1">
                  <div className="h-1 w-8 bg-white mb-0.5 rounded-sm"></div>
                  <div className="flex gap-0.5">
                    <div className="h-0.5 w-4 bg-white/70 rounded-sm"></div>
                    <div className="h-0.5 w-4 bg-white/70 rounded-sm"></div>
                  </div>
                </div>
                <div className="px-1.5 space-y-1">
                  <div className="h-0.5 w-6 bg-[#1e3a5f] rounded-sm"></div>
                  <div className="h-0.5 w-full bg-muted rounded-sm"></div>
                </div>
              </div>
            )}
            {template.id === 'creative' && (
              <div className="flex text-[3px] h-full">
                <div className="w-1/3 bg-gradient-to-b from-[#2d3748] to-[#1a202c] p-1">
                  <div className="h-0.5 w-6 bg-white mb-1 rounded-sm"></div>
                  <div className="space-y-0.5">
                    <div className="h-0.5 w-full bg-white/50 rounded-sm"></div>
                    <div className="h-0.5 w-3/4 bg-white/50 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex-1 p-1 space-y-0.5">
                  <div className="h-0.5 w-4 bg-[#2d3748] rounded-sm"></div>
                  <div className="h-0.5 w-full bg-muted rounded-sm"></div>
                </div>
              </div>
            )}
            {template.id === 'executive' && (
              <div className="p-1.5 text-[3px]">
                <div className="text-center mb-1 pb-1 border-b-2 border-[#8b7355]">
                  <div className="h-1 w-10 bg-[#2c2c2c] mx-auto mb-0.5 rounded-sm"></div>
                  <div className="h-0.5 w-6 bg-gray-400 mx-auto rounded-sm"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-0.5 w-8 bg-[#8b7355] mx-auto rounded-sm"></div>
                  <div className="h-0.5 w-full bg-muted rounded-sm"></div>
                </div>
              </div>
            )}
            {template.id === 'modern' && (
              <div className="text-[3px]">
                <div className="h-0.5 w-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]"></div>
                <div className="p-1.5">
                  <div className="h-1 w-8 bg-foreground mb-1 rounded-sm"></div>
                  <div className="flex gap-0.5 mb-1">
                    <div className="h-0.5 w-4 bg-gray-200 rounded-full"></div>
                    <div className="h-0.5 w-4 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="col-span-2 space-y-0.5">
                      <div className="h-0.5 w-full bg-muted rounded-sm"></div>
                      <div className="h-0.5 w-3/4 bg-muted rounded-sm"></div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="h-0.5 w-full bg-[#6366f1]/20 rounded-sm"></div>
                      <div className="h-0.5 w-full bg-[#ec4899]/20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {template.id === 'elegant' && (
              <div className="p-1.5 text-[3px] bg-[#faf9f6] h-full">
                <div className="text-center mb-1">
                  <div className="h-1 w-10 bg-[#2c2c2c] mx-auto mb-0.5 rounded-sm opacity-80"></div>
                  <div className="h-px w-4 bg-[#c9a961] mx-auto"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-0.5 w-4 bg-[#c9a961] mx-auto rounded-sm"></div>
                  <div className="h-0.5 w-10 bg-muted mx-auto rounded-sm"></div>
                  <div className="h-0.5 w-8 bg-muted mx-auto rounded-sm"></div>
                </div>
              </div>
            )}
          </div>

          <h3 className="font-medium text-xs text-foreground">{template.name}</h3>
          <p className="text-[10px] text-muted-foreground leading-tight">{template.description}</p>
        </button>
      ))}
    </div>
  );
};
