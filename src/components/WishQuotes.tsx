import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WishQuotesProps {
  name: string;
}

const WishQuotes = ({ name }: WishQuotesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const quotes = [
    `${name}, may this year bring you closer to all your dreams and fill your days with joy! ✨`,
    `Wishing you a year of new adventures, beautiful moments, and endless possibilities, ${name}! 🌟`,
    `${name}, let 2025 be your year of transformation, growth, and incredible achievements! 🚀`,
    `May every day of this new year be as special as you are, ${name}! 💫`,
    `${name}, here's to new beginnings, fresh starts, and a year full of blessings! 🎊`,
    `2025 will open new doors of opportunity just for you, ${name}! Keep shining! ⭐`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="glass-card p-8 md:p-12 min-h-[200px] flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary rounded-br-3xl" />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl lg:text-3xl font-display text-center text-foreground leading-relaxed"
        >
          "{quotes[currentIndex]}"
        </motion.p>
      </AnimatePresence>

      {/* Quote indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default WishQuotes;
