import React, { useState } from "react";
import { 
  Network, 
  BookOpenCheck, 
  HelpCircle, 
  Search, 
  Sparkles, 
  GraduationCap, 
  Users,
  Info,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Chapter, Subtopic, SYLLABUS_DATA } from "./types";
import ConceptMap from "./components/ConceptMap";
import LearningPanel from "./components/LearningPanel";
import MiniDictionary from "./components/MiniDictionary";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeSection, setActiveSection] = useState<"map" | "dictionary" | "guide">("map");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Default to pre-populating the very first subtopic in Bab 1 to avoid blank states
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(SYLLABUS_DATA[0]);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic>(SYLLABUS_DATA[0].subtopics[0]);
  
  // Track if mobile view should show the detail panel overlay
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  const handleSelectSubtopic = (subtopic: Subtopic, chapter: Chapter) => {
    setSelectedSubtopic(subtopic);
    setSelectedChapter(chapter);
    setShowMobilePanel(true);
  };

  return (
    <div className="min-h-screen bg-blue-50 text-slate-800 antialiased flex flex-col font-sans">
      
      {/* Top Banner & Header */}
      <header className="bg-white border-b-4 border-blue-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center border-b-4 border-yellow-600 rotate-3 shadow-lg shrink-0">
              <span className="text-3xl">📖</span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-3xl font-black text-blue-900 leading-tight uppercase tracking-tight italic">
                Peta Konsep
              </h1>
              <p className="text-xs sm:text-sm text-blue-600 font-bold tracking-widest uppercase">
                Bahasa Indonesia • Kelas 2 MI • Semester 1
              </p>
            </div>
          </div>

          {/* Navigation & Info badges */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <nav className="flex bg-slate-100 p-1 rounded-xl border-2 border-blue-100">
              <button
                id="nav-map-btn"
                onClick={() => { setActiveSection("map"); setSearchQuery(""); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSection === "map" 
                    ? "bg-white text-blue-900 shadow-xs border border-slate-200/40" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                Peta Konsep
              </button>
              <button
                id="nav-dictionary-btn"
                onClick={() => { setActiveSection("dictionary"); setSearchQuery(""); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSection === "dictionary" 
                    ? "bg-white text-blue-900 shadow-xs border border-slate-200/40" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <BookOpenCheck className="w-3.5 h-3.5" />
                Kamus Cilik
              </button>
              <button
                id="nav-guide-btn"
                onClick={() => { setActiveSection("guide"); setSearchQuery(""); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSection === "guide" 
                    ? "bg-white text-blue-900 shadow-xs border border-slate-200/40" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                Petunjuk
              </button>
            </nav>

            <div className="hidden sm:flex gap-2 shrink-0">
              <div className="bg-white px-3 py-1.5 rounded-full border-2 border-blue-200 text-blue-800 font-bold text-xs shadow-sm">
                Semester Ganjil
              </div>
              <div className="bg-blue-600 px-3 py-1.5 rounded-full text-white font-bold text-xs shadow-md">
                TA 2026/2027
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dynamic section renders */}
        <AnimatePresence mode="wait">
          
          {/* PETA KONSEP SECTION */}
          {activeSection === "map" && (
            <motion.div
              key="section-map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              
              {/* Search stage */}
              <div className="bg-white p-5 rounded-2xl border-2 border-blue-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="space-y-1 text-center md:text-left">
                  <h2 className="text-sm font-black text-blue-900 uppercase tracking-wide flex items-center justify-center md:justify-start gap-1.5">
                    <Sparkles className="w-4 h-4 text-yellow-500" /> Mari Belajar Bahasa Indonesia!
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium">Pilih salah satu cabang materi pada peta untuk mulai membaca materi dan mengerjakan kuis seru.</p>
                </div>

                <div className="relative w-full md:w-80">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Cari kata kunci, subtopik, atau target belajar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200/90 focus:outline-hidden focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Grid layout containing Peta Map on left and Learning Board on right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Map */}
                <div className="lg:col-span-7 xl:col-span-8 bg-blue-100/40 p-6 rounded-3xl border-2 border-blue-200">
                  <ConceptMap
                    onSelectSubtopic={handleSelectSubtopic}
                    selectedSubtopicId={selectedSubtopic.id}
                    searchQuery={searchQuery}
                  />
                </div>

                {/* Right Desktop: Study Panel */}
                <div className="hidden lg:block lg:col-span-5 xl:col-span-4 lg:sticky lg:top-[110px] h-[calc(100vh-170px)] min-h-[550px]">
                  <LearningPanel
                    subtopic={selectedSubtopic}
                    chapter={selectedChapter}
                  />
                </div>

                {/* Mobile Study Panel Modal Overlay */}
                <AnimatePresence>
                  {showMobilePanel && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 bg-slate-900/40 lg:hidden flex flex-col justify-end p-4 backdrop-blur-xs"
                    >
                      <motion.div 
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="max-h-[85vh] w-full flex flex-col"
                      >
                        <LearningPanel
                          subtopic={selectedSubtopic}
                          chapter={selectedChapter}
                          onClose={() => setShowMobilePanel(false)}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </motion.div>
          )}

          {/* KAMUS CILIK SECTION */}
          {activeSection === "dictionary" && (
            <motion.div
              key="section-dictionary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <MiniDictionary />
            </motion.div>
          )}

          {/* STUDY GUIDE SECTION */}
          {activeSection === "guide" && (
            <motion.div
              key="section-guide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto bg-white rounded-3xl border-4 border-blue-200 p-6 md:p-8 shadow-sm space-y-8"
            >
              <div className="text-center space-y-2 border-b-2 border-slate-100 pb-5">
                <div className="inline-block p-4 bg-yellow-400 rounded-2xl border-b-4 border-yellow-600 rotate-2 text-slate-900 shadow-md">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight italic mt-4">Petunjuk Belajar Mandiri &amp; Pendampingan</h2>
                <p className="text-xs text-blue-600 font-bold tracking-wider uppercase">Panduan praktis menggunakan Peta Konsep untuk Siswa, Orang Tua, dan Guru MI</p>
              </div>

              <div className="space-y-6">
                
                {/* Siswa */}
                <div className="flex gap-4 items-start bg-rose-50/75 p-4 rounded-2xl border-2 border-rose-100">
                  <span className="w-10 h-10 rounded-full bg-rose-400 border-b-4 border-rose-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                    S
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-rose-950 uppercase tracking-wide">Petunjuk untuk Teman-teman Siswa Kelas 2 MI:</h4>
                    <p className="text-xs text-rose-900 mt-1.5 leading-relaxed font-medium">
                      1. Pilih salah satu cabang pada <strong>Peta Pikiran</strong>. Kamu bisa memilih &quot;Mengenal Perasaan&quot; atau &quot;4 Kata Ajaib&quot;.<br />
                      2. Bacalah materi belajarnya pada tab <strong>Belajar Seru</strong> dan mintalah sistem mengeluarkan suara penjelasan dengan menekan tombol mikrofon.<br />
                      3. Jawab pertanyaan kuis di tab <strong>Kuis Gembira</strong> untuk menguji kepintaranmu.<br />
                      4. Tekan tombol <strong>Tanya Kak Gemini (AI)</strong> untuk dibuatkan dongeng cerita seru baru sesuai pelajaranmu!
                    </p>
                  </div>
                </div>

                {/* Orang Tua */}
                <div className="flex gap-4 items-start bg-emerald-50/75 p-4 rounded-2xl border-2 border-emerald-100">
                  <span className="w-10 h-10 rounded-full bg-emerald-400 border-b-4 border-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                    O
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wide">Petunjuk untuk Orang Tua / Wali Murid:</h4>
                    <p className="text-xs text-emerald-900 mt-1.5 leading-relaxed font-medium">
                      1. Aplikasi ini didesain ramah anak. Dampingi anak Anda mengeksplorasi peta untuk mengenalkan adab sehari-hari (sopan santun di Bab 3).<br />
                      2. Manfaatkan fitur <strong>Kamus Cilik</strong> untuk memperbanyak perbendaharaan kata anak yang sesuai dengan standar MI.<br />
                      3. Jika anak merasa jenuh, gunakan fitur <strong>Tulis Cerita Pendek Mendidik</strong> dari AI Kak Gemini untuk membacakan dongeng pengantar tidur yang mengarah pada nilai moral Islami dan akhlak mulia.
                    </p>
                  </div>
                </div>

                {/* Guru */}
                <div className="flex gap-4 items-start bg-sky-50/75 p-4 rounded-2xl border-2 border-sky-100">
                  <span className="w-10 h-10 rounded-full bg-sky-400 border-b-4 border-sky-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                    G
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-sky-950 uppercase tracking-wide">Petunjuk untuk Guru Madrasah Ibtidaiyah:</h4>
                    <p className="text-xs text-sky-900 mt-1.5 leading-relaxed font-medium">
                      1. Gunakan visualisasi peta konsep ini saat menerangkan ringkasan syllabus Bahasa Indonesia Kelas 2 MI Semester 1 di depan kelas.<br />
                      2. Tunjukkan cara mempraktikkan kuis di papan tulis interaktif, biarkan siswa menebak bersama sebagai bentuk pre-test / post-test interaktif.<br />
                      3. Manfaatkan <strong>Tantangan Kuis AI</strong> di dalam menu Kak Gemini untuk menghasilkan variasi soal latihan baru secara berkelanjutan tanpa kehabisan bank soal.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer styled as in design instruction */}
      <footer className="mt-8 bg-white border-t-2 border-blue-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="ml-2 text-blue-400 text-xs font-bold uppercase tracking-widest font-mono">Learning Module v2.0</span>
          </div>
          <div className="text-blue-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 italic">
            <span>MARI MEMBACA &amp; MENULIS Bersama MI</span>
            <div className="bg-blue-900 text-white w-6 h-6 flex items-center justify-center rounded text-xs shadow-xs">✏️</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
