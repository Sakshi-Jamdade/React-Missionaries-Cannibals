function CustomProgress({ value = 0, className = "", ...props }) {
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-teal-100 ${className}`} {...props}>
      <div
        className="h-full w-full flex-1 bg-teal-500 transition-all"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  )
}

export default CustomProgress

