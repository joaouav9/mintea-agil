import { motion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground font-medium">Progres</span>
        <span className="text-sm font-semibold text-foreground">{percentage}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
