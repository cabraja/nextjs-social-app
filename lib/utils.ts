import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMacOs(): boolean {
  if (typeof window !== "undefined" && window.navigator) {
    if (navigator.platform.toUpperCase().includes("MAC")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
