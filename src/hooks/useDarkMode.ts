"use client";

import { useCallback, useState } from "react";

export const useDarkMode = () => {
  let darkIsActive = false
  if(typeof window !== undefined){
    darkIsActive = localStorage.getItem("darkMode") ? true : false
  }
  const [darkMode, setDarkMode] = useState(darkIsActive);
  const changeMode = useCallback(() => {
    setDarkMode(!darkMode);
    if (darkMode === false) {
      if(typeof window !== undefined) {
        localStorage.setItem("darkMode", "day");
      }
      document.documentElement.classList.remove("dark");
    } else {
      if(typeof window !== undefined) {
        localStorage.setItem("darkMode", "dark");
      }
      document.documentElement.classList.add("dark");
    }
  },[darkMode]);
  return { darkMode, changeMode };
};
