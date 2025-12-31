import { useState } from "react";
import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface NamePopupProps {
  onSubmit: (name: string) => void;
  onClose: () => void;
}

const NamePopup = ({ onSubmit, onClose }: NamePopupProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative glass-card p-8 md:p-12 max-w-md w-full"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Decorative sparkles */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-12 h-12 text-primary" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="text-center mb-8 mt-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            <span className="text-gradient-gold">Enter Your Name</span>
          </h2>
          <p className="text-muted-foreground">
            Let's create a magical wish just for you
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              placeholder="Your Good Name"
              maxLength={25}
              className="w-full px-6 py-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-center text-lg"
              autoFocus
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent text-sm mt-2 text-center"
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
            className="w-full btn-celebration text-lg"
          >
            Create My New Year Wish 🎉
          </motion.button>
        </form>

        {/* Bottom decoration */}
        <div className="flex justify-center gap-2 mt-6">
          {["🎈", "⭐", "🎊", "✨", "🎆"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              className="text-2xl"
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
