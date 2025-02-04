import { cn } from "@shared/lib";

type TFormErrorProps = React.ComponentProps<"input">;

export const FormError = ({ className, children, ...props }: TFormErrorProps) => (
  <p className={cn("text-xs text-red-600 font-medium", className)} {...props}>
    {children}
  </p>
);
