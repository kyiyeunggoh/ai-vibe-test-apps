
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
  onBack?: () => void;
  bgColor?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, headerTitle, onBack, bgColor = 'bg-slate-50' }) => {
  return (
    <div className={`min-h-screen flex flex-col ${bgColor} transition-colors duration-500`}>
      {headerTitle && (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4 flex items-center justify-between shadow-sm">
          {onBack ? (
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : <div className="w-10" />}
          <h1 className="text-xl font-bold text-slate-800">{headerTitle}</h1>
          <div className="w-10" />
        </header>
      )}
      <main className="flex-1 w-full max-w-md mx-auto p-4 md:p-6 pb-24">
        {children}
      </main>
    </div>
  );
};

export default Layout;
