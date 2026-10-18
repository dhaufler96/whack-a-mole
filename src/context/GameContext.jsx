
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const GameContext = createContext(null);

const HOLE_COUNT = 9;
const GAME_DURATION = 15;

function randomHole(exclude = -1) {
  let next;

  do {
    next = Math.floor(Math.random() * HOLE_COUNT);
  } while (next === exclude);

  return next;
}

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("welcome");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [moleHole, setMoleHole] = useState(() => randomHole());
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const timerRef = useRef(null);

  function startGame() {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setMoleHole(randomHole());
    setScreen("playing");
  }

  function restartGame() {
    setScreen("welcome");
    setScore(0);
    setTimeLeft(GAME_DURATION);
  }

  function whackMole(index) {
    if (
      screen !== "playing" ||
      timeLeft <= 0 ||
      index !== moleHole
    ) {
      return;
    }

    const nextScore = score + 1;

    setScore(nextScore);
    setHighScore((previous) => Math.max(previous, nextScore));
    setMoleHole((previous) => randomHole(previous));
  }

  useEffect(() => {
    if (screen !== "playing" || timeLeft <= 0) {
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [screen, timeLeft === 0]);

  const value = {
    screen,
    score,
    highScore,
    moleHole,
    timeLeft,
    holeCount: HOLE_COUNT,
    startGame,
    restartGame,
    whackMole,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
}
