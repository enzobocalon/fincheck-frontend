import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import Spinner from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: "danger" | "ghost";
}

export default function Button({
  className,
  isLoading,
  disabled,
  variant,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={cn(
        "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 text-white rounded-2xl font-medium transition-all active:bg-teal-900 flex items-center justify-center",
        variant === "danger" && "bg-red-900 hover:bg-red-800",
        variant === "ghost" &&
          "bg-transparent border  text-gray-800 border-gray-800 active:bg-gray-800/10 hover:bg-gray-800/5",
        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  );
}
