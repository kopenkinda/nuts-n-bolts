import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Card = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cn("p-2 border rounded-lg", className)}
  />
));

export const CardTitle = forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span {...props} ref={ref} className={cn("text-md block", className)} />
));

export const CardHighlight = forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cn("ttext-2xl font-black", className)}
  />
));
