import { cn } from "@shared/lib";

type TInputProps = React.ComponentProps<"input">;

export const Input = ({ className, ...props }: TInputProps) => (
  <input
    className={cn(
      "border border-slate-200 rounded-md px-3 py-1 focus:outline-green-200 text-sm h-9 w-full",
      className
    )}
    {...props}
  />
);
