import React from "react";
import Button from "react-bootstrap/Button";
import taLogo from "./ta-logo-white.png";
import "./LoaderButton.css";

export default function LoaderButton({
  isLoading,
  className = "btn-span",
  disabled = false,
  ...props
}) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`LoaderButton ${className}`}
      {...props}
    >
      {isLoading && <span><img src={taLogo} className="spinning" alt="Spinning Logo" />&nbsp;</span>}
      {props.children}
    </Button>
  );
}