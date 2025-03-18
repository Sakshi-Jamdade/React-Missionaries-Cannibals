"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

function GameStatus({ gameState }) {
  if (gameState.gameStatus === "won") {
    return (
      <motion.div
        className="mb-4 rounded-lg bg-emerald-50 p-4 text-center text-emerald-800 transition-colors duration-300"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          <h2 className="text-xl font-bold">Mission Accomplished! 🎉</h2>
        </div>
        <p>You successfully transported everyone across the river in {gameState.moves} moves.</p>
      </motion.div>
    )
  }

  if (gameState.gameStatus === "lost") {
    return (
      <motion.div
        className="mb-4 rounded-lg bg-rose-50 p-4 text-center text-rose-800 transition-colors duration-300"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-6 w-6 text-rose-600" />
          <h2 className="text-xl font-bold">Mission Failed</h2>
        </div>
        <p>The cannibals have outnumbered the missionaries on one of the banks!</p>
      </motion.div>
    )
  }

  return null
}

export default GameStatus

