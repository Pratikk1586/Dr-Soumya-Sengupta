import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { ClinicAssistant } from '../assistant/ClinicAssistant';
import { SkipLink } from '../common/SkipLink';
import { ScrollRestoration } from './ScrollRestoration';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCFEFF] text-slate-900 font-sans antialiased selection:bg-[#EAF7FA] selection:text-[#103F4A]">
      <SkipLink targetId="main-content" />
      <ScrollRestoration />
      <Navbar />

      {/* Main Content Area: pb-28 on mobile and pb-16 on desktop ensures floating assistant & bottom nav never cover buttons or cards */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 outline-none pb-28 md:pb-16 focus-visible:outline-none"
      >
        <Outlet />
      </main>

      <Footer />
      <BottomNav />
      <ClinicAssistant />
    </div>
  );
};
