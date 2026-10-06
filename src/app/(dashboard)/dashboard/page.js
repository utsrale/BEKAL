"use client";

import { useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import { 
  BarChart3, 
  Layers, 
  MapPin, 
  Sparkles, 
  Download, 
  Search, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight,
  Database
} from "lucide-react";
import { mfaData, clusterColors } from "@/data/mfa-data";
import IndicatorCharts from "@/components/IndicatorCharts";
import MfaScatter from "@/components/MfaScatter";

const MapChoropleth = dynamic(() => import('@/components/MapChoropleth'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[550px] bg-indigo-50/60 rounded-2xl flex flex-col items-center justify-center text-indigo-500 font-bold gap-3 animate-pulse">
      <Sparkles size={28} className="animate-spin" />
      <span>Memuat Peta Spasial Indonesia 38 Provinsi...</span>
    </div>
  )
});

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClusterFilter, setSelectedClusterFilter] = useState("all");

  const filteredProvinces = useMemo(() => {
    return mfaData.filter(item => {
      const matchName = item.province.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCluster = selectedClusterFilter === "all" || item.cluster === selectedClusterFilter;
      return matchName && matchCluster;
    });
  }, [searchQuery, selectedClusterFilter]);

  const handleExportCSV = () => {
    const headers = [
      "Provinsi",
      "Kluster_MFA",
      "Skor_Infrastruktur",
      "Skor_Ekonomi",
      "Skor_SosDem",
      "Skor_ProdKons",
      "Skor_FLW",
      "IPM",
      "Panjang_Jalan_KM",
      "Pengeluaran_Makanan_Rp"
    ];

    const rows = mfaData.map(d => [
      `"${d.province}"`,
      `"${d.cluster}"`,
      d.blocks.infrastruktur.toFixed(2),
      d.blocks.ekonomi.toFixed(2),
      d.blocks.sosdem.toFixed(2),
      d.blocks.prodkons.toFixed(2),
      d.blocks.flw.toFixed(2),
      d.ipm,
      d.jalan,
      d.pengeluaran_makanan
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bekal_clustering_data_38_provinsi.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full px-2 sm:px-4 pb-20 pt-4 space-y-8 max-w-7xl mx-auto">
      
      {/* 1. Header Banner & KPIs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-indigo-200">
            <Sparkles size={14} className="text-amber-300" />
            <span>Kajian Spasial Satria Data 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Dashboard Analitik Spasial BEKAL
          </h1>
          <p className="text-indigo-200 text-sm max-w-2xl font-medium leading-relaxed">
            Integrasi Multidimensional Factor Analysis (MFA) & Ward's Linkage Ensemble Clustering untuk pemetaan ketahanan pangan serta sisa makanan lokal tingkat provinsi.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white text-indigo-900 hover:bg-indigo-50 px-5 py-3 rounded-2xl font-black text-sm shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Download size={18} className="text-indigo-600" />
            <span>Unduh Data CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cakupan Wilayah</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <MapPin size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800">38</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Provinsi di Indonesia</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Klaster Terbentuk</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Layers size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800">3 Klaster</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Struktur Final Validasi</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dimensi Analisis</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <BarChart3 size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800">5 Blok</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Ekonomi, SosDem, Pangan, FLW, Infra</div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Validitas Klaster</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800">0.4424</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Rata-rata Silhouette Score</div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Map Section */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <MapChoropleth />
      </div>

      {/* 3. Statistical Visualizations: Radar Profile & MFA Scatter Biplot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IndicatorCharts />
        <MfaScatter />
      </div>

      {/* 4. Cluster Interpretation Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-black text-indigo-700 tracking-tight">Interpretasi Karakteristik Kluster Final (MFA)</h2>
          <p className="text-gray-400 text-sm font-medium mt-1">Penjelasan profil dan karakteristik spesifik setiap kluster berdasarkan hasil analisis data terpadu.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kluster 1 */}
          <div className="p-6 rounded-3xl bg-violet-50/30 border border-violet-100/60 space-y-3 transition-all hover:shadow-md">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6] shadow-sm shrink-0" />
              <h3 className="font-extrabold text-lg text-slate-800">Kluster 1 (Kondisi Menengah)</h3>
            </div>
            <div className="text-xs font-bold text-violet-600 tracking-wide uppercase">
              Tersebar di 26 Provinsi
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Merepresentasikan wilayah dengan nilai indikator yang berada pada level rata-rata atau "menengah" secara nasional. Karakteristik ini ditunjukkan oleh rata-rata Indeks Pembangunan Manusia (IPM) sebesar 75,4 dan total panjang jalan rata-rata sebesar 13.792 km. Pengelolaan ketahanan pangan di kluster ini cukup stabil namun memerlukan peningkatan pengawasan logistik yang berkelanjutan.
            </p>
          </div>

          {/* Kluster 2 */}
          <div className="p-6 rounded-3xl bg-emerald-50/30 border border-emerald-100/60 space-y-3 transition-all hover:shadow-md">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] shadow-sm shrink-0" />
              <h3 className="font-extrabold text-lg text-slate-800">Kluster 2 (Lumbung Pangan)</h3>
            </div>
            <div className="text-xs font-bold text-emerald-600 tracking-wide uppercase">
              Jawa Barat, Jawa Tengah, Jawa Timur
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Merupakan pusat populasi dan produksi pertanian nasional dengan kapasitas produksi beras rata-rata mencapai 8.929.537 ton serta infrastruktur jalan berkondisi baik tertinggi (48,2%). Namun, tingginya konsumsi dan aktivitas ekonomi berimplikasi pada volume timbulan sampah tahunan (FLW) yang juga tertinggi (rata-rata 225.620 ton) sehingga memerlukan prioritas manajemen sisa makanan yang terintegrasi.
            </p>
          </div>

          {/* Kluster 3 */}
          <div className="p-6 rounded-3xl bg-amber-50/30 border border-amber-100/60 space-y-3 transition-all hover:shadow-md">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] shadow-sm shrink-0" />
              <h3 className="font-extrabold text-lg text-slate-800">Kluster 3 (Kondisi Khusus)</h3>
            </div>
            <div className="text-xs font-bold text-amber-600 tracking-wide uppercase">
              Tersebar di 9 Provinsi (Timur & NTT)
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Menunjukkan karakteristik khusus dengan tingkat kesejahteraan terendah (IPM rata-rata 67,7), jalan rusak berat tertinggi (5,51%), serta harga pangan hewani termahal (ayam Rp48.630 dan telur Rp41.781), namun konsumsi protein hewani justru berada pada level terendah. Kondisi ini mengindikasikan keterkaitan erat antara buruknya infrastruktur jalan, tingginya biaya logistik, dan minimnya akses pangan bergizi di Indonesia Timur.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Interactive Provincial Data Explorer Table */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-2xl font-black text-indigo-700 tracking-tight flex items-center gap-2">
              <Database size={22} />
              <span>Eksplorasi Data 38 Provinsi</span>
            </h2>
            <p className="text-gray-400 text-sm font-medium mt-1">Cari dan filter data capaian 5 blok indikator untuk setiap provinsi di Indonesia.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama provinsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all"
              />
            </div>

            {/* Cluster Filter */}
            <select
              value={selectedClusterFilter}
              onChange={(e) => setSelectedClusterFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Kluster</option>
              <option value="Kluster 1">Kluster 1 (26 Prov)</option>
              <option value="Kluster 2">Kluster 2 (3 Prov)</option>
              <option value="Kluster 3">Kluster 3 (9 Prov)</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Provinsi</th>
                <th className="py-3 px-4">Kluster Final</th>
                <th className="py-3 px-4 text-right">Infrastruktur</th>
                <th className="py-3 px-4 text-right">Ekonomi</th>
                <th className="py-3 px-4 text-right">SosDem</th>
                <th className="py-3 px-4 text-right">Prod & Kons</th>
                <th className="py-3 px-4 text-right">FLW</th>
                <th className="py-3 px-4 text-right">IPM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {filteredProvinces.map((prov) => {
                const clusterColor = clusterColors[prov.cluster] || '#94a3b8';
                return (
                  <tr key={prov.province} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">{prov.province}</td>
                    <td className="py-3 px-4">
                      <span 
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black text-white shadow-xs"
                        style={{ backgroundColor: clusterColor }}
                      >
                        {prov.cluster}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-indigo-700">{prov.blocks.infrastruktur.toFixed(1)}</td>
                    <td className="py-3 px-4 text-right font-bold text-indigo-700">{prov.blocks.ekonomi.toFixed(1)}</td>
                    <td className="py-3 px-4 text-right font-bold text-indigo-700">{prov.blocks.sosdem.toFixed(1)}</td>
                    <td className="py-3 px-4 text-right font-bold text-indigo-700">{prov.blocks.prodkons.toFixed(1)}</td>
                    <td className="py-3 px-4 text-right font-bold text-indigo-700">{prov.blocks.flw.toFixed(1)}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-800">{prov.ipm.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredProvinces.length === 0 && (
            <div className="py-8 text-center text-gray-400 font-medium text-xs">
              Tidak ada data provinsi yang sesuai dengan filter pencarian.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
