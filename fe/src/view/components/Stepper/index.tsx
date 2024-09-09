import { cn } from "@/lib/utils";
import React, { createContext, useCallback, useState } from "react";
import { useStepper } from "./useStepper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/hooks/useAuth";
import { useRigs } from "@/app/hooks/rigs/useRigs";
import { RigsResponse } from "@/app/services/rigsService/getAll";

interface IStepperContextValue {
  previousStep: () => void;
  nextStep: () => void;
  goToStep: (index: number) => void;
  rigs: RigsResponse;
  isFetchingRigs: boolean;
}

interface IStepHeaderProps {
  title: string;
  description: string;
}

export const StepperContext = createContext({} as IStepperContextValue);

interface IStepperProps {
  initialStep?: number;
  steps: {
    label: string;
    content: React.ReactNode;
  }[];
}

export function Stepper({ steps, initialStep = 0 }: IStepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const { isUserAdm } = useAuth();
  const { rigs, isFetchingRigs } = useRigs(isUserAdm);

  const previousStep = useCallback(() => {
    setCurrentStep((prevState) => Math.max(0, prevState - 1));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prevState) => Math.min(steps.length - 1, prevState + 1));
  }, [steps]);

  const goToStep = useCallback((index: number) => {
    setCurrentStep(index);
  }, []);

  return (
    <StepperContext.Provider
      value={{ previousStep, nextStep, goToStep, isFetchingRigs, rigs }}
    >
      <div className="h-full">
        <ul className="flex ">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className={cn(
                "inline-block text-xs px-2 py-1 rounded-md transition-all",
                index === currentStep && "bg-primary text-primary-foreground"
              )}
            >
              {String(index + 1).padStart(2, "0")}. {step.label}
            </li>
          ))}
        </ul>

        <div className="mt-10 mb-10 ">{steps[currentStep].content}</div>
      </div>
    </StepperContext.Provider>
  );
}

export function StepperFooter({ children }: { children: React.ReactNode }) {
  return <footer className="mt-6 flex justify-end gap-2">{children}</footer>;
}

export function StepperPreviousButton({
  size = "sm",
  variant = "secondary",
  type = "button",
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { previousStep } = useStepper();

  return (
    <Button
      size={size}
      variant={variant}
      type={type}
      onClick={onClick ?? previousStep}
      {...props}
    >
      Anterior
    </Button>
  );
}

export function StepperNextButton({
  size = "sm",
  type = "button",
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { nextStep } = useStepper();

  return (
    <Button size={size} type={type} onClick={onClick ?? nextStep} {...props}>
      Próximo
    </Button>
  );
}

export function StepHeader({ title, description }: IStepHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <span className="text-muted-foreground">{description}</span>
    </header>
  );
}
