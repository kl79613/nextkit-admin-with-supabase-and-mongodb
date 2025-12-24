"use client";

import React from "react";

interface ScrollButtonProps {
  targetId: string;
  className?: string;
  children: React.ReactNode;
}

export default function ScrollButton({
  targetId,
  className,
  children,
}: ScrollButtonProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button onClick={scrollToSection} className={className}>
      {children}
    </button>
  );
}
