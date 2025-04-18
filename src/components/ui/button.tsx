
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-navy text-peach hover:bg-navy-light",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-navy bg-transparent text-navy hover:bg-navy/10",
        secondary:
          "bg-peach-light text-navy hover:bg-peach/80",
        ghost: "hover:bg-peach-light hover:text-navy",
        link: "text-navy underline-offset-4 hover:underline",
        cloudai: "bg-gradient-to-r from-navy to-navy-light text-peach hover:opacity-90 transition-opacity",
        navy: "bg-navy text-peach hover:bg-navy-light transition-colors",
        peach: "bg-peach text-navy hover:bg-peach-dark transition-colors",
        navyGradient: "bg-gradient-to-r from-navy to-navy-light text-peach hover:opacity-90 transition-opacity",
        peachGradient: "bg-gradient-to-r from-peach to-peach-dark text-navy hover:opacity-90 transition-opacity",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
