import React from 'react';
import { motion } from 'framer-motion';

interface ProgressStepperProps {
  steps: string[];
  currentStep: number;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, currentStep }) => {
  const numSteps = steps.length;
  const progress = (currentStep / (numSteps - 1)) * 100;

  return (
    <div className="relative w-full">
      <div className="relative h-1 rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((label, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <motion.div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              animate={{
                backgroundColor: index <= currentStep ? '#3b82f6' : '#e5e7eb',
                color: index <= currentStep ? '#ffffff' : '#6b7280',
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {index + 1}
            </motion.div>
            <span className="text-sm mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;