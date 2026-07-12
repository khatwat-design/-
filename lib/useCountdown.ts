"use client";

import { useEffect, useState } from "react";

const DEFAULT_DURATION = 20 * 60;

export function useCountdown(durationSeconds: number = DEFAULT_DURATION) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? durationSeconds : s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [durationSeconds]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}
