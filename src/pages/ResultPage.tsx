import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { estimateIQ } from "@/data/quizQuestions";
import { generateDepressionEbook } from "@/utils/generateEbook";
import AdPlaceholder from "@/components/AdPlaceholder";
import { Brain, Lock, Mail, CreditCard, Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalPoints = (location.state as { totalPoints?: number })?.totalPoints;

  const [email, setEmail] = useState("");
  const [paid, setPaid] = useState(false);
  const [showResult, setShowResult] = useState(false);

  if (totalPoints === undefined) {
    navigate("/");
    return null;
  }

  const iq = estimateIQ(totalPoints);

  const handlePayment = () => {
    if (!email || !email.includes("@")) {
      toast.error("Vă rugăm introduceți o adresă de email validă.");
      return;
    }
    // Simulated payment - in production integrate Stripe
    toast.success("Plata de 2€ procesată cu succes!");
    setPaid(true);
    setShowResult(true);
  };

  const handleDownloadEbook = () => {
    const doc = generateDepressionEbook();
    doc.save("Simptomele_Clinice_ale_Depresiei.pdf");
    toast.success("Ebook descărcat cu succes!");
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
          <h1 className="text-lg font-semibold font-['Space_Grotesk']">Rezultat Test IQ</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto w-full px-4 mt-4">
        <AdPlaceholder />
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          {!showResult ? (
            <div className="quiz-card rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-accent" />
              </div>

              <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-3">
                Testul a fost completat!
              </h2>
              <p className="text-muted-foreground mb-8">
                Rezultatul tău este gata. Introdu adresa de email și efectuează plata de 2€ pentru a vedea scorul tău IQ.
              </p>

              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="adresa@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base py-6"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Plătește 2€ și vezi rezultatul
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Plata este securizată. Rezultatul va fi trimis și pe email.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
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

              {/* Ebook section */}
              <div className="quiz-card rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2">
                  Ebook Gratuit
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Descarcă ghidul nostru complet despre simptomele clinice ale depresiei - informații esențiale pentru sănătatea ta mintală.
                </p>
                <Button
                  onClick={handleDownloadEbook}
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descarcă Ebook PDF
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <div className="max-w-3xl mx-auto w-full px-4 mb-6">
        <AdPlaceholder />
      </div>
    </div>
  );
};

export default ResultPage;
