import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import CountdownTimer from "./CountdownTimer";
import WishQuotes from "./WishQuotes";
import InviteSection from "./InviteSection";
import Footer from "./Footer";
import { Sparkles, Heart, Star, Gift, Rocket, Crown, Gem } from "lucide-react";

interface PersonalizedWishProps {
  name: string;
}

// Generate emojis based on name
const getNameEmojis = (name: string) => {
  const firstChar = name.charAt(0).toLowerCase();
  const emojiSets: Record<string, string[]> = {
    a: ["🌟", "✨", "💫", "⭐"],
    b: ["🎈", "🦋", "🌸", "💙"],
    c: ["🎂", "🍰", "🌈", "💜"],
    d: ["💎", "🎯", "🌺", "💖"],
    e: ["🌍", "🦅", "✨", "💚"],
    f: ["🔥", "🌸", "🦋", "💗"],
    g: ["💚", "🌿", "🍀", "🌟"],
    h: ["❤️", "🏠", "🌺", "💕"],
    i: ["💡", "🎭", "⭐", "💜"],
    j: ["💎", "🎉", "🌟", "💙"],
    k: ["👑", "🔑", "💫", "💖"],
    l: ["💕", "🌷", "🍀", "💜"],
    m: ["🌙", "✨", "🎵", "💗"],
    n: ["🌊", "⭐", "🎶", "💚"],
    o: ["🌍", "🎯", "✨", "💛"],
    p: ["🎉", "💜", "🌸", "⭐"],
    q: ["👑", "💎", "✨", "💖"],
    r: ["🌹", "🎀", "💕", "⭐"],
    s: ["⭐", "🌟", "✨", "💫"],
    t: ["🏆", "💫", "🌟", "💜"],
    u: ["🦄", "☂️", "💜", "✨"],
    v: ["💜", "🎻", "💕", "⭐"],
    w: ["🌊", "💫", "⭐", "💙"],
    x: ["✨", "💫", "⭐", "💜"],
    y: ["💛", "⭐", "✨", "🌟"],
    z: ["⚡", "💫", "✨", "💜"],
  };
  return emojiSets[firstChar] || ["🎉", "✨", "🌟", "💫"];
};

const PersonalizedWish = ({ name }: PersonalizedWishProps) => {
  const [showContent, setShowContent] = useState(false);
  const nameEmojis = getNameEmojis(name);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Trigger confetti celebration
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);

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
    }, 300);

    // Show content after a brief delay
    setTimeout(() => setShowContent(true), 400);

    return () => clearInterval(interval);
  }, []);

  const wishCards = [
    {
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Love & Happiness",
      message: `May 2026 fill your heart with love and endless happiness, ${name}!`,
      color: "text-accent",
      emoji: "💕",
    },
    {
      icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Success & Growth",
      message: `Every dream you chase will turn into reality this year, ${name}!`,
      color: "text-primary",
      emoji: "🌟",
    },
    {
      icon: <Gift className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Prosperity",
      message: `Abundance and prosperity are coming your way, ${name}!`,
      color: "text-cyan",
      emoji: "🎁",
    },
    {
      icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "New Adventures",
      message: `Exciting adventures await you in 2026, ${name}!`,
      color: "text-purple",
      emoji: "🚀",
    },
    {
      icon: <Crown className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Achievements",
      message: `This is your year to shine and achieve greatness, ${name}!`,
      color: "text-primary",
      emoji: "👑",
    },
    {
      icon: <Gem className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Inner Peace",
      message: `May you find peace and clarity in everything you do, ${name}!`,
      color: "text-secondary",
      emoji: "💎",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile optimized */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 relative">
        {/* Glow effects - responsive */}
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-primary/20 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-accent/20 rounded-full blur-[80px] sm:blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center max-w-full"
        >
          {/* Greeting with name emojis */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 sm:mb-6"
          >
            <div className="flex justify-center gap-2 mb-2">
              {nameEmojis.map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [-3, 3, -3], rotate: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="text-2xl sm:text-3xl"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
            <span className="text-sm sm:text-lg md:text-xl text-muted-foreground">
              ✨ A Special Message For ✨
            </span>
          </motion.div>

          {/* Name - responsive */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 px-2"
          >
            <span className="text-gradient-gold glow-text-gold break-words">{name}</span>
          </motion.h1>

          {/* Year and wish - responsive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-3 sm:space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display">
              <span className="text-foreground">Happy New Year </span>
              <span className="text-gradient-celebration font-bold">2026!</span>
            </h2>
            <div className="flex justify-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl flex-wrap">
              {["🎉", "🎊", "🎆", "🎇", "🥳", "🎈"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ 
                    rotate: i % 2 === 0 ? [0, 15, -15, 0] : [0, -15, 15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, y: { duration: 2, repeat: Infinity } }}
          className="absolute bottom-6 sm:bottom-10 text-muted-foreground text-xs sm:text-sm flex flex-col items-center gap-1 sm:gap-2"
        >
          <span>Scroll for more wishes</span>
          <span className="text-xl sm:text-2xl">↓</span>
        </motion.div>
      </section>

      {/* Content Sections */}
      {showContent && (
        <>
          {/* Quotes Section - responsive */}
          <section className="py-12 sm:py-20 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8 sm:mb-12"
              >
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mb-3 sm:mb-4" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2 sm:mb-4">
                  <span className="text-gradient-gold">Wishes For You, {name}</span>
                </h2>
                <div className="flex justify-center gap-1 sm:gap-2">
                  {nameEmojis.slice(0, 3).map((emoji, i) => (
                    <span key={i} className="text-lg sm:text-xl">{emoji}</span>
                  ))}
                </div>
              </motion.div>
              
              <WishQuotes name={name} />
            </div>
          </section>

          {/* Wish Cards Section - responsive grid */}
          <section className="py-12 sm:py-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {wishCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-card p-5 sm:p-8 text-center group cursor-pointer"
                  >
                    <div className="flex justify-center items-center gap-2 mb-3 sm:mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`${card.color}`}
                      >
                        {card.icon}
                      </motion.div>
                      <span className="text-xl sm:text-2xl">{card.emoji}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-2 sm:mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {card.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Countdown Section - responsive */}
          <section className="py-12 sm:py-20 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display mb-6 sm:mb-8">
                  <span className="text-foreground">Countdown to </span>
                  <span className="text-gradient-celebration font-bold">2027</span>
                  <span className="ml-2">🎆</span>
                </h2>
                <CountdownTimer targetDate={new Date("2027-01-01T00:00:00")} />
              </motion.div>
            </div>
          </section>

          {/* Invite Section - responsive */}
          <section className="py-12 sm:py-20 px-4 sm:px-6">
            <div className="max-w-lg mx-auto">
              <InviteSection userName={name} />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
};

export default PersonalizedWish;
