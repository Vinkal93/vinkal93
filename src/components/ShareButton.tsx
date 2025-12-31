import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const baseUrl = window.location.origin + window.location.pathname;
    
    // Try native share first
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Happy New Year 2025!",
          text: "Create your personalized New Year wish!",
          url: baseUrl,
        });
        toast.success("Shared successfully! 🎉");
        return;
      } catch {
        // Fall through to copy
      }
    }

    // Fallback to copy
    try {
      await navigator.clipboard.writeText(baseUrl);
      setCopied(true);
      toast.success("Link copied to clipboard! 📋");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleShare}
        className="btn-celebration flex items-center justify-center gap-3"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-5 h-5" />
            <span>Share With Friends</span>
          </>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Your personalized link copied! 🔗");
          } catch {
            toast.error("Failed to copy");
          }
        }}
        className="px-8 py-4 rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-3"
      >
        <Copy className="w-5 h-5" />
        <span>Copy My Wish Link</span>
      </motion.button>
    </div>
  );
};

export default ShareButton;
