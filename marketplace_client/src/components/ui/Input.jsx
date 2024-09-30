import React from "react";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border border-gray-300 p-2 rounded w-full ${className}`}
      {...props}
    />
  );
});
