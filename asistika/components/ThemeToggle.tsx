"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const effective = theme === "system" ? (systemDark ? "dark" : "light") : theme;
    root.setAttribute("data-theme", effective);
  }, [theme]);

  function cycle() {
    setTheme((prev) => (prev === "system" ? "light" : prev === "light" ? "dark" : "system"));
  }

  return (
    <button aria-label="Toggle theme" className="btn btn-outline text-sm" onClick={cycle}>
      {theme === "system" ? "System" : theme === "light" ? "Light" : "Dark"}
    </button>
  );
}