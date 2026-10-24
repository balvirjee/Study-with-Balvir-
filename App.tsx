/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { PracticeView } from './components/PracticeView';
import { MockTestsView } from './components/MockTestsView';
import { LiveTestEngine } from './components/LiveTestEngine';
import { TestResultView } from './components/TestResultView';
import { StudyNotesView } from './components/StudyNotesView';
import { PricingPassView } from './components/PricingPassView';
import { DashboardView } from './components/DashboardView';
import { AdminPanelView } from './components/AdminPanelView';
import { AuthModal } from './components/AuthModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ExportModal } from './components/ExportModal';
import { GraduationCap, ShieldCheck, Heart, Server } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    currentView,
    activeTest,
    activeResult,
    setIsArchitectureModalOpen,
    isExportModalOpen,
    setIsExportModalOpen,
    appLanguage
  } = useApp();

  // If a live test is running, render the dedicated full-screen TCS iON style exam interface
  if (activeTest) {
    return <LiveTestEngine />;
  }

  // If viewing a completed or past test result, render the detailed scorecard & solution review
  if (activeResult) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
          <TestResultView />
        </main>
        <BottomNav />
        <AuthModal />
        <ArchitectureModal />
        <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Top Navigation */}
      <Header />

      {/* Main Content Area with Bottom Nav padding for mobile */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20 lg:pb-12">
        {currentView === 'home' && <HomeView />}
        {currentView === 'mock_tests' && <MockTestsView />}
        {currentView === 'practice' && <PracticeView />}
        {currentView === 'notes' && <StudyNotesView />}
        {currentView === 'pricing' && <PricingPassView />}
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'admin' && <AdminPanelView />}
      </main>

      {/* Modern Clean Footer (Anti-Slop Restraint) */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-8 px-4 sm:px-6 hidden sm:block">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-sm">Study with Balvir</span>
            <span className="text-slate-500">·</span>
            <span>Bihar Teacher Recruitment (TRE 3.0/4.0), CTET & JTET Exam Portal</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-400">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-emerald-400 font-semibold"
            >
              <span>Download Project ZIP</span>
            </button>
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="hover:text-blue-300 transition-colors flex items-center gap-1 text-slate-300"
            >
              <Server className="w-3.5 h-3.5 text-blue-400" />
              <span>Production Architecture Blueprint</span>
            </button>
            <span>Option E ("उपर्युक्त में से एक से अधिक/कोई नहीं") Standard Drills</span>
            <span>© 2026 Study with Balvir</span>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNav />

      {/* Modals */}
      <AuthModal />
      <ArchitectureModal />
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
