export interface QuizOption {
  text: string;
  points: number;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

// Non-linear progress percentages for each question (1-32)
export const progressMap: number[] = [
  3, 5, 8, 11, 13, 17, 19, 22, 24, 27,
  30, 33, 35, 38, 41, 44, 46, 49, 52, 55,
  57, 60, 63, 66, 69, 72, 75, 79, 83, 88,
  94, 100
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Care este următorul număr din secvența: 2, 4, 8, 16, ...?",
    options: [
      { text: "24", points: 1 },
      { text: "32", points: 3 },
      { text: "30", points: 0 },
      { text: "28", points: 0 },
    ],
  },
  {
    question: "Dacă toate rozele sunt flori și unele flori se ofilesc repede, care afirmație este adevărată?",
    options: [
      { text: "Toate rozele se ofilesc repede", points: 0 },
      { text: "Unele roze se pot ofili repede", points: 3 },
      { text: "Nicio roză nu se ofilește", points: 0 },
      { text: "Rozele nu sunt flori", points: 0 },
    ],
  },
  {
    question: "Care cuvânt nu se potrivește în grupul următor: Câine, Pisică, Leu, Măr?",
    options: [
      { text: "Câine", points: 0 },
      { text: "Leu", points: 1 },
      { text: "Măr", points: 3 },
      { text: "Pisică", points: 0 },
    ],
  },
  {
    question: "Ce număr lipsește: 3, 6, 9, __, 15?",
    options: [
      { text: "11", points: 0 },
      { text: "12", points: 3 },
      { text: "13", points: 1 },
      { text: "10", points: 0 },
    ],
  },
  {
    question: "Dacă CARTE se codifică ca DBSUF, cum se codifică MASA?",
    options: [
      { text: "NBTB", points: 3 },
      { text: "NBUB", points: 1 },
      { text: "MBTB", points: 0 },
      { text: "NCUB", points: 0 },
    ],
  },
  {
    question: "Un ceas arată 3:15. Care este unghiul dintre orar și minutar?",
    options: [
      { text: "0 grade", points: 1 },
      { text: "7.5 grade", points: 3 },
      { text: "15 grade", points: 0 },
      { text: "90 grade", points: 0 },
    ],
  },
  {
    question: 'Care este antonimul cuvântului "efemer"?',
    options: [
      { text: "Scurt", points: 0 },
      { text: "Permanent", points: 3 },
      { text: "Durabil", points: 1 },
      { text: "Rapid", points: 0 },
    ],
  },
  {
    question: "Dacă 5 muncitori termină o lucrare în 10 zile, câte zile le trebuie la 10 muncitori?",
    options: [
      { text: "20 zile", points: 0 },
      { text: "5 zile", points: 3 },
      { text: "7 zile", points: 1 },
      { text: "10 zile", points: 0 },
    ],
  },
  {
    question: "Care figură completează seria: ○, □, △, ○, □, ...?",
    options: [
      { text: "○", points: 0 },
      { text: "□", points: 0 },
      { text: "△", points: 3 },
      { text: "◇", points: 0 },
    ],
  },
  {
    question: "Ce relație are fratele tatălui tău cu tine?",
    options: [
      { text: "Văr", points: 0 },
      { text: "Unchi", points: 3 },
      { text: "Bunic", points: 0 },
      { text: "Nepot", points: 0 },
    ],
  },
  {
    question: "Care este rezultatul: 15% din 200?",
    options: [
      { text: "25", points: 0 },
      { text: "30", points: 3 },
      { text: "35", points: 1 },
      { text: "20", points: 0 },
    ],
  },
  {
    question: "Alegeți cuvântul care completează analogia: Carte este pentru Citit, așa cum Furculița este pentru ___?",
    options: [
      { text: "Bucătărie", points: 0 },
      { text: "Mâncat", points: 3 },
      { text: "Metal", points: 0 },
      { text: "Gătit", points: 1 },
    ],
  },
  {
    question: "Care număr este cel mai mare: 0.5, 1/3, 0.25, 2/5?",
    options: [
      { text: "1/3", points: 0 },
      { text: "0.5", points: 3 },
      { text: "2/5", points: 1 },
      { text: "0.25", points: 0 },
    ],
  },
  {
    question: "Dacă azi este miercuri, ce zi va fi peste 25 de zile?",
    options: [
      { text: "Luni", points: 0 },
      { text: "Duminică", points: 3 },
      { text: "Sâmbătă", points: 1 },
      { text: "Marți", points: 0 },
    ],
  },
  {
    question: "Care este următorul termen: A, C, F, J, ...?",
    options: [
      { text: "M", points: 0 },
      { text: "O", points: 3 },
      { text: "N", points: 1 },
      { text: "P", points: 0 },
    ],
  },
  {
    question: "Un tren parcurge 120 km în 2 ore. Care este viteza medie?",
    options: [
      { text: "50 km/h", points: 0 },
      { text: "60 km/h", points: 3 },
      { text: "55 km/h", points: 1 },
      { text: "70 km/h", points: 0 },
    ],
  },
  {
    question: 'Care cuvânt este sinonimul lui "sagace"?',
    options: [
      { text: "Prost", points: 0 },
      { text: "Perspicace", points: 3 },
      { text: "Curajos", points: 0 },
      { text: "Inteligent", points: 1 },
    ],
  },
  {
    question: "Câte triunghiuri sunt într-un pentagon regulat?",
    options: [
      { text: "3", points: 1 },
      { text: "5", points: 3 },
      { text: "4", points: 0 },
      { text: "6", points: 0 },
    ],
  },
  {
    question: "Dacă A > B și B > C, atunci:",
    options: [
      { text: "C > A", points: 0 },
      { text: "A > C", points: 3 },
      { text: "A = C", points: 0 },
      { text: "Nu se poate determina", points: 1 },
    ],
  },
  {
    question: "Care este numărul care lipsește: 1, 1, 2, 3, 5, 8, __?",
    options: [
      { text: "11", points: 0 },
      { text: "13", points: 3 },
      { text: "12", points: 1 },
      { text: "10", points: 0 },
    ],
  },
  {
    question: "Un pătrat are perimetrul de 24 cm. Care este aria sa?",
    options: [
      { text: "30 cm²", points: 0 },
      { text: "36 cm²", points: 3 },
      { text: "24 cm²", points: 1 },
      { text: "48 cm²", points: 0 },
    ],
  },
  {
    question: "Care element nu aparține grupului: Apă, Suc, Lapte, Pâine?",
    options: [
      { text: "Apă", points: 0 },
      { text: "Pâine", points: 3 },
      { text: "Suc", points: 0 },
      { text: "Lapte", points: 1 },
    ],
  },
  {
    question: "Dacă 3x + 7 = 22, cât este x?",
    options: [
      { text: "4", points: 0 },
      { text: "5", points: 3 },
      { text: "6", points: 1 },
      { text: "3", points: 0 },
    ],
  },
  {
    question: "Ce urmează în serie: 100, 81, 64, 49, ...?",
    options: [
      { text: "25", points: 0 },
      { text: "36", points: 3 },
      { text: "34", points: 0 },
      { text: "40", points: 1 },
    ],
  },
  {
    question: "Care planetă este cea mai apropiată de Soare?",
    options: [
      { text: "Venus", points: 1 },
      { text: "Mercur", points: 3 },
      { text: "Marte", points: 0 },
      { text: "Pământ", points: 0 },
    ],
  },
  {
    question: "Câte fețe are un cub?",
    options: [
      { text: "4", points: 0 },
      { text: "6", points: 3 },
      { text: "8", points: 1 },
      { text: "12", points: 0 },
    ],
  },
  {
    question: 'Care este opusul cuvântului "concav"?',
    options: [
      { text: "Drept", points: 0 },
      { text: "Convex", points: 3 },
      { text: "Rotund", points: 1 },
      { text: "Plat", points: 0 },
    ],
  },
  {
    question: "Dacă un produs costă 80 lei cu reducere de 25%, care era prețul inițial?",
    options: [
      { text: "100 lei", points: 1 },
      { text: "106.67 lei", points: 3 },
      { text: "110 lei", points: 0 },
      { text: "95 lei", points: 0 },
    ],
  },
  {
    question: "Care figură are cele mai multe axe de simetrie?",
    options: [
      { text: "Pătrat", points: 1 },
      { text: "Cerc", points: 3 },
      { text: "Triunghi echilateral", points: 0 },
      { text: "Dreptunghi", points: 0 },
    ],
  },
  {
    question: "Ce literă urmează: Z, X, V, T, ...?",
    options: [
      { text: "S", points: 1 },
      { text: "R", points: 3 },
      { text: "Q", points: 0 },
      { text: "P", points: 0 },
    ],
  },
  {
    question: "Maria are de 3 ori mai mulți ani decât Ion. Împreună au 48 de ani. Câți ani are Maria?",
    options: [
      { text: "32", points: 0 },
      { text: "36", points: 3 },
      { text: "34", points: 1 },
      { text: "24", points: 0 },
    ],
  },
  {
    question: "Care este cel mai mic număr prim mai mare decât 20?",
    options: [
      { text: "21", points: 0 },
      { text: "23", points: 3 },
      { text: "22", points: 0 },
      { text: "25", points: 1 },
    ],
  },
];

// IQ estimation based on total points (max = 32 * 3 = 96)
export function estimateIQ(totalPoints: number): number {
  const maxPoints = 96;
  const ratio = totalPoints / maxPoints;

  if (ratio >= 0.95) return 145;
  if (ratio >= 0.9) return 138;
  if (ratio >= 0.85) return 132;
  if (ratio >= 0.8) return 127;
  if (ratio >= 0.75) return 122;
  if (ratio >= 0.7) return 118;
  if (ratio >= 0.65) return 114;
  if (ratio >= 0.6) return 110;
  if (ratio >= 0.55) return 106;
  if (ratio >= 0.5) return 102;
  if (ratio >= 0.45) return 98;
  if (ratio >= 0.4) return 95;
  if (ratio >= 0.35) return 92;
  if (ratio >= 0.3) return 88;
  if (ratio >= 0.25) return 85;
  if (ratio >= 0.2) return 82;
  return 78;
}
