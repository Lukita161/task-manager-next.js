"use client";

import { useCallback, useState } from "react";

export const useDarkMode = () => {
    const darkIsActive = localStorage.getItem("darkMode") ? true : false
  const [darkMode, setDarkMode] = useState(darkIsActive);
  const changeMode = useCallback(() => {
    setDarkMode(!darkMode);
    if (darkMode === false) {
      localStorage.setItem("darkMode", "day");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("darkMode", "dark");
      document.documentElement.classList.add("dark");
    }
  },[darkMode]);
  return { darkMode, changeMode };
};
