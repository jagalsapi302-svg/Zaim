import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header as required
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Server-side API endpoint for Grade 2 MI Bahasa Indonesia
app.post("/api/gemini/generate", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY belum dikonfigurasi di secrets panel.",
      });
    }

    const { type, topic, desc } = req.body;
    if (!type || !topic) {
      return res.status(400).json({ error: "Parameter type dan topic wajib diisi." });
    }

    if (type === "story") {
      const prompt = `Buatkan sebuah cerita pendek interaktif berbahasa Indonesia yang sangat sederhana, hangat, dan mendidik untuk anak kelas 2 MI (Madrasah Ibtidaiyah, usia sekitar 7-8 tahun) mengenai topik: "${topic}". Penjelasan topik: ${desc || ""}.
      Gunakan karakter anak-anak yang sopan seperti Ahmad, Fatimah, atau kawan-kawannya di sekolah madrasah/lingkungan rumah.
      Berikan pesan moral positif (nilai kebaikan, sopan santun, atau kerjasama).
      Cerita maksimal terdiri dari 4-5 kalimat pendek dan mudah dipahami.
      Tambahkan satu pertanyaan pemahaman sederhana di akhir yang berkaitan dengan cerita tersebut.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Judul cerita pendek yang menarik bagi anak-anak." },
              content: { type: Type.STRING, description: "Isi cerita pendek sebanyak 4-5 kalimat sederhana." },
              moralValue: { type: Type.STRING, description: "Pesan moral atau nilai kebaikan dari cerita ini." },
              question: { type: Type.STRING, description: "Pertanyaan pemahaman cerita untuk anak." },
            },
            required: ["title", "content", "moralValue", "question"],
          },
        },
      });

      const responseText = response.text || "{}";
      return res.json(JSON.parse(responseText.trim()));

    } else if (type === "quiz") {
      const prompt = `Buatkan satu soal kuis pilihan ganda interaktif berbahasa Indonesia tentang materi kelas 2 MI Semester 1: "${topic}". Penjelasan materi: ${desc || ""}.
      Soal harus ramah anak, mudah dipahami siswa kelas 2 MI (usia 7-8 tahun).
      Sediakan 3 pilihan jawaban (A, B, C) - untuk anak SD kelas 2, tiga pilihan saja sudah cukup.
      Sertakan kunci jawaban yang benar dan penjelasan yang ramah mengapa jawaban tersebut benar.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "Pertanyaan kuis yang ramah anak." },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Tepat 3 pilihan jawaban singkat (misal: 'A. Meminta maaf', 'B. Berteriak', 'C. Menangis').",
              },
              correctAnswer: { type: Type.STRING, description: "Jawaban yang benar, harus sama persis dengan salah satu pilihan di atas." },
              explanation: { type: Type.STRING, description: "Penjelasan mengapa jawaban tersebut benar dengan bahasa yang menyemangati anak." },
            },
            required: ["question", "options", "correctAnswer", "explanation"],
          },
        },
      });

      const responseText = response.text || "{}";
      return res.json(JSON.parse(responseText.trim()));

    } else if (type === "explain") {
      const prompt = `Jelaskan konsep tata bahasa/materi Bahasa Indonesia kelas 2 MI berikut dengan gaya bahasa dongeng atau penjelasan 'Kakak Tutor' yang sangat hangat, seru, dan mudah dipahami anak usia 7-8 tahun:
      Materi: "${topic}"
      Deskripsi singkat: ${desc || ""}
      Berikan penjelasan yang singkat (2-3 kalimat), 3 contoh penggunaan sehari-hari yang dekat dengan anak (seperti di rumah atau di madrasah), serta satu fakta seru atau tips asyik untuk mempraktikkannya.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              concept: { type: Type.STRING, description: "Penjelasan materi yang sangat sederhana, hangat, dan ramah anak." },
              examples: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Tepat 3 contoh penggunaan sehari-hari yang dekat dengan kehidupan anak MI."
              },
              funFact: { type: Type.STRING, description: "Fakta seru atau tips asyik bagi anak untuk melatih topik ini." },
            },
            required: ["concept", "examples", "funFact"],
          },
        },
      });

      const responseText = response.text || "{}";
      return res.json(JSON.parse(responseText.trim()));
    } else {
      return res.status(400).json({ error: "Tipe request tidak didukung." });
    }
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({
      error: "Gagal memproses permintaan AI. Pastikan API key Anda valid dan coba lagi.",
      details: err.message,
    });
  }
});

// Configure Vite integration or static file serving
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode serving static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
};

startServer();
