import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { quizQuestions, progressMap } from "@/data/quizQuestions";
import QuizQuestion from "@/components/QuizQuestion";
import ProgressBar from "@/components/ProgressBar";
import AdPlaceholder from "@/components/AdPlaceholder";
import { Brain } from "lucide-react";

const QuizPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (points: number) => {
    const newTotal = totalPoints + points;
    setTotalPoints(newTotal);

    if (currentIndex + 1 >= quizQuestions.length) {
      navigate("/rezultat", { state: { totalPoints: newTotal } });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const progress = progressMap[currentIndex];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-semibold font-['Space_Grotesk']">Test de IQ</h1>
          </div>
          <ProgressBar percentage={progress} />
        </div>
      </header>

      {/* Ad top */}
      <div className="max-w-3xl mx-auto w-full px-4 mt-4">
        <AdPlaceholder />
      </div>

      {/* Question */}
      <main className="flex-1 flex items-center px-4 py-8">
        <div className="max-w-3xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <QuizQuestion
              key={currentIndex}
              question={quizQuestions[currentIndex].question}
              options={quizQuestions[currentIndex].options}
              onAnswer={handleAnswer}
            />
          </AnimatePresence>
        </div>
      </main>

      {/* Ad bottom */}
      <div className="max-w-3xl mx-auto w-full px-4 mb-6">
        <AdPlaceholder />
      </div>
    </div>
  );
};

export default QuizPage;
