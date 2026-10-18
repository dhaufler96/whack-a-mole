
import { GameProvider, useGame } from "./context/GameContext";
import Welcome from "./components/Welcome";
import GameBoard from "./components/GameBoard";

function Game() {
  const { screen } = useGame();

  return (
    <main>
      {screen === "welcome" ? <Welcome /> : <GameBoard />}
    </main>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
