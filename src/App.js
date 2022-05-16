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
  const [rolls, setRolls] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [millis, setMillis] = useState(0);
  const [isActive, setIsActive] = useState(true);

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
      setIsActive(false);
      if (
        localStorage.getItem("bestTime") === null ||
        seconds * 100 + millis < localStorage.getItem("bestTime")
      ) {
        localStorage.setItem("bestTime", seconds * 100 + millis);
      }
    }
  }, [dice]);

  useEffect(() => {
    let intervalSeconds = null;
    let intervalMillis = null;
    if (isActive) {
      if (millis > 50) {
        setMillis(0);
      }
      intervalSeconds = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      intervalMillis = setInterval(() => {
        setMillis((prevMillis) => prevMillis + 1);
      }, 10);
    } else if (!isActive && (seconds !== 0 || millis !== 0)) {
      clearInterval(intervalSeconds);
      clearInterval(intervalMillis);
    }
    return () => {
      clearInterval(intervalSeconds);
      clearInterval(intervalMillis);
    };
  }, [isActive, seconds]);

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
      setIsActive(true);
      setSeconds(0);
      setMillis(0);
      setRolls(0);
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
      setRolls((prevRolls) => prevRolls + 1);
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
      <h2 className="die-rolls">Number of Rolls: {rolls}</h2>
      <h2 className="die-time">
        {seconds}:{millis}
      </h2>
      <h2 className="die-rolls">
        Best Time:{" "}
        {localStorage.getItem("bestTime")
          ? Math.floor(localStorage.getItem("bestTime") / 100) +
            " seconds, " +
            (localStorage.getItem("bestTime") % 100) +
            " milliseconds"
          : "N/A"}
      </h2>
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
