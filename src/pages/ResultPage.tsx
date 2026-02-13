import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { estimateIQ } from "@/data/quizQuestions";
import AdPlaceholder from "@/components/AdPlaceholder";
import {
  Brain, Lock, Mail, CreditCard, BookOpen, CheckCircle2,
  Heart, Sparkles, ArrowRight, Shield, Star, TrendingUp,
  AlertTriangle, Phone
} from "lucide-react";
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
  const [animatedIQ, setAnimatedIQ] = useState(0);

  useEffect(() => {
    if (totalPoints === undefined) {
      navigate("/");
    }
  }, [totalPoints, navigate]);

  const iq = totalPoints !== undefined ? estimateIQ(totalPoints) : 0;

  // Animate IQ counter
  useEffect(() => {
    if (step !== "result") return;
    let start = 0;
    const end = iq;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedIQ(end);
        clearInterval(timer);
      } else {
        setAnimatedIQ(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [step, iq]);

  if (totalPoints === undefined) return null;

  const handleEmailSubmit = () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      toast.error("Vă rugăm introduceți o adresă de email validă.");
      return;
    }
    setStep("payment");
  };

  const handlePayment = () => {
    toast.success("Plată procesată cu succes!");
    setStep("result");
  };

  const getIQCategory = (iq: number) => {
    if (iq >= 130) return { label: "Foarte Superior", color: "text-accent", emoji: "🏆" };
    if (iq >= 120) return { label: "Superior", color: "text-accent", emoji: "⭐" };
    if (iq >= 110) return { label: "Peste medie", color: "text-primary", emoji: "🎯" };
    if (iq >= 90) return { label: "Mediu", color: "text-primary", emoji: "📊" };
    if (iq >= 80) return { label: "Sub medie", color: "text-muted-foreground", emoji: "📈" };
    return { label: "Scăzut", color: "text-muted-foreground", emoji: "📚" };
  };

  const category = getIQCategory(iq);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-semibold font-['Space_Grotesk'] text-foreground">Test de IQ</span>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span>Securizat</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto w-full px-4 mt-4">
        <AdPlaceholder />
      </div>

      <main className="flex-1 px-4 py-6">
        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">

            {/* ══════ STEP 1: EMAIL ══════ */}
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Teaser card */}
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                  <div className="relative p-8 text-center">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="inline-block mb-5"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
                        <Sparkles className="w-10 h-10 text-primary" />
                      </div>
                    </motion.div>

                    <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-2">
                      Testul tău este complet!
                    </h2>
                    <p className="text-muted-foreground mb-1">
                      Am analizat toate cele 32 de răspunsuri.
                    </p>

                    {/* Fake blurred result teaser */}
                    <div className="my-6 relative">
                      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-secondary/80 border border-border">
                        <span className="text-sm text-muted-foreground">Scorul tău IQ:</span>
                        <span className="text-3xl font-bold font-['Space_Grotesk'] text-foreground blur-md select-none">
                          {iq}
                        </span>
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">
                      Introdu email-ul tău pentru a debloca rezultatul complet.
                    </p>
                  </div>
                </div>

                {/* Email form */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="adresa.ta@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                        className="pl-10 h-12 bg-secondary border-border text-base"
                      />
                    </div>

                    <Button
                      onClick={handleEmailSubmit}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base h-12"
                    >
                      Deblochează rezultatul
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
                      <Shield className="w-3 h-3" />
                      Datele tale sunt protejate și confidențiale.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════ STEP 2: PAYMENT ══════ */}
            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  {/* Top accent bar */}
                  <div className="h-1.5 progress-bar-fill" />

                  <div className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5">
                      <Lock className="w-8 h-8 text-accent" />
                    </div>

                    <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-2">
                      Ultimul pas!
                    </h2>
                    <p className="text-muted-foreground text-sm mb-6">
                      Deblochează rezultatul complet pentru doar:
                    </p>

                    {/* Price tag */}
                    <div className="inline-flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-bold font-['Space_Grotesk'] text-gradient">1,99</span>
                      <span className="text-xl font-semibold text-muted-foreground">€</span>
                    </div>

                    {/* Benefits */}
                    <div className="bg-secondary/50 rounded-xl p-5 mb-6 text-left">
                      {[
                        { icon: Brain, text: "Scorul tău IQ exact și categoria" },
                        { icon: TrendingUp, text: "Analiză detaliată a inteligenței tale" },
                        { icon: BookOpen, text: "Ebook gratuit: Sănătate mintală" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 py-3 ${i < 2 ? "border-b border-border" : ""}`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                            <item.icon className="w-4 h-4 text-accent" />
                          </div>
                          <span className="text-sm text-foreground">{item.text}</span>
                          <CheckCircle2 className="w-4 h-4 text-accent ml-auto shrink-0" />
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={handlePayment}
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base h-14 text-lg shadow-[var(--glow-accent)]"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Plătește 1,99€
                    </Button>

                    <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SSL Securizat</span>
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Garanție 100%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════ STEP 3: RESULT ══════ */}
            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                {/* IQ Score Card */}
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8" />
                  <div className="relative p-8 text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 1, delay: 0.2 }}
                      className="relative w-36 h-36 mx-auto mb-6"
                    >
                      {/* Outer ring */}
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="60" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
                        <circle
                          cx="70" cy="70" r="60" fill="none"
                          stroke="url(#iqGradient)" strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${(iq / 160) * 377} 377`}
                        />
                        <defs>
                          <linearGradient id="iqGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="hsl(var(--accent))" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* Center number */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold font-['Space_Grotesk'] text-gradient">
                          {animatedIQ}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">IQ</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-4">
                        <span className="text-lg">{category.emoji}</span>
                        <span className={`font-bold font-['Space_Grotesk'] ${category.color}`}>
                          {category.label}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-2">
                        Scorul tău IQ este {iq}
                      </h2>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        Această estimare se bazează pe analiza răspunsurilor tale la cele 32 de întrebări cognitive.
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* IQ Scale visual */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <h3 className="text-sm font-semibold font-['Space_Grotesk'] mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent" />
                    Scala IQ
                  </h3>
                  <div className="relative h-3 rounded-full bg-secondary overflow-hidden mb-3">
                    <div className="absolute inset-0 progress-bar-fill" style={{ width: `${Math.min((iq / 160) * 100, 100)}%` }} />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground border-2 border-background shadow-lg"
                      style={{ left: `${Math.min((iq / 160) * 100, 100)}%`, transform: "translate(-50%, -50%)" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>70</span>
                    <span>90</span>
                    <span>110</span>
                    <span>130</span>
                    <span>150+</span>
                  </div>
                </motion.div>

                <div className="max-w-3xl mx-auto w-full">
                  <AdPlaceholder />
                </div>

                {/* Anxiety & Depression Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.3 }}
                  className="rounded-2xl border border-border bg-card overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-border bg-secondary/30 flex items-center gap-3">
                    <Heart className="w-5 h-5 text-accent" />
                    <h3 className="font-bold font-['Space_Grotesk']">
                      Anxietate și Depresie
                    </h3>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Anxiety */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1.5">Ce este Anxietatea?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Anxietatea este o reacție naturală la stres, dar când devine cronică, afectează semnificativ calitatea vieții. Simptomele includ neliniște persistentă, dificultăți de concentrare, tensiune musculară, probleme de somn și atacuri de panică.
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-border" />

                    {/* Depression */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Heart className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1.5">Ce este Depresia?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Depresia este o tulburare de dispoziție care provoacă tristețe persistentă și pierderea interesului. Simptomele pot include oboseală, modificări ale apetitului, sentimente de vinovăție și dificultăți în luarea deciziilor.
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-border" />

                    {/* Help */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1.5">Când să ceri ajutor?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Ambele condiții sunt tratabile. Terapia cognitiv-comportamentală, exercițiile fizice regulate și tehnicile de relaxare pot ajuta semnificativ. Dacă te confrunți cu aceste simptome, consultă un specialist. Nu ești singur/ă!
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Ebook Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6 }}
                  className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 overflow-hidden"
                >
                  <div className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold font-['Space_Grotesk'] mb-1">
                      📖 Ebook Gratuit
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">
                      Ghid complet despre simptomele clinice ale depresiei și anxietății.
                    </p>

                    {/* === EBOOK PLACEHOLDER — colocați link-ul ebook-ului aici === */}
                    <div className="border-2 border-dashed border-accent/30 rounded-xl p-8 bg-card/50">
                      <BookOpen className="w-8 h-8 text-accent/40 mx-auto mb-3" />
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                        Spațiu rezervat
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Buton de descărcare ebook
                      </p>
                    </div>
                    {/* === FIM DO PLACEHOLDER === */}
                  </div>
                </motion.div>

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
