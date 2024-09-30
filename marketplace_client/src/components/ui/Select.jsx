import React from "react";

export const Select = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);
