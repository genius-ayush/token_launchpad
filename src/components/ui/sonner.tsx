import { useTheme } from "@/components/theme-provider"

import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          // Success (was green) → yellow/black/white scheme
          "--success-bg": "#FACC15",
          "--success-text": "#111111",
          "--success-border": "#EAB308",
          // Optional: error/info to harmonize with theme
          "--error-bg": "#111111",
          "--error-text": "#FFFFFF",
          "--error-border": "#27272a",
          "--warning-bg": "#fde68a",
          "--warning-text": "#111111",
          "--warning-border": "#f59e0b",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
