import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  type = 'button' 
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;