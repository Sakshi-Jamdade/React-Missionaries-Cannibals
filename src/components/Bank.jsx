"use client"

import Missionary from "./Missionary"
import Cannibal from "./Cannibal"

function Bank({ side, missionaries, cannibals, boatPosition, onMoveToBoat, gameStatus }) {
  const canInteract = boatPosition === side && gameStatus === "playing"

  return (
    <div className={`flex h-40 w-full flex-col items-center justify-end`}>
      <div className="mb-2 grid grid-cols-3 gap-2">
      {Array.from({ length: missionaries }).map((_, i) => (
        <Missionary
          key={`missionary-${side}-${i}`} // Removed Date.now()
          onClick={() => canInteract && onMoveToBoat("missionary")}
          interactive={canInteract}
        />
      ))}

      {Array.from({ length: cannibals }).map((_, i) => (
        <Cannibal
          key={`cannibal-${side}-${i}`} // Removed Date.now()
          onClick={() => canInteract && onMoveToBoat("cannibal")}
          interactive={canInteract}
        />
      ))}

      </div>
      <div className="mt-2 h-12 w-full rounded-t-lg bg-gradient-to-b from-emerald-600 to-emerald-800 shadow-md transition-colors duration-300">
        <div className="h-2 w-full bg-gradient-to-b from-emerald-500 to-transparent opacity-60"></div>
        <div className="mt-1 flex justify-around">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-2 w-1 bg-emerald-500/30 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Bank;

