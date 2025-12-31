import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: "Days", emoji: "📅" },
    { value: timeLeft.hours, label: "Hours", emoji: "⏰" },
    { value: timeLeft.minutes, label: "Mins", emoji: "⏳" },
    { value: timeLeft.seconds, label: "Secs", emoji: "✨" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-3 sm:p-4 md:p-6 min-w-[60px] sm:min-w-[70px] md:min-w-[100px] text-center animate-pulse-glow"
        >
          <span className="text-sm sm:text-base mb-1 block">{unit.emoji}</span>
          <motion.span
            key={unit.value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-bold text-primary glow-text-gold block"
          >
            {String(unit.value).padStart(2, "0")}
          </motion.span>
          <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1 sm:mt-2 block">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
