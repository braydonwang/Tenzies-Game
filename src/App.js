// Components
import Die from "./components/Die";
//React Hooks
import { useState } from "react";

export default function App() {
  const [dice, setDice] = useState(allNewDice);

  function allNewDice() {
    var randArray = [];
    for (let i = 0; i < 10; i++) {
      randArray.push(Math.floor(Math.random() * 6) + 1);
    }
    return randArray;
  }

  function rollDice() {
    var randArray = [];
    for (let i = 0; i < 10; i++) {
      randArray.push(Math.floor(Math.random() * 6) + 1);
    }
    setDice(randArray);
  }

  const dieData = dice.map((die) => {
    return <Die value={die} />;
  });

  return (
    <main>
      <div className="container">{dieData}</div>
      <button className="die-button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
