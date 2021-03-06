import React from "react";
export default function NavigationItem({ children, logo, isActive, className }) {
  return (
    <div
      className={`nav-button ${logo ? "nav-button-logo" : ""}${isActive ? "nav-button-active" : ""
        } ${className}`}
    >
      {children}
    </div>
  );
}
