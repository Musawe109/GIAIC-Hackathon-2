'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  collapsed?: boolean;
  onCollapseToggle?: () => void;
  mobileOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function Sidebar({
  navItems,
  collapsed = false,
  onCollapseToggle,
  mobileOpen = false,
  onClose,
  className = ''
}: SidebarProps) {
  const pathname = usePathname();
  // Use the collapsed prop directly instead of maintaining local state
  const isCollapsed = collapsed;

  const toggleCollapse = () => {
    if (onCollapseToggle) {
      onCollapseToggle();
    }
  };

  return (
    <aside
      className={cn(
        'sidebar z-50 transition-transform duration-300 ease-in-out fixed lg:sticky left-0 top-0 w-64 h-screen lg:h-auto',
        isCollapsed ? 'sidebar-collapsed' : '',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0',
        className
      )}
    >
      <div className="flex flex-col h-full bg-white dark:bg-slate-900 shadow-xl lg:shadow-none">
        {/* Logo/Brand Area */}
        <div className="flex items-center h-16 px-6 border-b border-border">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              {!isCollapsed && (
                <>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    TaskFlow
                  </span>
                </>
              )}
              {isCollapsed && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
              )}
            </div>
            
            {/* Close button for mobile */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                if (onClose) onClose();
              }}
              className="lg:hidden p-1 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close sidebar"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href as any} 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onClose) onClose();
                  }}
                >
                  <div
                    className={cn(
                      'nav-item flex items-center',
                      pathname === item.href ? 'nav-item active' : ''
                    )}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {!isCollapsed && <span>{item.title}</span>}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse Toggle - Hidden on mobile */}
        <div className="p-3 border-t border-border hidden lg:block">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="w-full justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(isCollapsed ? 'rotate-180' : '', 'transition-transform')}
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            {!isCollapsed && <span className="ml-3">Collapse</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}