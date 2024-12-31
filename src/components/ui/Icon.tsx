import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps extends React.ComponentProps<'svg'> {
  name: keyof typeof Icons;
}

export function Icon({ name, className, ...props }: IconProps) {
  const LucideIcon = Icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return <LucideIcon className={cn('w-6 h-6', className)} {...props} />;
}