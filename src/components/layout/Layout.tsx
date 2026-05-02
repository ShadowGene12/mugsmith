import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyAnnouncementBar } from "@/components/shared/StickyAnnouncementBar";
import { ExitIntentPopup } from "@/components/shared/ExitIntentPopup";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  hideAnnouncementBar?: boolean;
  staticHeader?: boolean;
}

export function Layout({ children, hideFooter = false, hideAnnouncementBar = false, staticHeader = false }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      
      {/* Living Celestial Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gold/10 blur-[120px] animate-drift opacity-60" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-bone-dark/60 blur-[150px] animate-drift opacity-80" style={{ animationDelay: '5s', animationDuration: '35s' }} />
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[100px] animate-drift opacity-40" style={{ animationDelay: '12s', animationDuration: '28s', animationDirection: 'reverse' }} />
        <div className="absolute bottom-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-orange-100/30 blur-[130px] animate-drift opacity-50" style={{ animationDelay: '2s', animationDuration: '40s' }} />
      </div>
      
      {/* Texture Layer */}
      <div className="noise-overlay" />

      {!hideAnnouncementBar && <StickyAnnouncementBar />}
      <Header isStatic={staticHeader} />
      
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 relative z-10 w-full"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {!hideFooter && <Footer />}
      <ExitIntentPopup />
    </div>
  );
}
