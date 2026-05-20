import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // INITIAL THEME

  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // TOGGLE THEME
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // APPLY THEME
  useEffect(() => {
    const root = document.documentElement;
    // DARK CLASS
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // SAVE THEME
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    // SMOOTH TRANSITION
    document.body.style.transition =
      "background-color 0.3s ease, color 0.3s ease";
  }, [darkMode]);

  // SYSTEM THEME CHANGE LISTENER
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      const savedTheme = localStorage.getItem("theme");
      // only auto-change if user never selected manually
      if (!savedTheme) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// CUSTOM HOOK

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
