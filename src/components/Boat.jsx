import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Missionary from "./Missionary";
import Cannibal from "./Cannibal";
import CustomBadge from "./ui/CustomBadge";

export default function Boat({ position, missionaries, cannibals, onMove, onMoveFromBoat, gameStatus }) {
  const canMove = (missionaries > 0 || cannibals > 0) && gameStatus === "playing";

  return (
    <motion.div
      className="absolute bottom-0 flex h-24 w-40 flex-col items-center"
      animate={{ x: position === "left" ? "10%" : "90%" }}
      transition={{
        duration: 1,
        ease: "easeInOut", // Smoother easing function
      }}
    >
      <div className="relative">
        <CustomBadge variant="outline" className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 text-teal-700">
          Boat
        </CustomBadge>
      </div>
      <div className="flex gap-2 pb-2">
        {Array.from({ length: missionaries }).map((_, i) => (
          <Missionary
            key={`boat-missionary-${position}-${i}`}
            onClick={() => gameStatus === "playing" && onMoveFromBoat("missionary")}
            interactive={gameStatus === "playing"}
            inBoat
          />
        ))}
        {Array.from({ length: cannibals }).map((_, i) => (
          <Cannibal
            key={`boat-cannibal-${position}-${i}`}
            onClick={() => gameStatus === "playing" && onMoveFromBoat("cannibal")}
            interactive={gameStatus === "playing"}
            inBoat
          />
        ))}
      </div>
      <motion.div
        className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-t-lg bg-gradient-to-b from-amber-600 to-amber-800 shadow-md transition-colors duration-300 ${
          canMove ? "hover:from-amber-500 hover:to-amber-700" : "opacity-70"
        }`}
        onClick={onMove}
        whileHover={canMove ? { scale: 1.03 } : {}}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        }}
      >
        {position === "left" ? (
          <ChevronRight className={`h-6 w-6 ${canMove ? "text-white" : "text-gray-300"}`} />
        ) : (
          <ChevronLeft className={`h-6 w-6 ${canMove ? "text-white" : "text-gray-300"}`} />
        )}
      </motion.div>
    </motion.div>
  );
}