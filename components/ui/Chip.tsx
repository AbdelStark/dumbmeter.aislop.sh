"use client";

import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

type ChipBaseProps = {
  selected?: boolean;
  asButton?: boolean;
};

type ChipProps = ChipBaseProps &
  (ButtonHTMLAttributes<HTMLButtonElement> | HTMLAttributes<HTMLSpanElement>);

export function Chip({ selected, asButton, className = "", ...props }: ChipProps) {
  const classes = `dm-chip ${selected ? "bg-sus" : "bg-paper"} ${className}`;

  if (asButton) {
    const { type, ...rest } = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return <button type={type ?? "button"} className={classes} {...rest} />;
  }

  return <span className={classes} {...(props as HTMLAttributes<HTMLSpanElement>)} />;
}
