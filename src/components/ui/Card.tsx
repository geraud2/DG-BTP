import { ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';

interface CardProps {
  title?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  accent?: 'green' | 'orange' | 'red' | 'blue' | 'none';
  onClick?: () => void;
}

const accentColors = {
  green: 'border-l-4 border-l-emerald-500',
  orange: 'border-l-4 border-l-amber-500',
  red: 'border-l-4 border-l-red-500',
  blue: 'border-l-4 border-l-sky-500',
  none: '',
};

export default function Card({ title, icon: Icon, children, className = '', accent = 'none', onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 ${accentColors[accent]} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {(title || Icon) && (
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
          {Icon && <Icon size={18} className="text-amber-600" />}
          {title && <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</h3>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}