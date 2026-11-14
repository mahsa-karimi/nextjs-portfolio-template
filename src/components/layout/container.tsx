import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Container({
  as: Component = "div",
  children,
  className,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "ms-auto me-auto w-full ps-4 pe-4 sm:ps-6 sm:pe-6 lg:ps-8 lg:pe-8",
        className,
      )}
    >
      {children}
    </Component>
  );
}
