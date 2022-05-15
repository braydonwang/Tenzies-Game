// Components
import Die from "./components/Die";
// React Hooks
import { useEffect, useState } from "react";
// External Libraries
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    var check = true;
    var value = dice[0].value;
    for (let i = 1; i < dice.length; i++) {
      if (!dice[i].isHeld || dice[i].value !== value) {
        check = false;
      }
    }
    if (check) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    var randArray = [];
    for (let i = 0; i < 10; i++) {
      randArray.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return randArray;
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
    } else {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return !die.isHeld
            ? {
                ...die,
                value: Math.floor(Math.random() * 6) + 1,
              }
            : die;
        });
      });
    }
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      });
    });
  }

  const dieData = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        id={die.id}
        holdDice={holdDice}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{dieData}</div>
      <button className="die-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
