import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ParticleBackground = () => {
  const shouldReduceMotion = useReducedMotion();
  const numParticles = shouldReduceMotion ? 0 : 25;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      {Array.from({ length: numParticles }).map((_, i) => {
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        const xStart = Math.random() * 100;
        const xEnd = Math.random() * 100;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gray-300 dark:bg-gray-700"
            style={{
              width: size,
              height: size,
              left: `${xStart}vw`,
              bottom: -size,
            }}
            animate={{
              y: '-105vh',
              x: `${xEnd}vw - 50%`,
            }}
            transition={{
              duration,
              delay,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticleBackground;