
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

const NavigationLink = ({ 
  to, 
  children, 
  className,
  activeClassName
}: NavigationLinkProps) => {
  const isActive = window.location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "px-4 py-2 rounded-md transition-colors hover:text-primary",
        className,
        isActive && (activeClassName || "font-semibold text-primary")
      )}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
