"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button variant="primary" onClick={handleShare}>
      {copied ? "Link copied" : "Share today"}
    </Button>
  );
}
