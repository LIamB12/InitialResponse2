import React from 'react';
import "./keyboard.css";


const r1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
const r2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]
const r3 = ["z", "x", "c", "v", "b", "n", "m"]

const Key = (props) => {

    function handleButtonClick(letter) {
        props.setter(prev => ({
            lettersEntered: ( prev.lettersEntered.length < props.answerLength ? [...prev.lettersEntered, letter] : [...prev.lettersEntered]),
            bounceIndex: (prev.bounceIndex !== props.answerLength ? prev.bounceIndex + 1 : prev.bounceIndex),
            won: prev.won,
            aniIndex: 1,
            question: prev.question,
            qIndex: prev.qIndex,
            showStats: prev.showStats
        }))
    }
    const keyRow = props.row.map((letter) => <button onMouseDown = {() => handleButtonClick(letter)}>{letter}</button>);

    return(
        <>
        {keyRow}
        </>
    )
}
const Keyboard = (props) => {

    function handleBackspace() {
        props.setter(prev => ({
            lettersEntered: prev.lettersEntered.slice(0, prev.lettersEntered.length-1),
            bounceIndex: (prev.bounceIndex !== 0 ? prev.bounceIndex - 1 : 0),
            won: prev.won,
            aniIndex: 1,
            question: prev.question,
            qIndex: prev.qIndex,
            showStats: prev.showStats
        }))
    }

    function handleEnter(props) {
        props.setter(prev => ({
            lettersEntered: prev.lettersEntered,
            bounceIndex: prev.bounceIndex,
            won: (JSON.stringify(prev.lettersEntered) === (JSON.stringify(props.answerArray))),
            aniIndex: (JSON.stringify(prev.lettersEntered) === (JSON.stringify(props.answerArray)) ? 1 : 0),
            question: prev.question,
            qIndex: prev.qIndex,
            showStats: prev.showStats
        }))
    }
  return (
    <div className="keyboard_container">
        <div className="row">
            <Key setter = {props.setter} answerLength = {props.answerLength} row = {r1}/>
        </div>
        <div className="row">
            <Key setter = {props.setter} answerLength = {props.answerLength} row = {r2}/>
        </div>
        <div className="row">
            <button className = "nonLetter" onMouseDown = {() => handleEnter(props)}>ENTER</button>
            <Key setter = {props.setter} answerLength = {props.answerLength} row = {r3}/>
            <button className = "nonLetter" onMouseDown = {() => handleBackspace()}>BACK</button>
        </div>
    </div>
  )
}

export default Keyboard