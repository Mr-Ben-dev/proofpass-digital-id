import { Variants } from "framer-motion";

export const defaultEasing = [0.6, -0.05, 0.01, 0.99] as [
  number,
  number,
  number,
  number
];

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: defaultEasing,
    },
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    willChange: "opacity, transform, filter",
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: -32,
    scale: 0.98,
    filter: "blur(4px)",
    willChange: "opacity, transform, filter",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      staggerDirection: -1,
      staggerChildren: 0.05,
    },
  },
};

export const slideIn: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: defaultEasing,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.5,
      ease: defaultEasing,
    },
  },
};

export const scaleButton: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: defaultEasing,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: defaultEasing,
    },
  },
};
