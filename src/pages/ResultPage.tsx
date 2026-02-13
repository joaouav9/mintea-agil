import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { estimateIQ } from "@/data/quizQuestions";
import AdPlaceholder from "@/components/AdPlaceholder";
import { Brain, Lock, Mail, CreditCard, BookOpen, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Step = "email" | "payment" | "result";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalPoints = (location.state as { totalPoints?: number })?.totalPoints;

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("email");

  useEffect(() => {
    if (totalPoints === undefined) {
      navigate("/");
    }
  }, [totalPoints, navigate]);

  if (totalPoints === undefined) return null;

  const iq = estimateIQ(totalPoints);

  const handleEmailSubmit = () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      toast.error("Vă rugăm introduceți o adresă de email validă.");
      return;
    }
    setStep("payment");
  };

  const handlePayment = () => {
    // Placeholder - integrate real payment later
    toast.success("Plată procesată! Scorul tău IQ este gata.");
    setStep("result");
  };

  const getIQCategory = (iq: number) => {
    if (iq >= 130) return "Foarte Superior";
    if (iq >= 120) return "Superior";
    if (iq >= 110) return "Peste medie";
    if (iq >= 90) return "Mediu";
    if (iq >= 80) return "Sub medie";
    return "Scăzut";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-semibold font-['Space_Grotesk']">Test de IQ - Rezultat</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto w-full px-4 mt-4">
        <AdPlaceholder />
      </div>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {/* STEP 1: Email */}
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="quiz-card rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>

                <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-3">
                  Felicitări! Ai completat testul!
                </h2>
                <p className="text-muted-foreground mb-2">
                  Rezultatul tău IQ a fost calculat cu succes.
                </p>
                <p className="text-muted-foreground mb-8 text-sm">
                  Introdu adresa ta de email pentru a primi rezultatul și informații valoroase despre sănătatea mintală.
                </p>

                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="adresa@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-secondary border-border"
                      onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                    />
                  </div>

                  <Button
                    onClick={handleEmailSubmit}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base py-6"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Continuă
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Nu vom partaja adresa ta de email cu nimeni.
                </p>
              </motion.div>
            )}

            {/* STEP 2: Payment */}
            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="quiz-card rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-accent" />
                </div>

                <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-3">
                  Deblochează rezultatul tău IQ
                </h2>
                <p className="text-muted-foreground mb-2">
                  Email: <span className="text-foreground font-medium">{email}</span>
                </p>
                <p className="text-muted-foreground mb-8 text-sm">
                  Pentru doar <span className="text-accent font-bold text-base">1,99€</span> vei primi:
                </p>

                <ul className="text-left space-y-3 mb-8 max-w-xs mx-auto">
                  {[
                    "Scorul tău IQ complet",
                    "Analiza detaliată a performanței",
                    "Ebook gratuit despre sănătatea mintală",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                        <span className="text-accent text-xs">✓</span>
                      </span>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={handlePayment}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base py-6"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Plătește 1,99€
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  Plată securizată. Satisfacție garantată.
                </p>
              </motion.div>
            )}

            {/* STEP 3: Result + Ebook section */}
            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* IQ Result */}
                <div className="quiz-card rounded-2xl p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-28 h-28 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center mx-auto mb-6"
                  >
                    <span className="text-4xl font-bold text-gradient font-['Space_Grotesk']">
                      {iq}
                    </span>
                  </motion.div>

                  <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-2">
                    Scorul tău IQ: {iq}
                  </h2>
                  <p className="text-lg text-primary font-medium mb-4">
                    Categorie: {getIQCategory(iq)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Acest rezultat este o estimare bazată pe răspunsurile tale. Pentru o evaluare completă, consultă un psiholog specializat.
                  </p>
                </div>

                {/* Anxiety & Depression info */}
                <div className="quiz-card rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Heart className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-['Space_Grotesk']">
                      Anxietate și Depresie: Ce trebuie să știi
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      <span className="text-foreground font-semibold">Anxietatea</span> este o reacție naturală la stres, dar când devine cronică, poate afecta semnificativ calitatea vieții. Simptomele includ neliniște persistentă, dificultăți de concentrare, tensiune musculară, probleme de somn și atacuri de panică.
                    </p>
                    <p>
                      <span className="text-foreground font-semibold">Depresia</span> este o tulburare de dispoziție care provoacă un sentiment persistent de tristețe și pierdere a interesului. Afectează modul în care gândești, te simți și te comporți. Simptomele pot include oboseală, modificări ale apetitului, sentimente de vinovăție și dificultăți în luarea deciziilor.
                    </p>
                    <p>
                      Este important să știi că ambele condiții sunt tratabile. Terapia cognitiv-comportamentală, exercițiile fizice regulate, tehnicile de relaxare și, în unele cazuri, medicația pot ajuta semnificativ.
                    </p>
                    <p className="text-foreground font-medium">
                      Dacă te confrunți cu simptome de anxietate sau depresie, nu ezita să consulți un specialist. Nu ești singur/ă!
                    </p>
                  </div>
                </div>

                {/* Ebook placeholder section */}
                <div className="quiz-card rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2">
                    Ebook Gratuit
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Descarcă ghidul nostru complet despre simptomele clinice ale depresiei și anxietății - informații esențiale pentru sănătatea ta mintală.
                  </p>

                  {/* === EBOOK PLACEHOLDER - Replace this with your real ebook link === */}
                  <div className="border-2 border-dashed border-border rounded-xl p-6 mb-4 bg-secondary/30">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                      Spațiu rezervat pentru Ebook
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Aici va fi butonul de descărcare a ebook-ului tău.
                    </p>
                  </div>
                  {/* === END EBOOK PLACEHOLDER === */}
                </div>

                <div className="max-w-3xl mx-auto w-full">
                  <AdPlaceholder />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <div className="max-w-3xl mx-auto w-full px-4 mb-6">
        <AdPlaceholder />
      </div>
    </div>
  );
};

export default ResultPage;
