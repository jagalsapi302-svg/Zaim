/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Vocabulary {
  word: string;
  definition: string;
  sample: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface Subtopic {
  id: string;
  title: string;
  desc: string;
  competencies: string[];
  examples: string[];
  quiz: QuizQuestion[];
  vocabulary: Vocabulary[];
}

export interface Chapter {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  color: string; // color name e.g., 'rose', 'amber', 'emerald', 'sky'
  desc: string;
  subtopics: Subtopic[];
}

export const SYLLABUS_DATA: Chapter[] = [
  {
    id: "bab-1",
    title: "Bab 1: Aku dan Perasaanku",
    icon: "Smile",
    color: "rose",
    desc: "Belajar memahami berbagai macam emosi diri, menceritakan perasaan dengan sopan, serta cara menenangkan diri.",
    subtopics: [
      {
        id: "sub-1-1",
        title: "Mengenali Macam-Macam Perasaan",
        desc: "Siswa belajar membedakan perasaan senang, sedih, marah, takut, gembira, dan terkejut melalui ekspresi wajah dan bahasa tubuh.",
        competencies: [
          "Menyebutkan bermacam-macam perasaan yang dialami manusia.",
          "Mengenali ekspresi wajah dari orang yang senang, sedih, marah, atau takut.",
          "Menceritakan penyebab timbulnya perasaan tersebut secara lisan."
        ],
        examples: [
          "Senang: Ahmad tersenyum lebar saat mendapat nilai bagus di madrasah.",
          "Takut: Fatimah memeluk ibunya ketika mendengar petir yang keras.",
          "Sedih: Wayan menangis karena mainan kesayangannya rusak."
        ],
        quiz: [
          {
            question: "Ketika temanmu tersenyum lebar dan matanya berbinar-binar, perasaan apa yang sedang ia rasakan?",
            options: ["A. Marah", "B. Senang", "C. Takut"],
            answer: "B. Senang",
            explanation: "Tersenyum lebar dan mata berbinar-binar adalah ciri utama seseorang sedang merasa senang atau bahagia."
          },
          {
            question: "Titus gemetar dan menutup matanya saat melihat ruangan gelap. Titus merasa...",
            options: ["A. Takut", "B. Gembira", "C. Sedih"],
            answer: "A. Takut",
            explanation: "Gemetar dan menutup mata adalah reaksi alami tubuh ketika kita merasa takut."
          }
        ],
        vocabulary: [
          {
            word: "Gembira",
            definition: "Rasa sangat senang; bahagia; girang hati.",
            sample: "Ahmad gembira sekali mendapat hadiah buku cerita baru."
          },
          {
            word: "Khawatir",
            definition: "Merasa cemas, gelisah, atau takut akan terjadi hal yang tidak diinginkan.",
            sample: "Fatimah merasa khawatir jika terlambat sampai di sekolah."
          }
        ]
      },
      {
        id: "sub-1-2",
        title: "Cara Menenangkan Diri",
        desc: "Mempelajari teknik mengelola emosi negatif seperti marah atau sedih agar tidak merugikan diri sendiri maupun orang lain.",
        competencies: [
          "Mempraktikkan cara menenangkan diri saat marah (seperti menarik napas dalam-dalam atau beristighfar).",
          "Menjelaskan mengapa kita tidak boleh berteriak atau merusak barang saat marah.",
          "Menceritakan kembali masalah dengan tenang setelah emosi mereda."
        ],
        examples: [
          "Tarik Napas: Menghirup udara lewat hidung secara lambat, lalu mengeluarkannya lewat mulut.",
          "Beristighfar / Berdoa: Memohon perlindungan Allah SWT agar hati tenang (nilai MI).",
          "Berbicara Baik-baik: Mengatakan 'Aku kesal karena bukuku sobek' dengan nada suara yang tenang."
        ],
        quiz: [
          {
            question: "Apa yang sebaiknya kita lakukan saat merasa sangat marah agar hati menjadi tenang kembali?",
            options: [
              "A. Berteriak sekeras-kerasnya",
              "B. Menarik napas dalam-dalam dan beristighfar",
              "C. Melempar benda terdekat"
            ],
            answer: "B. Menarik napas dalam-dalam dan beristighfar",
            explanation: "Menarik napas dalam-dalam dan beristighfar dapat menenangkan jantung dan meredakan amarah secara baik tanpa merugikan orang lain."
          }
        ],
        vocabulary: [
          {
            word: "Sabar",
            definition: "Tahan menghadapi cobaan, tidak lekas marah, tidak lekas putus asa.",
            sample: "Siti dengan sabar merapikan mainan yang diacak-acak adiknya."
          },
          {
            word: "Lega",
            definition: "Merasa senang dan tenteram kembali karena terbebas dari rasa cemas.",
            sample: "Ahmad merasa lega karena kucingnya yang hilang sudah pulang."
          }
        ]
      }
    ]
  },
  {
    id: "bab-2",
    title: "Bab 2: Tubuhku Sehat & Bersih",
    icon: "ShieldAlert",
    color: "emerald",
    desc: "Memahami teks petunjuk tentang kesehatan, merangkai suku kata, serta melatih penggunaan tanda baca titik dan koma.",
    subtopics: [
      {
        id: "sub-2-1",
        title: "Memahami Teks Petunjuk",
        desc: "Siswa diajarkan cara membaca dan mengikuti rangkaian langkah-langkah kerja atau panduan menjaga kesehatan diri.",
        competencies: [
          "Mengurutkan gambar seri tentang petunjuk mencuci tangan atau menggosok gigi.",
          "Menjelaskan kembali isi teks petunjuk secara lisan dengan urutan yang benar.",
          "Menulis kalimat petunjuk pendek menggunakan kata kerja perintah (misal: basuhlah, gosoklah)."
        ],
        examples: [
          "Petunjuk Mencuci Tangan: 1. Basahi tangan dengan air mengalir. 2. Tuangkan sabun secukupnya. 3. Gosok telapak, sela jari, dan punggung tangan. 4. Bilas dengan air bersih. 5. Keringkan pakai lap bersih.",
          "Kalimat Perintah Petunjuk: 'Bilaslah mulutmu dengan air bersih setelah menyikat gigi!'"
        ],
        quiz: [
          {
            question: "Langkah pertama yang benar sebelum menggosok gigi menurut petunjuk kesehatan adalah...",
            options: [
              "A. Langsung berkumur dengan air sabun",
              "B. Membasahi sikat gigi dan mengoleskan pasta gigi secukupnya",
              "C. Mengeringkan sikat gigi menggunakan tisu"
            ],
            answer: "B. Membasahi sikat gigi dan mengoleskan pasta gigi secukupnya",
            explanation: "Sebelum mulai menggosok gigi, kita perlu membasahi sikat gigi terlebih dulu agar bulu sikat lembut, lalu mengoleskan pasta gigi secukupnya."
          }
        ],
        vocabulary: [
          {
            word: "Petunjuk",
            definition: "Ketentuan atau panduan yang menunjukkan arah atau cara menjalankan sesuatu.",
            sample: "Bacalah petunjuk penggunaan obat ini sebelum meminumnya."
          },
          {
            word: "Kuman",
            definition: "Binatang yang amat kecil yang menyebabkan penyakit.",
            sample: "Mencuci tangan dengan sabun dapat membunuh kuman penyebab sakit perut."
          }
        ]
      },
      {
        id: "sub-2-2",
        title: "Tanda Baca Titik (.) dan Koma (,)",
        desc: "Belajar menempatkan tanda baca dasar dengan benar untuk menandai akhir kalimat atau jeda dalam membaca.",
        competencies: [
          "Menggunakan tanda titik (.) di akhir kalimat berita.",
          "Menggunakan tanda koma (,) untuk memisahkan unsur-unsur dalam suatu pemerincian atau pembilangan.",
          "Membaca teks dengan jeda yang tepat sesuai letak koma dan berhenti di letak titik."
        ],
        examples: [
          "Contoh Titik (.): 'Ahmad pergi berolahraga di lapangan madrasah.' (Berhenti membaca)",
          "Contoh Koma (,): 'Ibu membeli apel, jeruk, dan pisang di pasar.' (Ada jeda sedikit)"
        ],
        quiz: [
          {
            question: "Kalimat manakah yang menggunakan tanda baca titik (.) dan koma (,) dengan benar?",
            options: [
              "A. Fatimah membeli buku. pensil, dan penggaris",
              "B. Fatimah membeli buku, pensil, dan penggaris.",
              "C. Fatimah membeli buku koma pensil titik"
            ],
            answer: "B. Fatimah membeli buku, pensil, dan penggaris.",
            explanation: "Tanda koma (,) digunakan untuk memisahkan rincian barang (buku, pensil, dan penggaris), dan tanda titik (.) diletakkan di akhir kalimat."
          }
        ],
        vocabulary: [
          {
            word: "Jeda",
            definition: "Hentian sebentar dalam ujaran (bacaan) untuk menandai pergantian atau pemisahan bagian.",
            sample: "Saat membaca teks dan bertemu tanda koma, berikan jeda sejenak."
          }
        ]
      }
    ]
  },
  {
    id: "bab-3",
    title: "Bab 3: Sopan Santun di Sekolah & Rumah",
    icon: "Heart",
    color: "amber",
    desc: "Membiasakan penggunaan 4 kata ajaib, membuat kalimat ajakan yang ramah, serta memberikan kalimat perintah yang sopan.",
    subtopics: [
      {
        id: "sub-3-1",
        title: "Mengenal 4 Kata Ajaib",
        desc: "Menanamkan karakter mulia (akhlakul karimah) melalui pembiasaan mengucapkan: Tolong, Maaf, Terima Kasih, dan Permisi.",
        competencies: [
          "Menggunakan kata 'Tolong' saat meminta bantuan orang lain.",
          "Mengucapkan kata 'Maaf' ketika melakukan kesalahan secara sengaja maupun tidak sengaja.",
          "Mengucapkan 'Terima Kasih' setelah menerima pemberian atau bantuan.",
          "Mengatakan 'Permisi' saat lewat di depan orang yang lebih tua atau masuk kelas."
        ],
        examples: [
          "Tolong: 'Ahmad, tolong ambilkan buku itu, ya.'",
          "Maaf: 'Maafkan saya, Ustaz, karena datang terlambat.'",
          "Terima Kasih: 'Terima kasih, Fatimah, sudah meminjamkan pensilmu.'",
          "Permisi: 'Permisi, Bu, bolehkah saya izin ke kamar mandi?'"
        ],
        quiz: [
          {
            question: "Ali tidak sengaja menyenggol tempat pensil Hasan hingga jatuh. Apa yang harus Ali katakan?",
            options: [
              "A. 'Hasan, singkirkan kotak pensilmu!'",
              "B. 'Maaf ya Hasan, aku tidak sengaja menjatuhkannya.'",
              "C. 'Terima kasih telah menjatuhkannya.'"
            ],
            answer: "B. 'Maaf ya Hasan, aku tidak sengaja menjatuhkannya.'",
            explanation: "Bila melakukan kesalahan atau ketidaksengajaan yang mengganggu orang lain, kita harus segera meminta maaf dengan sopan."
          },
          {
            question: "Sebelum lewat di depan guru-guru yang sedang berbincang di koridor madrasah, kita sebaiknya mengucapkan...",
            options: [
              "A. 'Permisi, Pak/Bu.'",
              "B. 'Ayo cepat menyingkir!'",
              "C. 'Tolong belikan es krim!'"
            ],
            answer: "A. 'Permisi, Pak/Bu.'",
            explanation: "Mengucapkan 'Permisi' adalah bentuk rasa hormat dan sopan santun saat lewat di depan orang lain."
          }
        ],
        vocabulary: [
          {
            word: "Sopan",
            definition: "Hormat dan takzim; tertib menurut adat yang baik; berbudi bahasa halus.",
            sample: "Anak yang sopan akan selalu disayangi oleh guru dan orang tuanya."
          },
          {
            word: "Santun",
            definition: "Halus dan baik budi bahasanya serta tingkah lakunya; penuh belas kasihan.",
            sample: "Fatimah berbicara dengan santun kepada kakek dan neneknya."
          }
        ]
      },
      {
        id: "sub-3-2",
        title: "Kalimat Ajakan dan Perintah Sopan",
        desc: "Belajar membedakan kalimat untuk mengajak berbuat baik dan memberi perintah secara lembut tanpa menyinggung.",
        competencies: [
          "Membuat kalimat ajakan menggunakan kata 'Ayo' atau 'Mari' dengan tutur kata yang manis.",
          "Mengubah kalimat perintah kasar menjadi kalimat perintah yang santun dengan menyisipkan kata 'tolong' atau akhiran '-lah'.",
          "Memahami nada suara yang tepat saat mengajak atau memohon bantuan."
        ],
        examples: [
          "Ajakan: 'Fatimah, ayo kita membaca buku bersama di perpustakaan madrasah!'",
          "Perintah Sopan: 'Ahmad, tolong tutup pintu kelas itu kembali, ya.'",
          "Bukan Sopan (Salah): 'Tutup pintu itu!'"
        ],
        quiz: [
          {
            question: "Bagaimana cara mengubah perintah kasar 'Ambilkan tas itu!' menjadi kalimat perintah yang sopan?",
            options: [
              "A. 'Ambil tas itu sekarang!'",
              "B. 'Tolong ambilkan tas itu, ya.'",
              "C. 'Bolehkah aku membawa tasmu?'"
            ],
            answer: "B. 'Tolong ambilkan tas itu, ya.'",
            explanation: "Menambahkan kata 'Tolong' di depan kalimat dan diakhiri kata 'ya' dengan nada lembut membuat perintah terasa santun."
          }
        ],
        vocabulary: [
          {
            word: "Ajakan",
            definition: "Anjuran atau imbauan agar orang lain turut melakukan sesuatu bersama-sama.",
            sample: "Ahmad menanggapi ajakan Wayan untuk menyiram tanaman sekolah."
          }
        ]
      }
    ]
  },
  {
    id: "bab-4",
    title: "Bab 4: Keluarga & Gotong Royong",
    icon: "Users",
    color: "sky",
    desc: "Mengenal silsilah keluarga, menguasai 5W+1H kata tanya bahasa Indonesia, serta mengambil hikmah dongeng kerja sama.",
    subtopics: [
      {
        id: "sub-4-1",
        title: "Menguasai Kata Tanya",
        desc: "Memahami fungsi dan penggunaan kata tanya dasar (Apa, Siapa, Kapan, Di mana, Mengapa, Bagaimana) untuk mencari informasi.",
        competencies: [
          "Menggunakan kata tanya 'Siapa' untuk menanyakan orang.",
          "Menggunakan kata tanya 'Di mana' untuk menanyakan tempat.",
          "Menggunakan kata tanya 'Kapan' untuk menanyakan waktu kejadian.",
          "Membuat kalimat tanya sederhana diakhiri dengan tanda tanya (?)."
        ],
        examples: [
          "Siapa: 'Siapa nama wali kelasmu di kelas 2 ini?'",
          "Di mana: 'Di mana letak masjid madrasah?'",
          "Kapan: 'Kapan kita akan mulai ujian semester ganjil?'"
        ],
        quiz: [
          {
            question: "Kata tanya yang tepat untuk melengkapi kalimat: '... yang merapikan meja belajar ini?' adalah...",
            options: ["A. Apa", "B. Di mana", "C. Siapa"],
            answer: "C. Siapa",
            explanation: "Kata 'Siapa' digunakan untuk menanyakan orang atau pelaku tindakan."
          },
          {
            question: "Tanda baca apakah yang wajib diletakkan pada akhir setiap kalimat tanya?",
            options: ["A. Tanda Titik (.)", "B. Tanda Tanya (?)", "C. Tanda Seru (!)"],
            answer: "B. Tanda Tanya (?)",
            explanation: "Setiap kalimat tanya harus diakhiri dengan tanda tanya (?) agar pembaca tahu itu adalah sebuah pertanyaan."
          }
        ],
        vocabulary: [
          {
            word: "Tanya",
            definition: "Permintaan keterangan tentang sesuatu hal.",
            sample: "Ajukan tanya dengan sopan jika kamu belum paham materi pelajaran."
          }
        ]
      },
      {
        id: "sub-4-2",
        title: "Dongeng Fabel & Gotong Royong",
        desc: "Membaca cerita fabel (hewan) bertema tolong-menolong dan gotong royong serta memahami nilai kerjasama.",
        competencies: [
          "Menyebutkan tokoh-tokoh dalam cerita dongeng fabel yang dibacakan.",
          "Menjelaskan arti gotong royong dalam cerita fabel tersebut.",
          "Menceritakan kembali tindakan baik tokoh hewan yang menolong sesamanya."
        ],
        examples: [
          "Fabel Semut dan Gajah: Semut-semut kecil bekerjasama mengangkat ranting pohon besar untuk melindungi sarang mereka.",
          "Hikmah Kerja Bakti: 'Pekerjaan yang berat jika dikerjakan bersama-sama (gotong royong) akan menjadi ringan dan cepat selesai.'"
        ],
        quiz: [
          {
            question: "Apa manfaat utama melakukan gotong royong atau kerja sama saat membersihkan ruang kelas?",
            options: [
              "A. Pekerjaan menjadi terasa sangat lama",
              "B. Pekerjaan yang berat terasa lebih ringan dan cepat selesai",
              "C. Membuat anak-anak saling bermusuhan"
            ],
            answer: "B. Pekerjaan yang berat terasa lebih ringan dan cepat selesai",
            explanation: "Gotong royong membuat pekerjaan berat dikerjakan bersama-sama, sehingga lebih ringan, cepat rampung, dan memupuk kerukunan."
          }
        ],
        vocabulary: [
          {
            word: "Gotong Royong",
            definition: "Bekerja bersama-sama; saling tolong-menolong untuk menyelesaikan pekerjaan.",
            sample: "Seluruh warga kelas 2 melakukan gotong royong membersihkan taman kelas."
          },
          {
            word: "Fabel",
            definition: "Cerita dongeng yang menggambarkan watak dan budi manusia yang diperankan oleh hewan.",
            sample: "Fatimah membacakan adiknya dongeng fabel tentang kancil yang cerdik."
          }
        ]
      }
    ]
  }
];
