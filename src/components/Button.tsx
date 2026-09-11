"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import type { HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-accent brand-button text-accent-foreground",
    outline: "border border-white/10 bg-transparent hover:bg-white/5",
    ghost: "bg-transparent hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-bold uppercase tracking-wider",
  };

  return (
    <motion.button
      className={cn(
        "relative inline-flex min-h-11 items-center justify-center rounded-sm border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
