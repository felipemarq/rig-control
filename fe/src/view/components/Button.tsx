import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: "danger" | "ghost";
}

export const Button = ({
  className,
  isLoading,
  disabled,
  children,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "bg-primary hover:bg-primary-400 disabled:bg-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl font-medium text-white transition-all active:bg-teal-900 flex items-center justify-center",
        variant === "danger" && "bg-redAccent-600 hover:bg-red-500",
        variant === "ghost" &&
          "bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/5",

        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  );
};
