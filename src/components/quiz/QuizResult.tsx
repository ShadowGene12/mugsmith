import { useNavigate } from "react-router-dom";
import { QuizResult as QuizResultType } from "@/data/quiz";
import { getProductsByCollection, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { ArrowRight, Sparkles, RefreshCw, MailCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";

interface QuizResultProps {
  result: QuizResultType;
  onRetake: () => void;
}

export function QuizResultView({ result, onRetake }: QuizResultProps) {
  const navigate = useNavigate();
  // Ensure we still get products if they exist for this collection
  const matchedProducts = getProductsByCollection(result.collectionSlug);

  return (
    <div className="min-h-[80vh] py-12 px-4 relative z-10 font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Waitlist Confirmed Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/5 backdrop-blur-md border border-accent/20 rounded-full shadow-sm text-sm text-foreground">
            <MailCheck className="h-4 w-4 text-accent" />
            <span className="font-medium tracking-wide">You're on the list. We'll email you when the drop happens.</span>
          </div>
        </motion.div>

        {/* Identity Result */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-center mb-16 glass-card p-10 md:p-16 relative overflow-hidden"
        >
          <div className="relative z-10">
            <motion.div 
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-accent/20 to-transparent text-accent mb-8 shadow-inner border border-white"
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-4"
            >
              Your Workspace Identity
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-medium text-foreground mb-6 tracking-tight leading-[1.05]"
            >
              You are <span className="italic relative inline-block">
                {result.title}
                <div className="absolute inset-x-0 bottom-1 h-2 bg-accent/20 -z-10 skew-x-[-15deg]"></div>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="font-serif text-2xl md:text-3xl text-accent mb-8 italic"
            >
              "{result.tagline}"
            </motion.p>

            <div className="w-24 h-px bg-accent/30 mx-auto mb-10"></div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4 text-balance font-light"
            >
              {result.description}
            </motion.p>
          </div>
          
          {/* Internal Glow for celebration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[150%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent z-0 pointer-events-none" />
        </motion.div>

        {/* Sneak Peek - Matched Products */}
        {matchedProducts && matchedProducts.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mb-16"
          >
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">
                Reserved For You
              </h2>
              <p className="text-muted-foreground tracking-wide font-light">
                A sneak peek of the {result.title} collection dropping soon.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {matchedProducts.map((product: Product, i: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 + (i * 0.1) }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Retake */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="text-center mt-20 pt-8 border-t border-border/50"
        >
          <button
            onClick={onRetake}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium tracking-wide"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Not quite right? Retake the quiz</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
