"use client";

import { Button } from "@/components/ui/Button";

type VoteButtonsProps = {
  onConfirm: () => void;
  onDeny: () => void;
  confirmCount: number;
  denyCount: number;
  disabled?: boolean;
};

export function VoteButtons({
  onConfirm,
  onDeny,
  confirmCount,
  denyCount,
  disabled
}: VoteButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="secondary" size="sm" onClick={onConfirm} disabled={disabled}>
        Confirm {confirmCount}
      </Button>
      <Button variant="ghost" size="sm" onClick={onDeny} disabled={disabled}>
        Can't reproduce {denyCount}
      </Button>
    </div>
  );
}
