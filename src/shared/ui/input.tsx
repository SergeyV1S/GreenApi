import type * as React from "react";

import { cn } from "@shared/lib";

export type InputProps<Component extends React.ElementType = "input"> = {
  component?: Component;
  className?: string;
} & TComponentPropsWithRef<Component>;

const InputBase = ({ className, ref, component: Component = "input", ...props }: InputProps) => (
  <Component
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
);

InputBase.displayName = "Input";

export const Input = InputBase as <Component extends React.ElementType = "input">(
  props: InputProps<Component>
) => React.ReactElement;
