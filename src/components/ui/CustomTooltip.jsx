"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

function CustomTooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)

  const showTooltip = () => setIsVisible(true)
  const hideTooltip = () => setIsVisible(false)

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      })
    }
  }, [isVisible])

  // Clone the child element with the ref and event handlers
  const childWithProps = React.cloneElement(React.Children.only(children), {
    ref: (node) => {
      // Handle both function refs and object refs
      if (typeof children.ref === "function") {
        children.ref(node)
      } else if (children.ref) {
        children.ref.current = node
      }
      triggerRef.current = node
    },
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
  })

  return (
    <>
      {childWithProps}
      {typeof window !== "undefined" && (
        <AnimatePresence>
          {isVisible && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
                pointerEvents: "none",
              }}
            >
              <motion.div
                ref={tooltipRef}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  left: position.x,
                  top: position.y,
                  transform: "translate(-50%, -100%)",
                  padding: "0.5rem",
                  background: "white",
                  color: "#0f766e",
                  borderRadius: "0.25rem",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  fontSize: "0.875rem",
                  maxWidth: "15rem",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {content}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: "8px",
                    height: "8px",
                    background: "white",
                  }}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}

export default CustomTooltip

