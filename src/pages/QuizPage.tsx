import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { quizQuestions, calculateQuizResult, QuizResult, quizResults } from "@/data/quiz";
import { useCart } from "@/context/CartContext";
import { SEO, pageSEO } from "@/hooks/useSEO";
import { QuizQuestions } from "@/components/quiz/QuizQuestions";
import { QuizResultView } from "@/components/quiz/QuizResult";
import { QuizEmailGate } from "@/components/quiz/QuizEmailGate";
import { trackEvent } from "@/lib/analytics";

const QUIZ_COMPLETED_KEY = "quiz_completed";
const QUIZ_RESULT_KEY = "quiz_result";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRetaking, setIsRetaking] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const { setQuizResult, setEmail } = useCart();

  useEffect(() => {
    const completed = localStorage.getItem(QUIZ_COMPLETED_KEY);
    const savedResult = localStorage.getItem(QUIZ_RESULT_KEY);

    if (completed === "true" && savedResult && !isRetaking) {
      const savedQuizResult = quizResults.find((r) => r.identity === savedResult);
      if (savedQuizResult) {
        setResult(savedQuizResult);
        setShowResult(true);
      }
    }
  }, [isRetaking]);

  const question = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleAnswer = (optionId: string) => {
    // Track quiz start on first answer
    if (currentQuestion === 0 && !hasTrackedStart) {
      trackEvent({ event: "quiz_start" });
      setHasTrackedStart(true);
    }

    setSelectedOption(optionId);
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowEmailGate(true);
        setIsTransitioning(false);
        setSelectedOption(null);
      }, 400);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setIsTransitioning(false);
      }, 400);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setSelectedOption(null);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
    setShowResult(false);
    setShowEmailGate(false);
    setResult(null);
    setIsRetaking(true);
    setHasTrackedStart(false);
  };

  const handleEmailSubmit = (email: string) => {
    setEmail(email);
    const quizResult = calculateQuizResult(answers);
    setResult(quizResult);
    setQuizResult(quizResult.identity);
    localStorage.setItem(QUIZ_COMPLETED_KEY, "true");
    localStorage.setItem(QUIZ_RESULT_KEY, quizResult.identity);
    trackEvent({ event: "quiz_complete", identity: quizResult.identity });
    setShowEmailGate(false);
    setShowResult(true);
  };

  if (showResult && result) {
    return (
      <Layout>
        <SEO {...pageSEO.quiz} />
        <QuizResultView result={result} onRetake={handleRetake} />
      </Layout>
    );
  }

  if (showEmailGate) {
    return (
      <Layout hideAnnouncementBar>
        <SEO {...pageSEO.quiz} />
        <QuizEmailGate onEmailSubmitted={handleEmailSubmit} />
      </Layout>
    );
  }

  return (
    <Layout hideAnnouncementBar>
      <SEO {...pageSEO.quiz} />
      <QuizQuestions
        currentQuestion={currentQuestion}
        answers={answers}
        selectedOption={selectedOption}
        isTransitioning={isTransitioning}
        onAnswer={handleAnswer}
        onBack={handleBack}
      />
    </Layout>
  );
}
