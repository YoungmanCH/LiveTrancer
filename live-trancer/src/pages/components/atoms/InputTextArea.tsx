import React from "react";

interface InputTextAreaProps {
  placeholder: string;
  name?: string;
  className?: string;
  required?: boolean;
}

const InputTextArea: React.FC<InputTextAreaProps> = ({
  placeholder,
  name,
  className,
  required,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      className={className}
      required={required}
    />
  );
};

export default InputTextArea;
