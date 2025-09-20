import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SuccessAnimation = ({ active = false }) => {
  const shouldReduceMotion = useReducedMotion();
  const numConfetti = shouldReduceMotion ? 0 : 50;

  if (!active) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      {Array.from({ length: numConfetti }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            originX: '50%',
            originY: '50%',
            width: Math.random() * 12 + 6,
            height: Math.random() * 12 + 6,
            backgroundColor: ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#0ea5e9', '#6366f1', '#8b5cf6', '#d946ef'][Math.floor(Math.random() * 10)],
            borderRadius: '50%',
          }}
          initial={{
            opacity: 1,
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [1, 0],
            scale: 1,
            x: (Math.random() - 0.5) * window.innerWidth,
            y: (Math.random() - 0.5) * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

export default SuccessAnimation;