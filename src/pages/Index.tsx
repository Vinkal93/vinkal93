import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import NamePopup from "@/components/NamePopup";
import PersonalizedWish from "@/components/PersonalizedWish";
import ParticleBackground from "@/components/ParticleBackground";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Check URL for name parameter
    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get("name");
    
    if (nameFromUrl) {
      setUserName(decodeURIComponent(nameFromUrl));
    } else {
      // Auto-open popup if no name in URL
      setShowPopup(true);
    }
    
    setIsLoading(false);
  }, []);

  // Scroll to top when userName changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userName]);

  const handleNameSubmit = (name: string) => {
    // Update URL with name parameter
    const newUrl = `${window.location.pathname}?name=${encodeURIComponent(name)}`;
    window.history.pushState({}, "", newUrl);
    setUserName(name);
    setShowPopup(false);
    // Scroll to top after submission
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <MusicPlayer />
      
      <AnimatePresence mode="wait">
        {userName ? (
          <motion.div
            key="personalized"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PersonalizedWish name={userName} />
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection onStartClick={() => setShowPopup(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPopup && (
          <NamePopup
            onSubmit={handleNameSubmit}
            onClose={() => setShowPopup(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
