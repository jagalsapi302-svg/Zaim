import React, { useState, useMemo } from "react";
import { Search, Volume2, Sparkles, BookOpenCheck, HelpCircle } from "lucide-react";
import { SYLLABUS_DATA, Vocabulary } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function MiniDictionary() {
  const [searchTerm, setSearchTerm] = useState("");

  // Dynamically compile all vocabulary from syllabus data to avoid redundancy
  const allVocabularies = useMemo(() => {
    const map = new Map<string, { vocab: Vocabulary; chapterTitle: string; color: string }>();
    
    SYLLABUS_DATA.forEach(chapter => {
      chapter.subtopics.forEach(sub => {
        sub.vocabulary.forEach(v => {
          // Store with chapter metadata for colorful categorizations
          if (!map.has(v.word.toLowerCase())) {
            map.set(v.word.toLowerCase(), {
              vocab: v,
              chapterTitle: chapter.title.split(":")[0],
              color: chapter.color
            });
          }
        });
      });
    });

    return Array.from(map.values()).sort((a, b) => a.vocab.word.localeCompare(b.vocab.word));
  }, []);

  // Filter vocabulary based on search term
  const filteredVocab = useMemo(() => {
    return allVocabularies.filter(item => 
      item.vocab.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vocab.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vocab.sample.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allVocabularies, searchTerm]);

  const speakText = (word: string, detail: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${word}. ${detail}`);
      utterance.lang = "id-ID";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Suara tidak didukung.");
    }
  };

  const getBadgeColor = (color: string) => {
    const map = {
      rose: "bg-rose-100 text-rose-800 border-rose-200",
      emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
      amber: "bg-amber-100 text-amber-800 border-amber-200",
      sky: "bg-sky-100 text-sky-800 border-sky-200",
    };
    return map[color as keyof typeof map] || "bg-slate-100 text-slate-800 border-slate-200";
  };

  const getCardStyle = (color: string) => {
    const map = {
      rose: "border-b-8 border-rose-500",
      emerald: "border-b-8 border-emerald-500",
      amber: "border-b-8 border-amber-500",
      sky: "border-b-8 border-sky-500",
    };
    return map[color as keyof typeof map] || "border-b-8 border-blue-500";
  };

  return (
    <div className="space-y-6">
      {/* Dictionary Search */}
      <div className="bg-white p-5 rounded-2xl border-2 border-blue-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-base font-black text-blue-900 uppercase tracking-tight flex items-center gap-1.5 justify-center md:justify-start">
            <BookOpenCheck className="w-5 h-5 text-amber-500" /> Kamus Cilik Pelajaran kita
          </h3>
          <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Kumpulan istilah penting pelajaran Bahasa Indonesia Semester 1</p>
        </div>

        <div className="relative w-full md:w-64">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Cari kata cilik..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200/90 focus:outline-hidden focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all font-medium"
          />
        </div>
      </div>

      {/* Grid of Word Cards */}
      {filteredVocab.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-xs">
          <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-semibold">Kata tidak ditemukan</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Cobalah kata kunci lain seperti &quot;Sabar&quot; atau &quot;Kuman&quot;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredVocab.map((item, index) => (
              <motion.div
                key={item.vocab.word}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.04, 0.3) }}
                whileHover={{ y: -2 }}
                className={`bg-white rounded-3xl border-2 border-slate-200 p-5 flex flex-col justify-between shadow-xs hover:shadow-sm transition-all ${getCardStyle(item.color)}`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border ${getBadgeColor(item.color)}`}>
                      {item.chapterTitle}
                    </span>
                    <button
                      onClick={() => speakText(item.vocab.word, `Artinya: ${item.vocab.definition}`)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                      title="Dengarkan pengucapan"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-sm font-black text-slate-800 leading-tight uppercase">
                    {item.vocab.word}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 font-semibold leading-relaxed">
                    Artinya: {item.vocab.definition}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    Contoh Kalimat:
                  </span>
                  <p className="text-[11px] text-slate-500 italic leading-relaxed font-medium">
                    &quot;{item.vocab.sample}&quot;
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
