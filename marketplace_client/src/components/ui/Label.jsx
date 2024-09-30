import React from "react";

export const Label = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`text-sm font-medium text-gray-700 ${className}`}
        {...props}
      >
        {children}
      </label>
    );
  }
);
