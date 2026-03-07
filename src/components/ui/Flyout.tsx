import React, { useState } from 'react';

interface FlyoutProps {
  children: React.ReactNode;
  href?: string;
  FlyoutContent?: React.ComponentType | React.ReactNode;
  onTriggerClick?: (e: React.MouseEvent) => void;
}

export default function Flyout({ children, href = '#', FlyoutContent, onTriggerClick }: FlyoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  const renderFlyoutContent = () => {
    if (!FlyoutContent) return null;
    return typeof FlyoutContent === 'function' ? <FlyoutContent /> : <>{FlyoutContent}</>;
  };

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="group relative h-fit w-fit"
    >
      <a
        href={href}
        onClick={(e) => {
          if (onTriggerClick) {
            e.preventDefault();
            onTriggerClick(e);
          }
        }}
        className="relative text-white inline-block"
      >
        {children}
        <span
          style={{
            transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.15s ease-out',
          }}
          className="absolute -bottom-2 left-0 right-0 h-1 origin-left rounded-full bg-indigo-300 transition-transform duration-150 ease-out"
        />
      </a>

      {isOpen && (
        <div
          className="absolute left-1/2 top-8 -translate-x-1/2 rounded-md shadow-md border border-white/10
                     bg-white/5 backdrop-blur-sm p-4"
        >
          {renderFlyoutContent()}
        </div>
      )}
    </div>
  );
}