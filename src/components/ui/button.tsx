import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-ink-950 text-cream-50 shadow-soft hover:bg-ink-800 hover:shadow-lift hover:-translate-y-0.5",
        gold: "bg-gold-500 text-ink-950 shadow-gold hover:bg-gold-400 hover:shadow-lift hover:-translate-y-0.5",
        outline:
          "border border-ink-950/15 bg-transparent text-ink-950 hover:border-gold-500 hover:bg-gold-500/10",
        "outline-light":
          "border border-white/25 bg-white/5 text-cream-50 backdrop-blur hover:border-gold-400 hover:bg-white/10",
        ghost: "text-ink-950 hover:bg-ink-950/5",
        link: "text-gold-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-sm",
        xl: "h-14 px-10 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
