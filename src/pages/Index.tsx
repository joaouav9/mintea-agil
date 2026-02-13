import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Zap, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdPlaceholder from "@/components/AdPlaceholder";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-4 mt-4">
        <AdPlaceholder />
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8"
          >
            <Brain className="w-10 h-10 text-primary" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4 leading-tight">
            Descoperă-ți{" "}
            <span className="text-gradient">Coeficientul de Inteligență</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            Testul nostru profesional de IQ îți evaluează capacitățile cognitive prin întrebări atent selecționate. Primește rezultatul tău personalizat!
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: Zap, label: "Rapid", desc: "Test concis" },
              { icon: Clock, label: "~10 min", desc: "Timp estimat" },
              { icon: Trophy, label: "Rezultat", desc: "Scor IQ precis" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="quiz-card rounded-xl p-4"
              >
                <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 rounded-xl font-semibold shadow-[var(--glow-primary)]"
            >
              Începe Testul de IQ
            </Button>
          </motion.div>
        </motion.div>
      </main>

      <div className="max-w-3xl mx-auto w-full px-4 mb-6">
        <AdPlaceholder />
      </div>
    </div>
  );
};

export default Index;
