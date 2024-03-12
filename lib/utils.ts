import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getTokenFromLocalStorage() {
  if (typeof localStorage !== "undefined") {
    return await localStorage.getItem("token");
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

//fetchblob
export const fetchBlob = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], "image.png", { type: "image/png" });
};
