import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label className="text-[14px] font-semibold text-text-primary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`min-h-[120px] w-full resize-none rounded-xl border border-border bg-bg-card p-4 text-[15px] text-text-primary placeholder:text-text-disabled focus:border-2 focus:border-primary focus:outline-none ${
            error ? 'border-error' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-[12px] text-error">{error}</span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
