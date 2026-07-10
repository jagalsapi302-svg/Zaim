import React, { useState, useEffect } from "react";
import { 
  BookOpenText, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Compass, 
  BookMarked, 
  Award,
  ChevronRight,
  BrainCircuit,
  Volume2,
  AlertCircle
} from "lucide-react";
import { Chapter, Subtopic, QuizQuestion } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface LearningPanelProps {
  subtopic: Subtopic;
  chapter: Chapter;
  onClose?: () => void;
}

type TabType = "belajar" | "kuis" | "ai";

export default function LearningPanel({ subtopic, chapter, onClose }: LearningPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("belajar");
  
  // Local Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Gemini AI Integration States
  const [aiMode, setAiMode] = useState<"none" | "story" | "explain" | "quiz">("none");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  // AI Outputs
  const [aiStory, setAiStory] = useState<{ title: string; content: string; moralValue: string; question: string } | null>(null);
  const [aiExplain, setAiExplain] = useState<{ concept: string; examples: string[]; funFact: string } | null>(null);
  const [aiQuiz, setAiQuiz] = useState<QuizQuestion | null>(null);
  const [aiQuizSelectedAnswer, setAiQuizSelectedAnswer] = useState<string | null>(null);
  const [aiQuizSubmitted, setAiQuizSubmitted] = useState(false);

  // Reset quiz states when subtopic changes
  useEffect(() => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
    
    // Reset AI States
    setAiMode("none");
    setAiStory(null);
    setAiExplain(null);
    setAiQuiz(null);
    setAiQuizSelectedAnswer(null);
    setAiQuizSubmitted(false);
    setAiError(null);
  }, [subtopic]);

  // Color mappings
  const colorMap = {
    rose: {
      accent: "bg-rose-500",
      bg: "bg-rose-50/50",
      border: "border-rose-100",
      text: "text-rose-800",
      textDark: "text-rose-900",
      ring: "focus:ring-rose-500",
      badge: "bg-rose-100 text-rose-800 border-rose-200"
    },
    emerald: {
      accent: "bg-emerald-500",
      bg: "bg-emerald-50/50",
      border: "border-emerald-100",
      text: "text-emerald-800",
      textDark: "text-emerald-900",
      ring: "focus:ring-emerald-500",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    amber: {
      accent: "bg-amber-500",
      bg: "bg-amber-50/50",
      border: "border-amber-100",
      text: "text-amber-800",
      textDark: "text-amber-900",
      ring: "focus:ring-amber-500",
      badge: "bg-amber-100 text-amber-800 border-amber-200"
    },
    sky: {
      accent: "bg-sky-500",
      bg: "bg-sky-50/50",
      border: "border-sky-100",
      text: "text-sky-800",
      textDark: "text-sky-900",
      ring: "focus:ring-sky-500",
      badge: "bg-sky-100 text-sky-800 border-sky-200"
    }
  };

  const colors = colorMap[chapter.color as keyof typeof colorMap] || colorMap.amber;

  // Handle local quiz option select
  const handleAnswerSelect = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
  };

  // Submit local quiz answer
  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    
    const currentQuiz = subtopic.quiz[currentQuizIndex];
    if (selectedAnswer === currentQuiz.answer) {
      setScore(prev => prev + 1);
    }
  };

  // Move to next question or complete local quiz
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    
    if (currentQuizIndex + 1 < subtopic.quiz.length) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Restart local quiz
  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  // Call server-side Gemini API
  const generateAiContent = async (mode: "story" | "explain" | "quiz") => {
    setAiLoading(true);
    setAiError(null);
    setAiMode(mode);
    
    // Clear previous AI outputs
    setAiStory(null);
    setAiExplain(null);
    setAiQuiz(null);
    setAiQuizSelectedAnswer(null);
    setAiQuizSubmitted(false);

    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: mode,
          topic: subtopic.title,
          desc: subtopic.desc
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal menghubungi Kak Gemini.");
      }

      if (mode === "story") {
        setAiStory(data);
      } else if (mode === "explain") {
        setAiExplain(data);
      } else if (mode === "quiz") {
        setAiQuiz(data);
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Terjadi kesalahan jaringan.");
    } finally {
      setAiLoading(false);
    }
  };

  // Speak text using browser SpeechSynthesis (TTS fallback)
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel ongoing speeches
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID'; // Indonesian
      utterance.rate = 0.9; // Friendly, slower rate for grade 2
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Maaf, penyuara teks tidak didukung di peramban ini.");
    }
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-blue-200 shadow-md overflow-hidden flex flex-col h-full">
      {/* Detail Header */}
      <div className={`p-6 border-b-4 border-blue-100 ${colors.bg}`}>
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${colors.badge}`}>
            {chapter.title}
          </span>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-xs font-black text-blue-900 bg-white border-2 border-blue-100 px-3 py-1 rounded-full hover:bg-blue-50 transition-all"
            >
              Tutup
            </button>
          )}
        </div>
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2 leading-tight uppercase">
          {subtopic.title}
        </h3>
        <p className="text-xs text-slate-700 mt-1 font-medium">{subtopic.desc}</p>
      </div>

      {/* Tabs Menu */}
      <div className="flex bg-slate-100 border-b-4 border-blue-100 p-1">
        <button
          id="tab-belajar-btn"
          onClick={() => setActiveTab("belajar")}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "belajar" 
              ? "bg-blue-600 text-white shadow-md border-b-2 border-blue-800" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <BookOpenText className="w-4 h-4" />
          Belajar Seru
        </button>
        <button
          id="tab-kuis-btn"
          onClick={() => setActiveTab("kuis")}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "kuis" 
              ? "bg-blue-600 text-white shadow-md border-b-2 border-blue-800" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Compass className="w-4 h-4" />
          Kuis Gembira
        </button>
        <button
          id="tab-ai-btn"
          onClick={() => setActiveTab("ai")}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "ai" 
              ? "bg-yellow-400 text-yellow-950 shadow-md border-b-2 border-yellow-600" 
              : "text-slate-500 hover:text-yellow-600"
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-amber-600" />
          Kak Gemini AI
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence mode="wait">
          {activeTab === "belajar" && (
            <motion.div
              key="panel-belajar"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              {/* Target Kompetensi */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" /> Target Belajar Kita:
                </h4>
                <ul className="space-y-2">
                  {subtopic.competencies.map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full ${colors.accent} shrink-0`}></div>
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contoh Riil */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Contoh Penggunaan:
                  </h4>
                  <button 
                    onClick={() => speakText(subtopic.examples.join(". "))}
                    className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-all"
                  >
                    <Volume2 className="w-3 h-3" />
                    Suarakan Contoh
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {subtopic.examples.map((example, idx) => (
                    <div key={idx} className="bg-slate-50/75 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
                      <span className="text-xs font-bold text-slate-400 bg-white shadow-xs rounded-full w-5 h-5 flex items-center justify-center border shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{example}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kosakata Cilik */}
              {subtopic.vocabulary.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <BookMarked className="w-4 h-4 text-amber-500" /> Kamus Cilik:
                  </h4>
                  <div className="space-y-3">
                    {subtopic.vocabulary.map((vocab, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border ${colors.border} ${colors.bg}`}>
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-800">{vocab.word}</h5>
                          <button
                            onClick={() => speakText(`${vocab.word}. Artinya: ${vocab.definition}`)}
                            className="p-1 hover:bg-white/80 rounded-md transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 mt-1.5 italic font-medium">Artinya: {vocab.definition}</p>
                        <p className="text-[11px] text-slate-500 mt-1">Contoh kalimat: &quot;{vocab.sample}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "kuis" && (
            <motion.div
              key="panel-kuis"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              {subtopic.quiz.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-500">Kuis gembira belum tersedia untuk topik ini.</p>
                </div>
              ) : quizCompleted ? (
                /* Quiz Complete View */
                <div className="text-center py-6 space-y-4">
                  <div className="inline-block p-4 bg-amber-50 rounded-full text-amber-500 shadow-inner">
                    <Award className="w-12 h-12" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-800">Hebat! Kuis Selesai! 🎉</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Kamu berhasil menjawab <span className="font-bold text-slate-700">{score}</span> dari{" "}
                      <span className="font-bold text-slate-700">{subtopic.quiz.length}</span> soal dengan benar.
                    </p>
                  </div>

                  {/* Cute feedback message */}
                  <div className="bg-slate-50 p-4 rounded-xl max-w-sm mx-auto text-xs text-slate-600 font-medium">
                    {score === subtopic.quiz.length 
                      ? "Masya Allah, jawabanmu benar semua! Kamu anak cerdas dan rajin belajar! ⭐" 
                      : "Wah asyik sekali belajar kuis ini! Mari rajin berlatih agar bisa benar semua selanjutnya! 👍"}
                  </div>

                  <button
                    onClick={handleRestartQuiz}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white ${colors.accent} shadow-sm hover:opacity-90 transition-all`}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Main Lagi
                  </button>
                </div>
              ) : (
                /* Question View */
                <div className="space-y-5">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-500">
                    <span>PERTANYAAN {currentQuizIndex + 1} DARI {subtopic.quiz.length}</span>
                    <span>SKOR: {score}</span>
                  </div>

                  {/* Question Box */}
                  <div className="bg-slate-50/75 p-5 rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-800 leading-relaxed">
                      {subtopic.quiz[currentQuizIndex].question}
                    </p>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-3">
                    {subtopic.quiz[currentQuizIndex].options.map((option, idx) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === subtopic.quiz[currentQuizIndex].answer;
                      
                      let optionStyle = "border-slate-200 hover:border-slate-400 bg-white text-slate-700";
                      if (isSelected) {
                        optionStyle = `border-${chapter.color}-400 bg-${chapter.color}-50/40 text-${chapter.color}-900 font-semibold`;
                      }
                      
                      if (isAnswerSubmitted) {
                        if (isCorrect) {
                          optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                        } else if (isSelected) {
                          optionStyle = "border-rose-300 bg-rose-50 text-rose-900";
                        } else {
                          optionStyle = "border-slate-100 bg-white opacity-55 text-slate-400";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerSubmitted}
                          onClick={() => handleAnswerSelect(option)}
                          className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex items-center justify-between gap-3 ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {isAnswerSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isAnswerSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions & Explanations */}
                  {isAnswerSubmitted ? (
                    <div className="space-y-4 pt-2">
                      {/* Explanatory Box */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-[11px] leading-relaxed text-slate-600">
                        <span className="font-bold text-slate-800 block mb-1">
                          {selectedAnswer === subtopic.quiz[currentQuizIndex].answer ? "🎉 Jawabanmu Benar!" : "😅 Kunci Jawaban:"}
                        </span>
                        {subtopic.quiz[currentQuizIndex].explanation}
                      </div>

                      <button
                        onClick={handleNextQuestion}
                        className={`w-full py-3.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 ${colors.accent} hover:opacity-95 transition-all shadow-xs`}
                      >
                        {currentQuizIndex + 1 < subtopic.quiz.length ? "Pertanyaan Selanjutnya" : "Selesaikan Kuis"}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={!selectedAnswer}
                      onClick={handleSubmitAnswer}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 ${
                        selectedAnswer ? colors.accent : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      } transition-all shadow-xs`}
                    >
                      Periksa Jawaban
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "ai" && (
            <motion.div
              key="panel-ai"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              {aiMode === "none" ? (
                /* Initial Selection Dashboard for Kak Gemini AI */
                <div className="space-y-5">
                  <div className="text-center py-4 bg-amber-50/50 border border-amber-100 rounded-2xl p-4">
                    <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <h4 className="text-xs font-bold text-amber-900">Halo! Aku Kak Gemini AI ✨</h4>
                    <p className="text-[11px] text-amber-700 max-w-xs mx-auto mt-1 leading-relaxed">
                      Pilih aktivitas asyik di bawah ini untuk belajar topik ini bersamaku dengan cara kreatif!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <button
                      id="ai-generate-story-btn"
                      onClick={() => generateAiContent("story")}
                      className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-300 rounded-2xl text-left transition-all group flex items-start gap-4"
                    >
                      <span className="p-2.5 rounded-xl bg-orange-100 text-orange-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                        <BookOpenText className="w-5 h-5" />
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Tulis Cerita Pendek Mendidik</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">Buatkan dongeng anak 4 kalimat tentang Ahmad atau Fatimah mempraktikkan topik ini.</p>
                      </div>
                    </button>

                    <button
                      id="ai-generate-explain-btn"
                      onClick={() => generateAiContent("explain")}
                      className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-300 rounded-2xl text-left transition-all group flex items-start gap-4"
                    >
                      <span className="p-2.5 rounded-xl bg-violet-100 text-violet-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                        <Compass className="w-5 h-5" />
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Minta Dongeng Penjelasan</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">Dapatkan penjelasan mudah ala Kakak Tutor, contoh seru, dan tips menyenangkan.</p>
                      </div>
                    </button>

                    <button
                      id="ai-generate-quiz-btn"
                      onClick={() => generateAiContent("quiz")}
                      className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-300 rounded-2xl text-left transition-all group flex items-start gap-4"
                    >
                      <span className="p-2.5 rounded-xl bg-teal-100 text-teal-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                        <Award className="w-5 h-5" />
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Mulai Tantangan Kuis AI</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">Buat pertanyaan kuis baru secara acak dari database AI untuk menambah wawasanmu.</p>
                      </div>
                    </button>
                  </div>
                </div>
              ) : aiLoading ? (
                /* AI Loading State */
                <div className="text-center py-12 space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="inline-block"
                  >
                    <Sparkles className="w-10 h-10 text-amber-500" />
                  </motion.div>
                  <p className="text-xs text-slate-600 font-medium animate-pulse">
                    {aiMode === "story" && "Kak Gemini sedang menuliskan dongeng bergambar indah untukmu..."}
                    {aiMode === "explain" && "Menyusun penjelasan asyik yang gampang kamu cerna..."}
                    {aiMode === "quiz" && "Mempersiapkan pertanyaan kuis seru buatan AI..."}
                  </p>
                </div>
              ) : aiError ? (
                /* Error handling when Gemini key is missing */
                <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100 space-y-4 text-center">
                  <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                  <div>
                    <h4 className="text-xs font-bold text-rose-950">Gagal Membuka Layanan AI</h4>
                    <p className="text-[11px] text-rose-700 mt-1 leading-relaxed">
                      {aiError.includes("GEMINI_API_KEY") 
                        ? "API Key Gemini belum disetel. Hubungi Admin atau silakan masukkan key Anda di menu Secrets di kanan atas (AI Studio)."
                        : "Maaf, terjadi gangguan jaringan saat menghubungi AI. Silakan coba kembali."}
                    </p>
                  </div>
                  <button
                    onClick={() => setAiMode("none")}
                    className="px-4 py-2 bg-white border border-rose-200 hover:bg-rose-100/40 rounded-xl text-xs font-semibold text-rose-800 transition-all"
                  >
                    Kembali ke Menu
                  </button>
                </div>
              ) : (
                /* Render AI Outputs */
                <div className="space-y-6">
                  {/* Back button */}
                  <button
                    onClick={() => setAiMode("none")}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-all"
                  >
                    ← Pilih Aktivitas Lain
                  </button>

                  {/* 1. STORY MODE OUTPUT */}
                  {aiStory && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                    >
                      <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-100 rounded-2xl space-y-4 shadow-xs">
                        <div className="flex justify-between items-center border-b border-amber-200/50 pb-3">
                          <h4 className="text-sm font-bold text-slate-800">📖 {aiStory.title}</h4>
                          <button
                            onClick={() => speakText(aiStory.content)}
                            className="p-1 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-lg transition-colors"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {aiStory.content}
                        </p>
                        <div className="pt-2 border-t border-amber-200/40 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-amber-900 font-bold leading-normal">
                            Pesan Kebaikan: <span className="font-medium text-slate-600">{aiStory.moralValue}</span>
                          </p>
                        </div>
                      </div>

                      {/* Story Follow up Comprehension Check */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tantangan Pertanyaan:</p>
                        <p className="text-xs text-slate-800 font-medium leading-relaxed">{aiStory.question}</p>
                        <div className="pt-2 flex gap-2">
                          <button 
                            onClick={() => speakText(aiStory.question)}
                            className="text-[10px] bg-slate-200 hover:bg-slate-300 px-3 py-1.5 rounded-lg text-slate-700 font-bold transition-all"
                          >
                            Dengarkan Pertanyaan
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 2. EXPLAIN MODE OUTPUT */}
                  {aiExplain && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                    >
                      {/* Analogy explanation */}
                      <div className="p-5 bg-gradient-to-br from-violet-50 to-indigo-50/40 border border-violet-100 rounded-2xl space-y-3">
                        <h4 className="text-xs font-bold text-violet-950 uppercase tracking-wider flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-violet-500" /> Penjelasan Kakak Tutor:
                        </h4>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {aiExplain.concept}
                        </p>
                      </div>

                      {/* Custom examples */}
                      <div className="space-y-3">
                        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-500" /> Contoh yang sering kita temukan:
                        </h5>
                        <div className="space-y-2">
                          {aiExplain.examples.map((ex, i) => (
                            <div key={i} className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
                              ✨ {ex}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fun fact */}
                      <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-xl text-[11px] leading-relaxed text-teal-900">
                        <span className="font-bold text-teal-950 block mb-1">💡 Tips Asyik & Fakta Menarik:</span>
                        {aiExplain.funFact}
                      </div>
                    </motion.div>
                  )}

                  {/* 3. AI QUIZ MODE OUTPUT */}
                  {aiQuiz && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                    >
                      <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
                        <span className="text-[9px] font-bold tracking-widest text-teal-600 uppercase block mb-2">SOAL DIBUAT OLEH AI</span>
                        <p className="text-xs font-bold text-slate-800 leading-relaxed">
                          {aiQuiz.question}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {aiQuiz.options.map((opt, i) => {
                          const isSelected = aiQuizSelectedAnswer === opt;
                          const isCorrect = opt === aiQuiz.correctAnswer;
                          
                          let btnStyle = "border-slate-200 bg-white text-slate-700";
                          if (isSelected) {
                            btnStyle = "border-amber-400 bg-amber-50/40 text-amber-900 font-semibold";
                          }
                          if (aiQuizSubmitted) {
                            if (isCorrect) {
                              btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                            } else if (isSelected) {
                              btnStyle = "border-rose-300 bg-rose-50 text-rose-900";
                            } else {
                              btnStyle = "border-slate-100 bg-white opacity-55 text-slate-400";
                            }
                          }

                          return (
                            <button
                              key={i}
                              disabled={aiQuizSubmitted}
                              onClick={() => setAiQuizSelectedAnswer(opt)}
                              className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex items-center justify-between gap-3 ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {aiQuizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                              {aiQuizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                            </button>
                          );
                        })}
                      </div>

                      {aiQuizSubmitted ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-[11px] text-slate-600 leading-relaxed">
                            <span className="font-bold text-slate-800 block mb-1">
                              {aiQuizSelectedAnswer === aiQuiz.correctAnswer ? "🎉 Bagus Sekali!" : "😅 Pembahasan:"}
                            </span>
                            {aiQuiz.explanation}
                          </div>
                          <button
                            onClick={() => generateAiContent("quiz")}
                            className="w-full py-3 bg-amber-500 hover:bg-amber-600 rounded-xl text-xs font-bold text-white transition-all shadow-xs"
                          >
                            Buat Soal Baru Lagi
                          </button>
                        </div>
                      ) : (
                        <button
                          disabled={!aiQuizSelectedAnswer}
                          onClick={() => setAiQuizSubmitted(true)}
                          className={`w-full py-3.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 ${
                            aiQuizSelectedAnswer ? "bg-amber-500 hover:opacity-95" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                          } transition-all shadow-xs`}
                        >
                          Periksa Jawaban Kuis AI
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
