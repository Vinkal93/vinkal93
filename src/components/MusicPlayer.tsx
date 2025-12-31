import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a royalty-free new year music
    audioRef.current = new Audio(
      "https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3"
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current && !isMuted) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 p-3 sm:p-4 rounded-full glass-card hover:bg-muted/50 transition-all group"
      aria-label={isMuted ? "Unmute music" : "Mute music"}
    >
      <motion.div
        animate={!isMuted ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        )}
      </motion.div>
      {isMuted && (
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-muted-foreground whitespace-nowrap hidden sm:block"
        >
          🎵 Click to play music
        </motion.span>
      )}
    </motion.button>
  );
};

export default MusicPlayer;
