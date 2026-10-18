
import { useGame } from "../context/GameContext";

export default function GameBoard() {
  const {
    score,
    highScore,
    moleHole,
    timeLeft,
    holeCount,
    restartGame,
    whackMole,
  } = useGame();

  return (
    <section className="game">
      <h1>Whack-a-Mole!</h1>

      <div className="game-stats">
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
        <p>Time Left: {timeLeft}s</p>
      </div>

      <div className="game-board">
        {Array.from({ length: holeCount }, (_, index) => (
          <button
            key={index}
            className="hole"
            onClick={() => whackMole(index)}
            disabled={timeLeft === 0 || index !== moleHole}
            aria-label={`Hole ${index + 1}`}
          >
            {index === moleHole && timeLeft > 0 && (
              <img src="/mole.png" alt="Mole" className="mole" />
            )}
          </button>
        ))}
      </div>

      {timeLeft === 0 && (
        <h2>Time's up! Final Score: {score}</h2>
      )}

      <button onClick={restartGame}>
        Restart Game
      </button>
    </section>
  );
}
