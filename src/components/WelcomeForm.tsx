import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, PartyPopper, Gift, Star } from "lucide-react";
import { toast } from "sonner";

interface WelcomeFormProps {
  onSubmit: (name: string) => void;
  initialName?: string;
}

const WelcomeForm = ({ onSubmit, initialName }: WelcomeFormProps) => {
  const [name, setName] = useState(initialName ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialName) setName(initialName);
  }, [initialName]);

  const validateName = (value: string): boolean => {
    const trimmed = value.trim();
    
    if (!trimmed) {
      setError("Please enter your name");
      return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
      setError("Only alphabets and spaces allowed");
      return false;
    }
    
    if (trimmed.length > 25) {
      setError("Name must be 25 characters or less");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateName(name)) {
      toast.success("🎉 Get ready for your surprise!");
      onSubmit(name.trim());
    }
  };

  const floatingEmojis = ["🎉", "🎊", "✨", "🎆", "🌟", "🎈", "💫", "⭐"];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-40 sm:w-72 h-40 sm:h-72 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-72 h-40 sm:h-72 bg-accent/20 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 sm:w-96 h-60 sm:h-96 bg-purple/10 rounded-full blur-[120px]" />

      {/* Floating emojis */}
      {floatingEmojis.map((emoji, i) => (
        <motion.span
          key={i}
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [-10, 10, -10]
          }}
          transition={{ 
            duration: 3 + i * 0.5, 
            repeat: Infinity, 
            delay: i * 0.3 
          }}
          className="absolute text-2xl sm:text-4xl opacity-40 hidden sm:block"
          style={{
            left: `${5 + (i * 12) % 90}%`,
            top: `${10 + (i * 13) % 80}%`,
          }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Main form card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
        className="relative glass-card p-6 sm:p-10 md:p-12 max-w-lg w-full text-center"
      >
        {/* Top decoration */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-8 left-1/2 -translate-x-1/2"
        >
          <div className="relative">
            <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 text-primary" />
            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
          </div>
        </motion.div>

        {/* Header */}
        <div className="mt-6 mb-6 sm:mb-8">
          <motion.div 
            className="flex justify-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {["🎊", "🎉", "🎊"].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="text-2xl sm:text-3xl"
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3"
          >
            <span className="text-gradient-gold glow-text-gold">2026</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-display mb-4"
          >
            <span className="text-foreground">Welcome to </span>
            <span className="text-gradient-celebration">New Year!</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base text-muted-foreground"
          >
            Enter your name to receive a special personalized wish ✨
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) validateName(e.target.value);
                }}
                placeholder="✨ Enter Your Name ✨"
                maxLength={25}
                autoFocus
                className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-muted/50 border-2 border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-center text-lg sm:text-xl font-medium"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-2xl pointer-events-none" />
            </div>
            
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
            
            <p className="text-muted-foreground text-xs mt-2">
              {name.length}/25 characters
            </p>
          </motion.div>

          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full btn-celebration text-base sm:text-lg py-4 sm:py-5 flex items-center justify-center gap-3"
          >
            <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Get My Surprise Wish</span>
            <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </form>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6"
        >
          {[
            { icon: <Star className="w-3 h-3" />, text: "Personalized" },
            { icon: <Gift className="w-3 h-3" />, text: "Free" },
            { icon: <Sparkles className="w-3 h-3" />, text: "Shareable" },
          ].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/30 border border-border/30 text-xs text-muted-foreground"
            >
              {item.icon}
              {item.text}
            </span>
          ))}
        </motion.div>

        {/* Bottom emojis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-2 mt-6"
        >
          {["🎈", "🌟", "🎆", "💫", "🎇"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 1.5 + i * 0.2, repeat: Infinity }}
              className="text-xl sm:text-2xl"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeForm;
