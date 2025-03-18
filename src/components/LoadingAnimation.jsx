"use client"

import { motion } from "framer-motion"
import CustomProgress from "./ui/CustomProgress"

function LoadingAnimation({ progress }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-blue-50 transition-colors duration-300">
      <div className="w-full max-w-md rounded-xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-colors duration-300">
        <h1 className="mb-6 text-center text-3xl font-bold text-teal-800">Missionaries & Cannibals</h1>
        <div className="flex flex-col items-center">
          <div className="mb-4 text-teal-600">Loading Game...</div>
          <CustomProgress value={progress} className="h-2 w-64" />

          <div className="mt-10 flex items-end justify-center gap-2">
            <div className="relative">
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-teal-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                Loading assets...
              </motion.div>
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white"
                initial={{ y: 0 }}
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                M
              </motion.div>
            </div>

            <motion.div
              className="h-6 w-20 rounded-t-lg bg-amber-700"
              animate={{
                rotateZ: [-2, 2, -2],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
              }}
            />

            <div className="relative">
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-teal-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.5,
                }}
              >
                Preparing game...
              </motion.div>
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white"
                initial={{ y: 0 }}
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.3,
                }}
              >
                C
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-8 h-4 w-full rounded-full bg-blue-200"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: "left" }}
          />

          <motion.div
            className="mt-4 text-sm text-teal-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {Math.round(progress)}% complete
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LoadingAnimation

