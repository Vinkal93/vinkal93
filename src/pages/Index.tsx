import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeForm from "@/components/WelcomeForm";
import PersonalizedWish from "@/components/PersonalizedWish";
import ParticleBackground from "@/components/ParticleBackground";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [initialName, setInitialName] = useState<string>("");
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get("name");
    if (nameFromUrl) {
      setInitialName(decodeURIComponent(nameFromUrl));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (userName) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userName]);

  const handleNameSubmit = (name: string) => {
    const newUrl = `${window.location.pathname}?name=${encodeURIComponent(name)}`;
    window.history.pushState({}, "", newUrl);
    setUserName(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
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

      <AnimatePresence mode="wait">
        {userName ? (
          <motion.div
            key="personalized"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MusicPlayer />
            <PersonalizedWish name={userName} />
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeForm initialName={initialName} onSubmit={handleNameSubmit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
