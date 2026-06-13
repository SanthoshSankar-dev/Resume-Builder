import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: readonly { id: number; name: string; description: string }[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const StepIndicator = ({ steps, currentStep, onStepClick }: StepIndicatorProps) => {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li key={step.id} className="relative flex-1">
            {index !== 0 && (
              <div
                className={cn(
                  "absolute left-0 top-4 -translate-y-1/2 h-0.5 w-full -translate-x-1/2",
                  step.id <= currentStep ? "bg-primary" : "bg-border"
                )}
                style={{ width: 'calc(100% - 2rem)', left: '-50%', marginLeft: '1rem' }}
              />
            )}
            <button
              onClick={() => onStepClick?.(step.id)}
              disabled={!onStepClick}
              className={cn(
                "relative flex flex-col items-center group",
                onStepClick && "cursor-pointer"
              )}
            >
              <span
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-200",
                  step.id < currentStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : step.id === currentStep
                    ? "border-primary bg-background text-primary shadow-md"
                    : "border-border bg-background text-muted-foreground"
                )}
              >
                {step.id < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </span>
              <span
                className={cn(
                  "mt-2 text-xs font-medium hidden sm:block transition-colors duration-200",
                  step.id === currentStep
                    ? "text-primary"
                    : step.id < currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};
