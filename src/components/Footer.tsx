import { motion } from "framer-motion";
import { Heart, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main credit */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <span>Developed with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-accent fill-accent" />
            </motion.div>
            <span>by</span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-semibold text-primary cursor-pointer glow-text-gold"
            >
              Vinkal Prajapati
            </motion.span>
          </div>

          {/* Tech badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/30 text-sm text-muted-foreground"
          >
            <Code className="w-4 h-4" />
            <span>Made with React & Framer Motion</span>
          </motion.div>

          {/* Year */}
          <p className="text-muted-foreground/50 text-sm mt-4">
            © 2025 New Year Wishes | Spread Joy & Happiness
          </p>

          {/* Decorative emojis */}
          <div className="flex justify-center gap-4 mt-6">
            {["🎆", "🎇", "🎉", "🎊", "✨"].map((emoji, index) => (
              <motion.span
                key={index}
                animate={{ y: [-3, 3, -3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="text-xl opacity-60 hover:opacity-100 transition-opacity cursor-default"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
