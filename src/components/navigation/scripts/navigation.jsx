import React from "react";
import "../styles/navigation.css";
export default function Navigation({ children }) {
  const hasTouch = () =>
    "ontouchstart" in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  return (
    <div className={`navbar${!hasTouch() ? " is-desktop" : ""}`}>
      {children}
    </div>
  );
}
