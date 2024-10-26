import React, { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  color?: "primary" | "secondary" | "black" | "white";
}

export const TextField = forwardRef<HTMLParagraphElement, TextProps>(
  ({ color = "primary", className, ...rest }, ref) => {
    const classes = twMerge(
      `font-bold tracking-[3.4px] leading-[50px] text-${color} text-[34px] font-zen-maru-gothic ${
        className ?? ""
      }`
    );
    return (
      <>
        <p ref={ref} className={classes} {...rest}></p>
      </>
    );
  }
);
