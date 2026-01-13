"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({
  variant = "secondary",
  size = "md",
  type,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "dm-button dm-button-primary",
    secondary: "dm-button dm-button-secondary",
    ghost: "dm-button dm-button-ghost",
    danger: "dm-button bg-danger text-paper"
  }[variant];

  const sizeClasses =
    size === "sm"
      ? "text-xs px-3 py-1.5"
      : size === "lg"
        ? "text-base sm:text-lg px-5 py-3"
        : "text-sm sm:text-base px-4 py-2";

  return (
    <button
      type={type ?? "button"}
      className={`${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    />
  );
}
