import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  name?: string;
  className?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  name,
  className,
  required,
}) => {
  return <input type={type} placeholder={placeholder} name={name} className={className} required={required}/>;
};

export default InputField;
