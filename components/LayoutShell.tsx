import React from 'react';

type LayoutShellProps = {
  onToggleSidebar?: () => void;
  className?: string;
  children: React.ReactNode;
};

export default function LayoutShell({ onToggleSidebar, className, children }: LayoutShellProps) {
  return (
    <div className={className}>
      {/* Example usage of onToggleSidebar if needed */}
      {children}
    </div>
  );
}
