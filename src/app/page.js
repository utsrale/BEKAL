"use client";

import Link from "next/link";
import { 
  Dices, 
  BarChart3, 
  GraduationCap, 
  Leaf, 
  ArrowRight, 
  Map, 
  Trophy, 
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/70 via-white to-indigo-50/30 flex flex-col justify-between relative overflow-hidden">
      {/* Background patterns */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', 
          backgroundSize: '28px 28px' 
        }} 
      />

      {/* Decorative colored ambient blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-indigo-200/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] bg-purple-200/40 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Navigation / Header */}
      <header className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">
            B
          </div>
          <div>
            <span className="text-2xl font-black text-indigo-900 tracking-tight block">BEKAL</span>
            <span className="text-[10px] font-bold text-slate-400 block tracking-wide uppercase">Dashboard & Gamifikasi Spasial</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-slate-500 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 border border-slate-200/80 shadow-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Satria Data 2026</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl w-full mx-auto px-6 py-10 flex flex-col items-center text-center relative z-10 my-auto space-y-8">
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-50/90 text-emerald-700 border border-emerald-200/80 px-4 py-2 rounded-full text-xs font-black shadow-xs">
          <Leaf size={16} className="animate-pulse text-emerald-600" />
          <span>Solusi Kreatif Pengelolaan Sisa Pangan (Food Loss & Waste)</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
            Eksplorasi Data Pangan Bersama <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">BEKAL</span>
          </h1>
          
          <p className="text-base sm:text-xl font-bold text-indigo-900/80 max-w-2xl mx-auto leading-relaxed">
            <span className="text-indigo-600 underline decoration-indigo-300 decoration-2 underline-offset-4">B</span>oard game, <span className="text-indigo-600 underline decoration-indigo-300 decoration-2 underline-offset-4">E</span>dukasi, dan <span className="text-indigo-600 underline decoration-indigo-300 decoration-2 underline-offset-4">K</span>lustering sisa p<span className="text-indigo-600 underline decoration-indigo-300 decoration-2 underline-offset-4">A</span>ngan <span className="text-indigo-600 underline decoration-indigo-300 decoration-2 underline-offset-4">L</span>okal
          </p>

          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Platform interaktif yang memadukan analisis statistik <em>Multidimensional Factor Analysis</em> (MFA) dan <em>Ensemble Ward's Linkage</em> tingkat provinsi dengan sarana permainan edukasi Ular Tangga 100 petak yang dinamis.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2">
          <Link 
            href="/dashboard"
            className="w-full sm:w-auto flex-1 group inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base px-7 py-4 rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Map size={20} />
            <span>Eksplorasi Dashboard</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link 
            href="/game"
            className="w-full sm:w-auto flex-1 group inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-indigo-900 font-extrabold text-base px-7 py-4 rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Dices size={20} className="text-indigo-600" />
            <span>Mainkan Board Game</span>
          </Link>
        </div>

        {/* Quick Stats Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl pt-4">
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="text-2xl font-black text-indigo-700">38</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Provinsi Indonesia</div>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="text-2xl font-black text-purple-700">3 Klaster</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Profil Wilayah</div>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="text-2xl font-black text-emerald-600">5 Blok</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Dimensi Analisis</div>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="text-2xl font-black text-amber-600">100 Petak</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Edukasi Kognitif</div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left pt-2">
          {/* Card 1 */}
          <Link href="/game" className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200 group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <Dices size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Ular Tangga Multiplayer</h3>
              <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                Mode 1-4 pemain dengan audio efek sintetis, kuis penyelamat di petak ular, dan bonus kocok ulang pada dadu 6.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mt-4">
              <span>Mulai Bermain</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/dashboard" className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-200 group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Peta & Analisis MFA</h3>
              <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                Peta choropleth tematik, radar chart per blok, biplot dimensional, dan pencarian instan data 38 provinsi.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 mt-4">
              <span>Buka Dashboard</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/achievements" className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-200 group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                <Trophy size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Hall of Fame & Lencana</h3>
              <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                Koleksi medali 3D, rekor waktu terbaik (speedrun timer), dan pelacakan progres belajar aktif.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 mt-4">
              <span>Lihat Prestasi</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-slate-400 font-bold tracking-wider relative z-10 border-t border-slate-100/60 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-6 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-indigo-500" />
          <span>BEKAL — Inovasi Ketahanan Pangan Lokal</span>
        </div>
        <div>
          &copy; {new Date().getFullYear()} Tim BEKAL &bull; Satria Data 2026. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
