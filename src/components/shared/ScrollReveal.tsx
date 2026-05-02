import { motion, useAnimation, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'slide-right' | 'scale-up';
  delay?: number;
  duration?: number;
  className?: string;
  margin?: string;
  once?: boolean;
}

export function ScrollReveal({ 
  children, 
  variant = 'fade-up', 
  delay = 0, 
  duration = 1.2,
  className = "",
  margin = "-5%",
  once = true
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: margin as Parameters<typeof useInView>[1]["margin"] });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const getVariants = () => {
    switch (variant) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration, delay, ease: [0.25, 1, 0.5, 1] } }
        };
      case 'fade-in':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration, delay, ease: [0.25, 1, 0.5, 1] } }
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0, transition: { duration, delay, ease: [0.25, 1, 0.5, 1] } }
        };
      case 'scale-up':
        return {
          hidden: { opacity: 0, scale: 0.98 },
          visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: [0.25, 1, 0.5, 1] } }
        };
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration, delay, ease: [0.25, 1, 0.5, 1] } }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
