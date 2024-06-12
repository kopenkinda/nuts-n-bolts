import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Card = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={cn("p-2 border", className)} />
));
