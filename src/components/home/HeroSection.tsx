import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Editorial Decorative Elements */}
      <div className="absolute top-1/4 right-[10%] w-px h-64 bg-gradient-to-b from-transparent via-accent/20 to-transparent hidden lg:block" />
      <div className="absolute top-[10%] left-[8%] w-64 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent hidden lg:block" />

      <div className="container-wide relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Typography Block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/40 shadow-sm rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground">
                The Archetype Collection
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-medium text-foreground mb-6 leading-[1.05] tracking-tight">
              A mug that actually says something <span className="italic text-accent/90">about who you are.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed tracking-wide font-light">
              Seven personality-driven collections. Premium ceramic. Designed in India for people who care about the quiet details of their day.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button asChild variant="hero-secondary" size="lg" className="w-full sm:w-auto px-8 h-14 text-base tracking-wide rounded-full">
                <Link to="/quiz">
                  Find Your Archetype
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="group w-full sm:w-auto px-8 h-14 text-base tracking-wide rounded-full text-muted-foreground hover:bg-black/5 hover:text-foreground transition-all">
                <Link to="/collections/the-architect">
                  Explore Catalog
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="mt-14 flex items-center gap-4 text-muted-foreground">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-stone-200 border-2 border-background shadow-sm"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-xs tracking-wider capitalize font-medium">Rated 4.9/5 · 500+ Early Backers</span>
              </div>
            </div>
          </motion.div>

          {/* Right Editorial Image/Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:ml-auto glass-card border border-white/60 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white/30 backdrop-blur-2xl rounded-3xl overflow-hidden group">
              <div className="absolute inset-4 bg-stone-100 rounded-2xl overflow-hidden shadow-inner">
                {/* Fallback image if paths are failing, we use an aesthetic placeholder */}
                <div className="absolute inset-0 bg-gradient-to-tr from-stone-200 to-stone-50" />
                <img 
                  src="/images/products/bld-sediment.jpg" 
                  alt="The Builder Archetype Mug"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop"; 
                  }}
                />
              </div>
              
              <div className="absolute bottom-8 left-8 right-8 glass-card border-white/50 bg-white/80 p-5 shadow-lg backdrop-blur-xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 rounded-xl">
                <p className="text-[10px] tracking-widest uppercase font-semibold text-accent mb-1">Featured</p>
                <p className="font-serif text-lg font-medium text-foreground">The Builder — Sediment</p>
              </div>
            </div>
            
            {/* Minimalist Accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl z-[-1]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-bone-dark/50 rounded-full blur-3xl z-[-1]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
