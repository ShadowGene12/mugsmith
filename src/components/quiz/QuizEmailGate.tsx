import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";

interface QuizEmailGateProps {
  onEmailSubmitted: (email: string) => void;
}

export function QuizEmailGate({ onEmailSubmitted }: QuizEmailGateProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    trackEvent({ event: "quiz_email_gate_view" });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    trackEvent({ event: "quiz_email_submitted" });
    
    // Simulate generation pause (2.5s to let the celestial loader run)
    setTimeout(() => {
      onEmailSubmitted(email);
    }, 2500);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div
            key="loading-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center z-10"
          >
            {/* Premium Celestial Loader */}
            <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-accent/40"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute inset-1 rounded-full border border-accent/20"
              />
              <motion.div 
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-4 h-4 rounded-full bg-accent blur-sm"
              />
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-3xl md:text-4xl font-medium mb-3 text-foreground tracking-tight"
            >
              Consulting the Codex...
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground tracking-widest uppercase text-xs font-semibold"
            >
              Aligning Your Identity
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="form-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-md w-full mx-auto relative z-10"
          >
            <div className="glass-card p-8 md:p-10 !border-white/60 !bg-white/60">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-accent/20 to-transparent text-accent mb-6 shadow-inner border border-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3 tracking-tight">
                  Your reading is ready.
                </h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-light">
                  Where should we send your archetype profile and curated collection?
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
                    <Input
                      type="email"
                      placeholder="Enter your best email"
                      className={`pl-12 h-14 bg-white/50 border-white/80 backdrop-blur-sm focus:border-accent shadow-inner text-base transition-all duration-300 ${error ? 'border-destructive' : ''}`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                    />
                  </div>
                  {error && <p className="text-xs text-destructive text-left px-2">{error}</p>}
                </div>
                <Button 
                  type="submit" 
                  variant="cta" 
                  size="xl" 
                  className="w-full h-14 text-base tracking-wide rounded-xl shadow-[0_8px_20px_rgba(43,74,38,0.15)] hover:shadow-[0_15px_30px_rgba(43,74,38,0.25)] transition-all duration-300"
                >
                  Reveal My Archetype
                </Button>
              </form>
              <p className="text-[10px] uppercase tracking-widest text-center text-muted-foreground mt-6 opacity-60">
                A private gateway. No spam, ever.
              </p>
            </div>
            
            {/* Decorative Glows specific to the gate */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/20 blur-3xl rounded-full z-[-1] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
