import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label className="text-[14px] font-semibold text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`h-[52px] w-full rounded-xl border border-border bg-bg-card px-4 text-[15px] text-text-primary placeholder:text-text-disabled focus:border-2 focus:border-primary focus:outline-none ${
            error ? 'border-error' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-[12px] text-error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
