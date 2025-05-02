import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  base?: string;
  border?: string;
  bgColor?: string;
  text?: string;
  hover?: string;
  variant?: Variant;
  children: React.ReactNode;
}

type Variant = "login" | "normal" | "signup" | "back";

const Button: React.FC<ButtonProps> = ({
  variant= 'normal', 
  children, 
  ...props
}) => {
  const variants: Record<Variant, string> = {
    normal: 'px-6 py-2 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
    login: 'w-full py-2 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
    signup: 'flex-1 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
    back: 'flex-1 py-2 rounded-xl border border-gray-400 bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-300',
  };
  return (
    <button
      className={variants[variant]}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;