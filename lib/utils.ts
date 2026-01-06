import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { UserData } from "@/types/user"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserFromStorage = (): UserData | null => {
  const data = localStorage.getItem('user')
  return data ? (JSON.parse(data) as UserData) : null
}