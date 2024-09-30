import React from "react";

export const Textarea = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
        {...props}
      >
        {children}
      </textarea>
    );
  }
);
