import React from 'react'
import './App.css'
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import dice1 from "./assets/dice1.png"
import dice2 from "./assets/dice2.png"
import dice3 from "./assets/dice3.png"
import dice4 from "./assets/dice4.png"
import dice5 from "./assets/dice5.png"
import dice6 from "./assets/dice6.png"

function App() {
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  const [count, setCount] = React.useState(0)

  const [time, setTime] = React.useState(Date.now())

  const [bestTime, setBestTime] = React.useState(JSON.parse(localStorage.getItem("bestTime")))

  React.useEffect(() => {
    setBestTime(JSON.parse(localStorage.getItem("bestTime")));
  }, [time])

  React.useEffect(() => {
    
    let held = diceNumbers.every(die => die.isHeld)
    let isWon = false;

    if (held) {
      const first = diceNumbers[0].value
      isWon = diceNumbers.every(die => die.value == first)
    }

    if (isWon) {
        setTenzies(true)
        setTime(prevTime => {
          let newTime = Date.now() - prevTime;
          newTime = truncTime(newTime)
          if (newTime < bestTime || bestTime == null) {
            localStorage.setItem("bestTime", JSON.stringify(newTime));
          }
          return newTime
        })
    }
  }, [diceNumbers])

  // truncate time
  function truncTime(num) {
    let newNum = num / 100;
    newNum = Math.trunc(newNum);
    newNum = newNum / 10;
    return newNum
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(prev) {
    let diceArray = [];
    for (let i=0; i<10; i++) {
        diceArray.push(generateNewDie())
    }
    return diceArray;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDiceNumbers(allNewDice)
      setCount(0)
      setTime(Date.now())
    } else {
      setDiceNumbers((prev) => prev.map(oldDie => {
        return oldDie.isHeld ? oldDie : generateNewDie()
      }))
      setCount(prev => prev+1)
    }
  }

  function hold(id) {
    let newArray = [];

    setDiceNumbers(prev => prev.map(oldDie => {
      return oldDie.id === id ? {...oldDie, isHeld: !oldDie.isHeld} : oldDie; 
    }))

  }

  let images = [dice1, dice2, dice3, dice4, dice5, dice6];

  let diceElements = diceNumbers.map((die, index) => {
    return <Die face={images[die.value-1]} key={die.id} die={die} hold={() => hold(die.id)} />
  })

  return (
    <>
    {tenzies && <Confetti />}
    <main className='main'>
      <h4 className='bestTime'>Best: {bestTime != null ? (<>{bestTime} <small>secs</small></>) : "N/A"}</h4>
      <h1 className='title'>Tenzies</h1>
      <p className='subtitle'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <h4 className='count'>Rolls: {count}</h4>
      <section className='dice'>
        {diceElements}
      </section>
      <button onClick={rollDice} className='button'>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <h4>Time: {time} secs</h4>}
    </main>
    </>
  )
}

export default App
