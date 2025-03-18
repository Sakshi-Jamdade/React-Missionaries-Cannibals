"use client"

import { motion } from "framer-motion"

function Cannibal({ onClick, interactive, inBoat = false }) {
  return (
    <motion.div
      className={`group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-red-400 to-red-600 text-xs font-bold text-white shadow-md transition-colors duration-300 ${
        interactive ? "hover:from-red-300 hover:to-red-500" : "opacity-80"
      }`}
      style={{
        boxShadow: "0 2px 10px rgba(0,0,0,0.2), inset 0 -2px 0 rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.2)",
      }}
      onClick={onClick}
      whileHover={interactive ? { scale: 1.1, y: -3 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
      initial={inBoat ? { y: 20, opacity: 0 } : {}}
      animate={inBoat ? { y: 0, opacity: 1 } : {}}
      exit={inBoat ? { y: 20, opacity: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      C
      {interactive && (
        <motion.div
          className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-teal-100 opacity-0 group-hover:opacity-100 transition-colors duration-300"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-teal-600">+</div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Cannibal

