import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Sparkles, PartyPopper } from "lucide-react";
import { toast } from "sonner";

interface NamePopupProps {
  onSubmit: (name: string) => void;
  onClose: () => void;
}

const NamePopup = ({ onSubmit, onClose }: NamePopupProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Auto focus on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = document.getElementById("name-input");
      input?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const validateName = (value: string): boolean => {
    const trimmed = value.trim();
    
    if (!trimmed) {
      setError("Please enter your name");
      return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
      setError("Only alphabets and spaces are allowed");
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
      toast.success("Creating your personalized wish! 🎉");
      onSubmit(name.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (error) validateName(value);
  };

  const celebrationEmojis = ["🎈", "⭐", "🎊", "✨", "🎆", "🥳", "🎉", "💫"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      {/* Modal - responsive */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative glass-card p-6 sm:p-8 md:p-12 max-w-md w-full mx-4"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Decorative sparkles */}
        <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </motion.div>
        </div>

        {/* Content - responsive */}
        <div className="text-center mb-6 sm:mb-8 mt-4">
          <div className="flex justify-center gap-1 sm:gap-2 mb-3">
            {["🎉", "✨", "🎊"].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="text-xl sm:text-2xl"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2 sm:mb-3">
            <span className="text-gradient-gold">Enter Your Name</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Let's create a magical wish just for you ✨
          </p>
        </div>

        {/* Form - responsive */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={handleInputChange}
              placeholder="Your Good Name"
              maxLength={25}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-center text-base sm:text-lg"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent text-xs sm:text-sm mt-2 text-center"
              >
                {error}
              </motion.p>
            )}
            <p className="text-muted-foreground text-xs mt-2 text-center">
              {name.length}/25 characters
            </p>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-celebration text-base sm:text-lg flex items-center justify-center gap-2"
          >
            <span>Create My New Year Wish</span>
            <PartyPopper className="w-5 h-5" />
          </motion.button>
        </form>

        {/* Bottom decoration - responsive */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 flex-wrap">
          {celebrationEmojis.map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
              className="text-lg sm:text-2xl"
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NamePopup;
