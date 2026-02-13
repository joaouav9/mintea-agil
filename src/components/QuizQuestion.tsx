import { motion } from "framer-motion";
import { QuizOption } from "@/data/quizQuestions";
import { useState } from "react";

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  onAnswer: (points: number) => void;
}

const QuizQuestion = ({ question, options, onAnswer }: QuizQuestionProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => {
      onAnswer(options[index].points);
      setSelected(null);
    }, 600);
  };

  const labels = ["A", "B", "C", "D"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-8 leading-relaxed font-['Space_Grotesk']">
        {question}
      </h2>

      <div className="grid gap-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={selected === null ? { scale: 1.02 } : {}}
            whileTap={selected === null ? { scale: 0.98 } : {}}
            onClick={() => handleSelect(index)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
              selected === index
                ? "border-primary bg-primary/10 shadow-[var(--glow-primary)]"
                : selected !== null
                ? "border-border bg-card/50 opacity-50"
                : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            <span
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                selected === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {labels[index]}
            </span>
            <span className="text-base">{option.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizQuestion;
