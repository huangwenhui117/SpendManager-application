import React from "react";
import Label from "./Label";
import Input from "./Input";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, error, ...props }) => {
  const inputId = id || `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div>
      <div className="space-y-1">
        <Label htmlFor={inputId}>{label}</Label>
        <Input id={inputId} {...props} />
        {error && (<p className="text-red-500 text-sm mt-1">{error}</p>)}
      </div>
    </div>
    
  );
};

export default TextInput;