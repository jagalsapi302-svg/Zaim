import React, { useState } from "react";
import { 
  Smile, 
  ShieldAlert, 
  Heart, 
  Users, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Network, 
  Grid,
  BookOpen,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { Chapter, Subtopic, SYLLABUS_DATA } from "../types";
import { motion, AnimatePresence } from "motion/react";

// Helper component to render Lucide Icons dynamically
export const IconRenderer = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
  switch (name) {
    case "Smile":
      return <Smile className={className} />;
    case "ShieldAlert":
      return <ShieldAlert className={className} />;
    case "Heart":
      return <Heart className={className} />;
    case "Users":
      return <Users className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};

interface ConceptMapProps {
  onSelectSubtopic: (subtopic: Subtopic, chapter: Chapter) => void;
  selectedSubtopicId?: string;
  searchQuery: string;
}

export default function ConceptMap({ onSelectSubtopic, selectedSubtopicId, searchQuery }: ConceptMapProps) {
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    "bab-1": true,
    "bab-2": true,
    "bab-3": true,
    "bab-4": true,
  });

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter Chapters & Subtopics based on search
  const filteredSyllabus = SYLLABUS_DATA.map(chapter => {
    const matchedSubtopics = chapter.subtopics.filter(sub => {
      const matchesTitle = sub.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDesc = sub.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesComp = sub.competencies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesVocab = sub.vocabulary.some(v => v.word.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTitle || matchesDesc || matchesComp || matchesVocab;
    });

    const isChapterMatch = chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           chapter.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return {
      ...chapter,
      // If the chapter matches but subtopics don't, show all subtopics. Otherwise show matched subtopics.
      subtopics: isChapterMatch ? chapter.subtopics : matchedSubtopics,
      isMatched: isChapterMatch || matchedSubtopics.length > 0
    };
  }).filter(chapter => chapter.isMatched);

  // Color mapping utilities
  const getColorClasses = (color: string) => {
    const map = {
      rose: {
        border: "border-2 border-rose-300",
        bg: "bg-rose-50/75 hover:bg-rose-100/50",
        text: "text-rose-950",
        accent: "bg-rose-500",
        badge: "bg-rose-100 text-rose-700 border-rose-200",
        thickCard: "bg-rose-400 border-b-8 border-rose-600 shadow-xl text-rose-950",
        accentText: "text-rose-950",
        bentoBorder: "border-b-8 border-rose-500"
      },
      emerald: {
        border: "border-2 border-emerald-300",
        bg: "bg-emerald-50/75 hover:bg-emerald-100/50",
        text: "text-emerald-950",
        accent: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
        thickCard: "bg-emerald-400 border-b-8 border-emerald-600 shadow-xl text-emerald-950",
        accentText: "text-emerald-950",
        bentoBorder: "border-b-8 border-emerald-500"
      },
      amber: {
        border: "border-2 border-amber-300",
        bg: "bg-amber-50/75 hover:bg-amber-100/50",
        text: "text-amber-950",
        accent: "bg-amber-500",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        thickCard: "bg-amber-400 border-b-8 border-amber-600 shadow-xl text-amber-950",
        accentText: "text-amber-950",
        bentoBorder: "border-b-8 border-amber-500"
      },
      sky: {
        border: "border-2 border-sky-300",
        bg: "bg-sky-50/75 hover:bg-sky-100/50",
        text: "text-sky-950",
        accent: "bg-sky-500",
        badge: "bg-sky-100 text-sky-700 border-sky-200",
        thickCard: "bg-sky-400 border-b-8 border-sky-600 shadow-xl text-sky-950",
        accentText: "text-sky-950",
        bentoBorder: "border-b-8 border-sky-500"
      }
    };
    return map[color as keyof typeof map] || map.amber;
  };

  return (
    <div className="w-full">
      {/* View Mode Selectors */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-xs text-blue-900 font-black tracking-wider uppercase font-mono">
          MENAMPILKAN: <span className="text-blue-700 bg-blue-100 px-2 py-1 rounded-md">{filteredSyllabus.length} TEMA BELAJAR</span>
        </div>
        <div className="flex bg-blue-100/80 p-1 rounded-xl border-2 border-blue-200 shadow-xs">
          <button
            id="view-mode-map-btn"
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "map" 
                ? "bg-white text-blue-950 shadow-xs border border-blue-200/40" 
                : "text-blue-800/70 hover:text-blue-900"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Peta Pikiran
          </button>
          <button
            id="view-mode-grid-btn"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "grid" 
                ? "bg-white text-blue-950 shadow-xs border border-blue-200/40" 
                : "text-blue-800/70 hover:text-blue-900"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Daftar Bento
          </button>
        </div>
      </div>

      {filteredSyllabus.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border-2 border-blue-100 shadow-xs">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-700">Materi tidak ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
            Coba ketik kata kunci lain seperti &quot;minta maaf&quot;, &quot;tanda baca&quot;, atau nama perasaan.
          </p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === "map" ? (
            <motion.div 
              key="map-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 relative"
            >
              {/* Central Hub Node (Visually anchors the Mindmap) */}
              <div className="flex justify-center mb-10 relative">
                {/* Connection Lines (SVG) */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 -z-10 hidden md:block border-dashed border-b-2"></div>
                <div className="z-10 bg-yellow-400 w-52 h-52 rounded-full border-8 border-white shadow-2xl flex flex-col items-center justify-center text-center p-4 transform hover:scale-105 transition-transform duration-200 rotate-2">
                  <span className="text-5xl mb-2">🎒</span>
                  <span className="text-xl font-black text-yellow-900 leading-none">BELAJAR<br />ASYIK</span>
                  <div className="mt-2 bg-yellow-900/10 px-3 py-1 rounded-full text-[9px] font-bold text-yellow-900 tracking-wider">TEMA UTAMA</div>
                </div>
              </div>

              {/* Mindmap Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative">
                {filteredSyllabus.map((chapter) => {
                  const colors = getColorClasses(chapter.color);
                  const isExpanded = expandedChapters[chapter.id] || searchQuery.length > 0;

                  return (
                    <div key={chapter.id} className={`relative rounded-3xl p-5 ${colors.thickCard} transition-all`}>
                      
                      {/* Chapter Header Link Point */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border-b-4 border-slate-300 shadow-md text-slate-800">
                            <IconRenderer name={chapter.icon} className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">{chapter.title}</h3>
                            <p className="text-[11px] text-slate-900/80 line-clamp-1 font-semibold">{chapter.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleChapter(chapter.id)}
                          className="p-1.5 hover:bg-white/30 rounded-lg text-slate-900 transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Stem lines drawing to subtopics inside card */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-4 pt-4 border-t border-white/20"
                          >
                            <div className="space-y-3 relative">
                              {chapter.subtopics.map((subtopic) => {
                                const isSelected = selectedSubtopicId === subtopic.id;
                                return (
                                  <motion.button
                                    key={subtopic.id}
                                    id={`subtopic-node-${subtopic.id}`}
                                    onClick={() => onSelectSubtopic(subtopic, chapter)}
                                    whileHover={{ x: 4, scale: 1.01 }}
                                    className={`w-full text-left p-3 rounded-xl border transition-all relative flex items-start gap-3 group ${
                                      isSelected 
                                        ? "bg-white border-b-4 border-slate-800 text-slate-900 shadow-md ring-2 ring-white/50" 
                                        : "bg-white/40 hover:bg-white/60 border-transparent text-slate-900"
                                    }`}
                                  >
                                    <span className="text-lg mt-0.5">🔹</span>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-2">
                                        <h4 className="text-xs font-black text-slate-900 truncate">
                                          {subtopic.title}
                                        </h4>
                                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${colors.badge} border shrink-0`}>
                                          {subtopic.vocabulary.length} Kosakata
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-slate-800/85 mt-1 line-clamp-1 font-medium">{subtopic.desc}</p>
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Modern Bento Grid View (Perfect for Desktop details) */
            <motion.div 
              key="grid-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSyllabus.flatMap(chapter => 
                chapter.subtopics.map(subtopic => {
                  const colors = getColorClasses(chapter.color);
                  const isSelected = selectedSubtopicId === subtopic.id;

                  return (
                    <motion.div
                      key={subtopic.id}
                      whileHover={{ y: -3 }}
                      className={`bg-white rounded-3xl border-2 border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${colors.bentoBorder} ${
                        isSelected ? "ring-4 ring-blue-300" : ""
                      }`}
                    >
                      <div>
                        {/* Header badge & Icon */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[9px] font-black tracking-wide uppercase px-2 py-0.5 rounded-full border ${colors.badge}`}>
                            {chapter.title.split(":")[0]}
                          </span>
                          <div className={`p-1.5 rounded-lg text-white ${colors.accent}`}>
                            <IconRenderer name={chapter.icon} className="w-4 h-4" />
                          </div>
                        </div>

                        <h4 className="text-sm font-black text-slate-800 leading-tight mb-2 uppercase">
                          {subtopic.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-3 mb-4 font-medium">
                          {subtopic.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex gap-1">
                          <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold font-mono">
                            {subtopic.competencies.length} Target
                          </span>
                          <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold font-mono">
                            {subtopic.quiz.length} Kuis
                          </span>
                        </div>
                        <button
                          id={`bento-learn-btn-${subtopic.id}`}
                          onClick={() => onSelectSubtopic(subtopic, chapter)}
                          className={`text-[10px] font-black px-3 py-1.5 rounded-xl transition-all text-white ${colors.accent} shadow-xs hover:opacity-90 border-b-2 border-black/20`}
                        >
                          Pelajari
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
