import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import { Sparkles, PartyPopper, Star, Gift, Heart } from "lucide-react";

interface HeroSectionProps {
  onStartClick: () => void;
}

const HeroSection = ({ onStartClick }: HeroSectionProps) => {
  const floatingEmojis = ["🎈", "🎉", "⭐", "✨", "🎆", "🎊", "💫", "🌟"];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 relative overflow-hidden">
      {/* Decorative elements - responsive */}
      <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-secondary/10 rounded-full blur-2xl" />

      {/* Year display - responsive */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-4 sm:mb-6"
      >
        <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-display font-bold text-gradient-gold glow-text-gold">
          2026
        </span>
      </motion.div>

      {/* Main title - responsive */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display text-center mb-3 sm:mb-4 px-2"
      >
        <span className="text-foreground">Begins With </span>
        <span className="text-gradient-celebration font-bold">Your Name</span>
        <span className="text-primary">…</span>
      </motion.h1>

      {/* Subtitle - responsive */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-muted-foreground text-sm sm:text-lg md:text-xl text-center max-w-xs sm:max-w-lg md:max-w-2xl mb-6 sm:mb-8 px-4"
      >
        Create your personalized New Year wish and share the magic with everyone you love ✨
      </motion.p>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-8 sm:mb-10"
      >
        <CountdownTimer targetDate={new Date("2027-01-01T00:00:00")} />
      </motion.div>

      {/* CTA Button - responsive */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartClick}
        className="btn-celebration flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl px-6 sm:px-8"
      >
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
        <span>Create Your Wish</span>
        <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Feature badges - mobile friendly */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-4"
      >
        {[
          { icon: <Star className="w-3 h-3 sm:w-4 sm:h-4" />, text: "Personalized" },
          { icon: <Gift className="w-3 h-3 sm:w-4 sm:h-4" />, text: "Free" },
          { icon: <Heart className="w-3 h-3 sm:w-4 sm:h-4" />, text: "Shareable" },
        ].map((badge, i) => (
          <span
            key={i}
            className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-muted/30 border border-border/30 text-xs sm:text-sm text-muted-foreground"
          >
            {badge.icon}
            {badge.text}
          </span>
        ))}
      </motion.div>

      {/* Floating emojis - responsive positioning */}
      {floatingEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
          className="absolute text-xl sm:text-2xl md:text-3xl opacity-60 hidden sm:block"
          style={{
            left: `${10 + (index * 12) % 80}%`,
            top: `${15 + (index * 17) % 70}%`,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Mobile floating emojis - fewer and smaller */}
      <div className="sm:hidden absolute inset-0 pointer-events-none">
        {["🎉", "✨", "🎈", "⭐"].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2 + i, repeat: Infinity }}
            className="absolute text-lg"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
