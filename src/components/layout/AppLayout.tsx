import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { SkipLink } from '../common/SkipLink';
import { ScrollRestoration } from './ScrollRestoration';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#112229] font-sans antialiased selection:bg-[#dff0f4] selection:text-[#06181f]">
      <SkipLink targetId="main-content" />
      <ScrollRestoration />
      <Navbar />

      {/* Main Content Area: pb-20 on mobile ensures bottom navigation and future chatbot float never overlaps text */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 outline-none pb-20 md:pb-0 focus-visible:outline-none"
      >
        <Outlet />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};
