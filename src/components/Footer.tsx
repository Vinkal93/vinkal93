import { motion } from "framer-motion";
import { Heart, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 sm:py-8 px-4 border-t border-border/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main credit - light colors */}
          <div className="flex items-center justify-center gap-2 text-foreground/70 mb-3 sm:mb-4 text-sm sm:text-base">
            <span>Developed with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-accent fill-accent" />
            </motion.div>
            <span>by</span>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Vinkal Prajapati
            </motion.a>
          </div>

          {/* Tech badge - light colors */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-muted/20 border border-border/20 text-xs sm:text-sm text-foreground/60"
          >
            <Code className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Made with React & Framer Motion</span>
          </motion.div>

          {/* Year - light color */}
          <p className="text-foreground/40 text-xs sm:text-sm mt-3 sm:mt-4">
            © 2026 New Year Wishes | Spread Joy & Happiness 🎉
          </p>

          {/* Decorative emojis - responsive */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            {["🎆", "🎇", "🎉", "🎊", "✨"].map((emoji, index) => (
              <motion.span
                key={index}
                animate={{ y: [-3, 3, -3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="text-base sm:text-xl opacity-70 hover:opacity-100 transition-opacity cursor-default"
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
