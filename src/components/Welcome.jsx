
import { useGame } from "../context/GameContext";

export default function Welcome() {
  const { highScore, startGame } = useGame();

  return (
    <section className="welcome">
      <h1>Whack-a-Mole!</h1>

      <p>
        Welcome to Whack-a-Mole! You have 15 seconds
        to whack as many moles as you can.
      </p>

      <p>
        Click the mole whenever it appears in a hole
        to earn a point!
      </p>

      <h2>High Score: {highScore}</h2>

      <button onClick={startGame}>
        Play Game
      </button>
    </section>
  );
}
