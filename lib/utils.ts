import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTokenFromLocalStorage() {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("token");
  } else {
    return null; // or handle the case where localStorage is not available
  }
}

export const extractFilenameFromURL = (url: string) => {
  const parts = url.split("/");
  const filenameWithQuery = parts[parts.length - 1];
  const filename = filenameWithQuery.split("?")[0];
  return filename;
};
