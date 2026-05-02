import { quizQuestions } from "@/data/quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface QuizQuestionsProps {
  currentQuestion: number;
  answers: Record<string, string>;
  selectedOption: string | null;
  isTransitioning: boolean;
  onAnswer: (optionId: string) => void;
  onBack: () => void;
}

export function QuizQuestions({
  currentQuestion,
  answers,
  selectedOption,
  isTransitioning,
  onAnswer,
  onBack,
}: QuizQuestionsProps) {
  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="flex flex-col py-6 px-4 pb-12 w-full max-w-4xl mx-auto h-full min-h-[70vh]">
      {/* Progress Bar (Premium Restyling) */}
      <div className="w-full mb-10 pt-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold">
            Question {currentQuestion + 1} / {quizQuestions.length}
          </span>
          <span className="text-[10px] md:text-xs tracking-wider font-semibold text-accent flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 bg-secondary/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            {/* The Question Text */}
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground text-center mb-10 md:mb-14 leading-tight tracking-tight px-4">
              {question.question}
            </h2>

            {/* Options Grid */}
            <div className="grid gap-3 md:gap-4 md:grid-cols-2 max-w-3xl mx-auto">
              {question.options.map((option, index) => {
                const isSelected = selectedOption === option.id || answers[question.id] === option.id;
                const wasAnswered = answers[question.id] === option.id && selectedOption !== option.id;

                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => onAnswer(option.id)}
                    disabled={selectedOption !== null}
                    className={cn(
                      "group w-full p-5 md:p-6 text-left relative overflow-hidden transition-all duration-300",
                      "glass-card border-[1.5px]",
                      isSelected
                        ? "border-accent bg-white/70 shadow-[0_10px_40px_rgba(43,74,38,0.1)] scale-[1.02]"
                        : wasAnswered
                        ? "border-accent/40 bg-white/40"
                        : "border-transparent hover:border-accent/30 hover:bg-white/60",
                      selectedOption !== null && !isSelected && "opacity-40 scale-[0.98]"
                    )}
                  >
                    {/* Checkmark Indicator */}
                    <div
                      className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                        isSelected
                          ? "border-accent bg-accent scale-100"
                          : "border-muted-foreground/20 scale-90 group-hover:border-accent/40 group-hover:scale-100"
                      )}
                    >
                      <Check
                        className={cn(
                          "h-3 w-3 text-white transition-opacity duration-200",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                        strokeWidth={4}
                      />
                    </div>

                    <span className={cn(
                      "block text-sm md:text-base pr-10 font-medium transition-colors duration-300",
                      isSelected ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {option.text}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Back Button */}
      <motion.div
        initial={false}
        animate={{
          opacity: currentQuestion > 0 ? 1 : 0,
          y: currentQuestion > 0 ? 0 : 10,
        }}
        className={cn(
          "max-w-3xl mx-auto w-full mt-8 pointer-events-auto",
          currentQuestion === 0 && "pointer-events-none"
        )}
      >
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="text-muted-foreground hover:text-foreground hover:bg-white/50 tracking-wide text-sm rounded-full px-6 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous Question
        </Button>
      </motion.div>
    </div>
  );
}
