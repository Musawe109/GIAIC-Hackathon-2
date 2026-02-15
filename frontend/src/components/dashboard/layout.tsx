'use client';

import { ReactNode, useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import { HomeIcon, CalendarIcon, ChartBarIcon, CogIcon, UserGroupIcon, DocumentTextIcon, Bars3Icon } from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navItems = [
    { title: 'Dashboard', href: '/dashboard', icon: <HomeIcon className="w-5 h-5" /> },
    { title: 'Tasks', href: '/dashboard/todos', icon: <DocumentTextIcon className="w-5 h-5" /> },
    { title: 'Calendar', href: '/dashboard/calendar', icon: <CalendarIcon className="w-5 h-5" /> },
    { title: 'Analytics', href: '/dashboard/analytics', icon: <ChartBarIcon className="w-5 h-5" /> },
    { title: 'Team', href: '/dashboard/team', icon: <UserGroupIcon className="w-5 h-5" /> },
    { title: 'Settings', href: '/dashboard/settings', icon: <CogIcon className="w-5 h-5" /> },
  ];

  // Toggle body class when sidebar opens/closes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sidebarOpen) {
        document.body.classList.add('sidebar-open');
      } else {
        document.body.classList.remove('sidebar-open');
      }

      // Cleanup on unmount or when sidebarOpen changes
      return () => {
        document.body.classList.remove('sidebar-open');
      };
    }
  }, [sidebarOpen]);

  return (
    <div className="dashboard-layout flex min-h-screen">
      {/* Mobile sidebar backdrop - only show when sidebar is open on mobile */}
      <div 
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      
      {/* Sidebar - adjust positioning for mobile vs desktop */}
      <Sidebar 
        navItems={navItems} 
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className={`fixed lg:sticky left-0 top-0 z-50 h-full w-64 transition-transform duration-300 ease-in-out ${
          sidebarOpen 
            ? 'translate-x-0'  // Visible when open
            : '-translate-x-full'  // Hidden when closed
        } lg:translate-x-0 lg:w-64`}
      />
      
      {/* Main content - remains static, sidebar overlays on mobile */}
      <main className="main-content flex-1 bg-gradient-soft min-h-screen transition-all duration-300">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="container flex items-center justify-between h-16 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <div className="w-10"></div> {/* Spacer for symmetry */}
          </div>
        </header>
        
        <div className="container py-8">
          {children}
        </div>
      </main>
    </div>
  );
}