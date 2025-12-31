import { useMemo } from "react";
import { motion } from "framer-motion";

const ParticleBackground = () => {
  // Reduced particles for better performance
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      type: Math.random() > 0.7 ? "star" : "dot",
    }));
  }, []);

  // Reduced floating emojis
  const floatingEmojis = useMemo(() => {
    const emojis = ["⭐", "✨", "🌟", "💫", "🎉", "🎊"];
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      x: Math.random() * 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Particles - will-change for GPU acceleration */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.type === "star" ? "bg-primary" : "bg-primary/50"
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            willChange: "transform, opacity",
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating emojis - hidden on mobile for performance */}
      <div className="hidden sm:block">
        {floatingEmojis.map((item) => (
          <motion.div
            key={item.id}
            className="absolute text-xl sm:text-2xl opacity-20"
            style={{ left: `${item.x}%`, willChange: "transform" }}
            initial={{ y: "100vh" }}
            animate={{ y: "-100px" }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* Large glow orbs - simplified */}
      <motion.div
        className="absolute top-1/4 -left-10 sm:-left-20 w-40 sm:w-80 h-40 sm:h-80 bg-primary/10 rounded-full blur-[80px] sm:blur-[120px]"
        style={{ willChange: "transform, opacity" }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-10 sm:-right-20 w-40 sm:w-80 h-40 sm:h-80 bg-accent/10 rounded-full blur-[80px] sm:blur-[120px]"
        style={{ willChange: "transform, opacity" }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default ParticleBackground;
