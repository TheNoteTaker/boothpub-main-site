import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface IconProps extends React.ComponentProps<'svg'> {
  name: keyof typeof LucideIcons;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = LucideIcons[name] as LucideIcon;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }
  
  return <IconComponent {...props} />;
}