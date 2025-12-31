import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WishQuotesProps {
  name: string;
}

const WishQuotes = ({ name }: WishQuotesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const quotes = [
    { text: `${name}, may this year bring you closer to all your dreams and fill your days with joy!`, emoji: "✨" },
    { text: `Wishing you a year of new adventures, beautiful moments, and endless possibilities, ${name}!`, emoji: "🌟" },
    { text: `${name}, let 2026 be your year of transformation, growth, and incredible achievements!`, emoji: "🚀" },
    { text: `May every day of this new year be as special as you are, ${name}!`, emoji: "💫" },
    { text: `${name}, here's to new beginnings, fresh starts, and a year full of blessings!`, emoji: "🎊" },
    { text: `2026 will open new doors of opportunity just for you, ${name}! Keep shining!`, emoji: "⭐" },
    { text: `${name}, may your smile never fade and your heart always be full of love!`, emoji: "💖" },
    { text: `This year, ${name}, may you find peace, prosperity, and pure happiness!`, emoji: "🌈" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="glass-card p-6 sm:p-8 md:p-12 min-h-[150px] sm:min-h-[200px] flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-12 sm:w-20 h-12 sm:h-20 border-t-2 border-l-2 border-primary rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-12 sm:w-20 h-12 sm:h-20 border-b-2 border-r-2 border-primary rounded-br-3xl" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center px-2"
        >
          <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">{quotes[currentIndex].emoji}</span>
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-display text-foreground leading-relaxed">
            "{quotes[currentIndex].text}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Quote indicators - responsive */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-4 sm:w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default WishQuotes;
