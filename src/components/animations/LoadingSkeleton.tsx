import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}
    >
      <motion.div
        className="absolute top-0 left-[-100%] h-full w-full"
        style={{
          background: 'linear-gradient(to right, transparent 0%, #D1D5DB 50%, transparent 100%)',
        }}
        animate={{ x: ['0%', '200%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSkeleton;