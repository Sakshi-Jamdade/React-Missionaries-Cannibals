function CustomBadge({ children, variant = "default", className = "", ...props }) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"

  const variantStyles = {
    default: "bg-teal-100 text-teal-800",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "text-foreground border border-input",
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  )
}

export default CustomBadge

