import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  duration?: number; // in seconds
  delayBetween?: number; // in seconds
  animationType?: "fade" | "slide";
  className?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  duration = 1,
  delayBetween = 2,
  animationType = "fade",
  className = "",
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, (duration + delayBetween) * 1000);

    return () => clearInterval(interval);
  }, [texts.length, duration, delayBetween]);

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const slideVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  const variants = animationType === "slide" ? slideVariants : fadeVariants;

  return (
    <div className={`rotating-text-wrapper ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={texts[index]}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration }}
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;
