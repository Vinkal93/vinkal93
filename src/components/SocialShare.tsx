import { motion } from "framer-motion";
import { Copy, Check, Share2, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SocialShareProps {
  userName?: string;
}

const SocialShare = ({ userName }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    return userName ? `${baseUrl}?name=${encodeURIComponent(userName)}` : baseUrl;
  };

  const getShareText = () => {
    if (userName) {
      return `🎉 ${userName} wishes you a Happy New Year 2026! Create your own personalized wish:`;
    }
    return "🎉 Create your personalized New Year 2026 wish and share with friends!";
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(getShareText() + " " + getShareUrl())}`;
    window.open(url, "_blank");
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(getShareText())}`;
    window.open(url, "_blank");
  };

  const shareToInstagram = () => {
    // Instagram doesn't have direct share URL, copy link instead
    navigator.clipboard.writeText(getShareUrl());
    toast.success("Link copied! Paste it in Instagram 📸");
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Happy New Year 2026! 🎉",
          text: getShareText(),
          url: getShareUrl(),
        });
        toast.success("Shared successfully! 🎉");
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      toast.success("Link copied! 📋");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const shareButtons = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      onClick: shareToWhatsApp,
      className: "bg-[#25D366] hover:bg-[#20BD5A] text-white",
    },
    {
      name: "Telegram",
      icon: <Send className="w-5 h-5" />,
      onClick: shareToTelegram,
      className: "bg-[#0088cc] hover:bg-[#0077b3] text-white",
    },
    {
      name: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      onClick: shareToInstagram,
      className: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Social Share Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {shareButtons.map((btn) => (
          <motion.button
            key={btn.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={btn.onClick}
            className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium text-sm transition-all ${btn.className}`}
          >
            {btn.icon}
            <span className="hidden sm:inline">{btn.name}</span>
          </motion.button>
        ))}
      </div>

      {/* General Share & Copy Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={shareNative}
          className="btn-celebration flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Invite Friends</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyToClipboard}
          className="px-6 py-3 rounded-full font-semibold border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Copy Link</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default SocialShare;
