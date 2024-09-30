import React from "react";

export const Button = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`px-4 py-2 bg-black text-white rounded ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
