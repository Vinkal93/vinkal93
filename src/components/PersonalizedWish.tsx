import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import CountdownTimer from "./CountdownTimer";
import WishQuotes from "./WishQuotes";
import ShareButton from "./ShareButton";
import Footer from "./Footer";
import { Sparkles, Heart, Star, Gift } from "lucide-react";

interface PersonalizedWishProps {
  name: string;
}

const PersonalizedWish = ({ name }: PersonalizedWishProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger confetti celebration
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ffd700", "#f59e0b", "#f43f5e", "#8b5cf6", "#06b6d4"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ffd700", "#f59e0b", "#f43f5e", "#8b5cf6", "#06b6d4"],
      });
    }, 250);

    // Show content after a brief delay
    setTimeout(() => setShowContent(true), 500);

    return () => clearInterval(interval);
  }, []);

  const wishCards = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Love & Happiness",
      message: `May 2025 fill your heart with love and endless happiness, ${name}!`,
      color: "text-accent",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Success & Growth",
      message: `Every dream you chase will turn into reality this year, ${name}!`,
      color: "text-primary",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Prosperity",
      message: `Abundance and prosperity are coming your way, ${name}!`,
      color: "text-cyan",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <span className="text-lg md:text-xl text-muted-foreground">
              ✨ A Special Message For ✨
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
          >
            <span className="text-gradient-gold glow-text-gold">{name}</span>
          </motion.h1>

          {/* Year and wish */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display">
              <span className="text-foreground">Happy New Year </span>
              <span className="text-gradient-celebration font-bold">2025!</span>
            </h2>
            <div className="flex justify-center gap-2 text-4xl">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎊
              </motion.span>
              <motion.span
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                🎆
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, y: { duration: 2, repeat: Infinity } }}
          className="absolute bottom-10 text-muted-foreground text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll for more wishes</span>
          <span className="text-2xl">↓</span>
        </motion.div>
      </section>

      {/* Quotes Section */}
      {showContent && (
        <>
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  <span className="text-gradient-gold">Wishes For You, {name}</span>
                </h2>
              </motion.div>
              
              <WishQuotes name={name} />
            </div>
          </section>

          {/* Wish Cards Section */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {wishCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="glass-card p-8 text-center group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`${card.color} mb-4 inline-block`}
                    >
                      {card.icon}
                    </motion.div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {card.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Countdown to Next Year */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-display mb-8">
                  <span className="text-foreground">Countdown to </span>
                  <span className="text-gradient-celebration font-bold">2026</span>
                </h2>
                <CountdownTimer targetDate={new Date("2026-01-01T00:00:00")} />
              </motion.div>
            </div>
          </section>

          {/* Share Section */}
          <section className="py-20 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-12"
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-gradient-gold">
                  Share The Magic!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Create personalized wishes for your friends and family too!
                </p>
                <ShareButton />
              </motion.div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
};

export default PersonalizedWish;
