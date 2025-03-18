"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Info, RotateCcw, HelpCircle } from "lucide-react";
import CustomButton from "./ui/CustomButton";
import CustomDialog from "./ui/CustomDialog";
import CustomTooltip from "./ui/CustomTooltip";
import CustomBadge from "./ui/CustomBadge";
import LoadingAnimation from "./LoadingAnimation";
import GameStatus from "./GameStatus";
import Bank from "./Bank";
import Boat from "./Boat";

function EnhancedMissionariesAndCannibals() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [gameState, setGameState] = useState({
    leftBank: { missionaries: 3, cannibals: 3 },
    rightBank: { missionaries: 0, cannibals: 0 },
    boat: { missionaries: 0, cannibals: 0 },
    boatPosition: "left",
    moves: 0,
    moveHistory: [],
    gameStatus: "playing",
  });
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const checkGameState = useCallback(() => {
    if (gameState.rightBank.missionaries === 3 && gameState.rightBank.cannibals === 3) {
      setGameState((prev) => ({ ...prev, gameStatus: "won" }));
      return;
    }
  
    const leftBankLost =
      gameState.leftBank.missionaries > 0 && gameState.leftBank.cannibals > gameState.leftBank.missionaries;
    const rightBankLost =
      gameState.rightBank.missionaries > 0 && gameState.rightBank.cannibals > gameState.rightBank.missionaries;
  
    if (leftBankLost || rightBankLost) {
      setGameState((prev) => ({ ...prev, gameStatus: "lost" }));
    }
  }, [gameState]); // ✅ Ensure dependency list is correct
  
  useEffect(() => {
    checkGameState();
  }, [checkGameState]); // ✅ Now the warning will be gone!
  
  const moveCharacterToBoat = (character) => {
    if (gameState.boat.missionaries + gameState.boat.cannibals >= 2) return;
    if (gameState.gameStatus !== "playing") return;

    const bank = gameState.boatPosition;
    const bankState = bank === "left" ? gameState.leftBank : gameState.rightBank;

    if (character === "missionary" && bankState.missionaries > 0) {
      setGameState((prev) => {
        const newHistory = [...prev.moveHistory, `${character} moved to boat from ${bank} bank`];
        return {
          ...prev,
          [bank === "left" ? "leftBank" : "rightBank"]: {
            ...bankState,
            missionaries: bankState.missionaries - 1,
          },
          boat: {
            ...prev.boat,
            missionaries: prev.boat.missionaries + 1,
          },
          moveHistory: newHistory,
        };
      });
    } else if (character === "cannibal" && bankState.cannibals > 0) {
      setGameState((prev) => {
        const newHistory = [...prev.moveHistory, `${character} moved to boat from ${bank} bank`];
        return {
          ...prev,
          [bank === "left" ? "leftBank" : "rightBank"]: {
            ...bankState,
            cannibals: bankState.cannibals - 1,
          },
          boat: {
            ...prev.boat,
            cannibals: prev.boat.cannibals + 1,
          },
          moveHistory: newHistory,
        };
      });
    }
  };

  const moveCharacterFromBoat = (character) => {
    if (gameState.gameStatus !== "playing") return;
    const bank = gameState.boatPosition;

    if (character === "missionary" && gameState.boat.missionaries > 0) {
      setGameState((prev) => {
        const bankState = bank === "left" ? prev.leftBank : prev.rightBank;
        const newHistory = [...prev.moveHistory, `${character} moved from boat to ${bank} bank`];
        return {
          ...prev,
          [bank === "left" ? "leftBank" : "rightBank"]: {
            ...bankState,
            missionaries: bankState.missionaries + 1,
          },
          boat: {
            ...prev.boat,
            missionaries: prev.boat.missionaries - 1,
          },
          moveHistory: newHistory,
        };
      });
    } else if (character === "cannibal" && gameState.boat.cannibals > 0) {
      setGameState((prev) => {
        const bankState = bank === "left" ? prev.leftBank : prev.rightBank;
        const newHistory = [...prev.moveHistory, `${character} moved from boat to ${bank} bank`];
        return {
          ...prev,
          [bank === "left" ? "leftBank" : "rightBank"]: {
            ...bankState,
            cannibals: bankState.cannibals + 1,
          },
          boat: {
            ...prev.boat,
            cannibals: prev.boat.cannibals - 1,
          },
          moveHistory: newHistory,
        };
      });
    }
  };

  const moveBoat = () => {
    if (gameState.boat.missionaries + gameState.boat.cannibals === 0) return;
    if (gameState.gameStatus !== "playing") return;

    setGameState((prev) => {
      const newPosition = prev.boatPosition === "left" ? "right" : "left";
      const newHistory = [...prev.moveHistory, `Boat moved from ${prev.boatPosition} to ${newPosition} bank`];
      return {
        ...prev,
        boatPosition: newPosition,
        moves: prev.moves + 1,
        moveHistory: newHistory,
      };
    });
  };

  const resetGame = () => {
    setGameState({
      leftBank: { missionaries: 3, cannibals: 3 },
      rightBank: { missionaries: 0, cannibals: 0 },
      boat: { missionaries: 0, cannibals: 0 },
      boatPosition: "left",
      moves: 0,
      moveHistory: [],
      gameStatus: "playing",
    });
    setShowHint(false);
  };

  const getHint = () => {
    const { leftBank, rightBank, boat } = gameState;

    if (leftBank.missionaries === 3 && leftBank.cannibals === 3) {
      return "Start by sending 2 cannibals to the right bank.";
    }
    if (leftBank.missionaries === 3 && leftBank.cannibals === 1 && rightBank.cannibals === 2) {
      return "Send 1 cannibal back to the left bank.";
    }
    if (leftBank.missionaries === 3 && leftBank.cannibals === 2) {
      return "Send 2 cannibals to the right bank.";
    }
    if (leftBank.missionaries === 3 && rightBank.cannibals === 3) {
      return "Send 1 cannibal back to the left bank.";
    }
    if (leftBank.missionaries === 3 && leftBank.cannibals === 1 && rightBank.cannibals === 2) {
      return "Send 2 missionaries to the right bank.";
    }
    if (boat.missionaries + boat.cannibals === 0) {
      return "Select characters to put in the boat.";
    }
    if (boat.missionaries + boat.cannibals > 0) {
      return "You can now move the boat or return characters to the bank.";
    }
    return "Try to avoid having more cannibals than missionaries on either bank.";
  };

  if (loading) {
    return <LoadingAnimation progress={loadingProgress} />;
  }
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-blue-50 p-4 transition-colors duration-300">
      <div className="w-full max-w-4xl rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-colors duration-300">
        <div className="mb-6 flex items-center justify-between">
          <motion.h1
            className="text-3xl font-bold text-teal-800 relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative">
              Missionaries & Cannibals
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h1>
          <div className="flex items-center gap-3">
            <CustomTooltip content="Get a hint">
              <CustomButton
                variant="outline"
                size="icon"
                onClick={() => setShowHint(!showHint)}
                className="border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                <HelpCircle className="h-5 w-5" />
              </CustomButton>
            </CustomTooltip>
            <CustomButton
              onClick={resetGame}
              variant="outline"
              className="border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </CustomButton>
            <CustomDialog
              title="Game Rules"
              trigger={
                <CustomButton variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                  <Info className="mr-2 h-4 w-4" />
                  Rules
                </CustomButton>
              }
            >
              <ul className="space-y-3 text-teal-700">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span>3 missionaries and 3 cannibals must cross a river using a boat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span>The boat can carry at most 2 people at a time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span>The boat cannot cross the river by itself with no people on board.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span>
                    At no time can cannibals outnumber missionaries on either bank, or the missionaries will be eaten!
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span>Click on characters to move them to/from the boat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span>Click the boat to move it across the river.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span>The goal is to get everyone safely to the right bank.</span>
                </li>
              </ul>
            </CustomDialog>
          </div>
        </div>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 rounded-lg bg-amber-50 p-3 text-amber-800"
          >
            <div className="flex items-start gap-2">
              <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <p>{getHint()}</p>
            </div>
          </motion.div>
        )}
        <GameStatus gameState={gameState} />
        <div className="relative mb-8 mt-6 flex w-full items-end justify-between rounded-xl bg-gradient-to-r from-teal-100 via-blue-100 to-teal-100 p-6 transition-colors duration-300">
          <div className="absolute inset-x-0 top-0 flex justify-between px-6 pt-2">
            <CustomBadge variant="outline" className="bg-white/80 text-teal-700">
              Left Bank
            </CustomBadge>
            <CustomBadge variant="outline" className="bg-white/80 text-teal-700">
              Right Bank
            </CustomBadge>
          </div>
          <div className="w-1/4">
            <Bank
              side="left"
              missionaries={gameState.leftBank.missionaries}
              cannibals={gameState.leftBank.cannibals}
              boatPosition={gameState.boatPosition}
              onMoveToBoat={moveCharacterToBoat}
              gameStatus={gameState.gameStatus}
            />
          </div>
          <div className="relative h-28 w-1/2 mx-auto overflow-hidden rounded-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 transition-colors duration-300">
            <motion.div
              className="absolute inset-0 opacity-40"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 20, 50 10 T 100 10' stroke='white' fill='transparent' strokeWidth='2'/%3E%3C/svg%3E\")",
                backgroundSize: "100px 20px",
              }}
            />
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                backgroundPosition: ["100% 30%", "0% 70%"],
              }}
              transition={{
                duration: 6,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='120' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15 Q 30 5, 60 15 T 120 15' stroke='white' fill='transparent' strokeWidth='2'/%3E%3C/svg%3E\")",
                backgroundSize: "120px 30px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-600/20"></div>
            <Boat
              position={gameState.boatPosition}
              missionaries={gameState.boat.missionaries}
              cannibals={gameState.boat.cannibals}
              onMove={moveBoat}
              onMoveFromBoat={moveCharacterFromBoat}
              gameStatus={gameState.gameStatus}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-8 opacity-70"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
              }}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
              }}
            />
          </div>
          <div className="w-1/4">
            <Bank
              side="right"
              missionaries={gameState.rightBank.missionaries}
              cannibals={gameState.rightBank.cannibals}
              boatPosition={gameState.boatPosition}
              onMoveToBoat={moveCharacterToBoat}
              gameStatus={gameState.gameStatus}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-white/90 p-4 shadow-sm transition-colors duration-300">
            <h2 className="mb-2 font-semibold text-teal-800">Game Statistics</h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-teal-50 p-2 transition-colors duration-300">
                <div className="text-sm text-teal-600">Moves</div>
                <div className="text-2xl font-bold text-teal-800">{gameState.moves}</div>
              </div>
              <div className="rounded-md bg-teal-50 p-2 transition-colors duration-300">
                <div className="text-sm text-teal-600">Boat Position</div>
                <div className="text-xl font-bold text-teal-800 capitalize">{gameState.boatPosition} Bank</div>
              </div>
              <div className="rounded-md bg-teal-50 p-2 transition-colors duration-300">
                <div className="text-sm text-teal-600">Missionaries Left</div>
                <div className="text-xl font-bold text-teal-800">
                  {gameState.leftBank.missionaries +
                    (gameState.boatPosition === "left" ? gameState.boat.missionaries : 0)}
                </div>
              </div>
              <div className="rounded-md bg-teal-50 p-2 transition-colors duration-300">
                <div className="text-sm text-teal-600">Cannibals Left</div>
                <div className="text-xl font-bold text-teal-800">
                  {gameState.leftBank.cannibals + (gameState.boatPosition === "left" ? gameState.boat.cannibals : 0)}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white/90 p-4 shadow-sm transition-colors duration-300">
            <h2 className="mb-2 font-semibold text-teal-800">Move History</h2>
            <div className="h-[120px] overflow-y-auto rounded-md bg-teal-50 p-2 text-sm text-teal-700 transition-colors duration-300">
              {gameState.moveHistory.length === 0 ? (
                <div className="flex h-full items-center justify-center text-teal-500">
                  No moves yet. Start playing!
                </div>
              ) : (
                <ul className="space-y-1">
                  {gameState.moveHistory.map((move, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border-b border-teal-100 pb-1 last:border-0"
                    >
                      {index + 1}. {move}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnhancedMissionariesAndCannibals;