"use client";

import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  rightSlot?: ReactNode;
};

export function SectionHeader({ eyebrow, title, rightSlot }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-xs uppercase tracking-widest text-muted">{eyebrow}</p>
        ) : null}
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {rightSlot ? <div>{rightSlot}</div> : null}
    </div>
  );
}
