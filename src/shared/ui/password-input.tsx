import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { cn } from "@shared/lib";

import { Button } from "./button";
import type { InputProps } from "./input";
import { Input } from "./input";

const PasswordInput = ({ className, ref, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        ref={ref}
        {...props}
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='absolute right-0 top-0 h-full disabled:bg-gray'
        onClick={() => setShowPassword(!showPassword)}
        disabled={!props.value || props.disabled}
      >
        {showPassword ? (
          <EyeNoneIcon width='18px' height='18px' aria-hidden='true' />
        ) : (
          <EyeOpenIcon aria-hidden='true' />
        )}
      </Button>
    </div>
  );
};

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
