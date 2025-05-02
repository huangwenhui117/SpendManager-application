import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
};

export default Input;