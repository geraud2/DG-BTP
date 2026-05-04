interface StatusBadgeProps {
  status: string;
  variant?: 'green' | 'orange' | 'red' | 'blue' | 'gray';
}

const variantClasses: Record<string, string> = {
  green: 'bg-emerald-100 text-emerald-800',
  orange: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-sky-100 text-sky-800',
  gray: 'bg-gray-100 text-gray-800',
};

export default function StatusBadge({ status, variant = 'gray' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {status}
    </span>
  );
}
