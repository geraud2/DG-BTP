import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variants = {
  primary: 'bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100',
  ghost: 'text-gray-600 hover:bg-gray-100 active:bg-gray-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
};

export default function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
