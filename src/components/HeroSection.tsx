import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStartClick: () => void;
}

const HeroSection = ({ onStartClick }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />

      {/* Year display */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6"
      >
        <span className="text-8xl md:text-9xl lg:text-[12rem] font-display font-bold text-gradient-gold glow-text-gold">
          2025
        </span>
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-3xl md:text-5xl lg:text-6xl font-display text-center mb-4"
      >
        <span className="text-foreground">Begins With </span>
        <span className="text-gradient-celebration font-bold">Your Name</span>
        <span className="text-primary">…</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-muted-foreground text-lg md:text-xl text-center max-w-2xl mb-8"
      >
        Create your personalized New Year wish and share the magic with everyone you love
      </motion.p>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-10"
      >
        <CountdownTimer targetDate={new Date("2026-01-01T00:00:00")} />
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartClick}
        className="btn-celebration flex items-center gap-3 text-lg md:text-xl"
      >
        <Sparkles className="w-6 h-6" />
        <span>Create Your Wish</span>
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Floating decorations */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 text-4xl"
      >
        🎈
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/3 right-1/4 text-4xl"
      >
        🎉
      </motion.div>
      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-1/6 text-3xl"
      >
        ⭐
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/6 text-3xl"
      >
        ✨
      </motion.div>
    </section>
  );
};

export default HeroSection;
