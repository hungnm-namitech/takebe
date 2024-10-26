import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  color?: "primary" | "black" | "white";
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ color = "black", className, ...rest }, ref) => {
    const classes = twMerge(
      `text-[15px] font-medium leading-8 tracking-[0.45px] font-zen-kaku-gothic-new text-${color} ${
        className ?? ""
      }`
    );
    return (
      <>
        <p className={classes} {...rest} ref={ref}></p>
      </>
    );
  }
);
