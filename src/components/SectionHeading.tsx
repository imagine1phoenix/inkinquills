"use client";

import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <ScrollReveal className={`${alignClass} ${className}`}>
      <div className="space-y-3">
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink">
          {title}
        </h2>
        {subtitle && (
          <p className="font-body text-lg text-ink-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div
          className={`mt-4 ${
            align === "center" ? "gold-line-center" : "gold-line"
          }`}
        />
      </div>
    </ScrollReveal>
  );
}
