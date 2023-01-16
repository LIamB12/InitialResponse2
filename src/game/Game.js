import React, { useState, useEffect } from 'react'
import Line from '../line/Line'
import Keyboard from '../keyboard/Keyboard'
import './game.css'


const Game = (props) => {

    const [stateObj, setStateObj] = useState({lettersEntered: [], showStats: false, qIndex: 0, bounceIndex: 0, won: false, aniIndex: 1, question: [["52", "cards"], ["in a", "deck"]]})

    let answerLength = 0
    let startingIndexes = [0]
    let answerArray = []

    for (let i = 0; i < stateObj.question.length; i++) {

        if (i !== stateObj.question.length -1) {
            startingIndexes.push(stateObj.question[i][1].length + startingIndexes[startingIndexes.length - 1])
        }
        for (let j = 0; j < stateObj.question[i][1].length; j++) {
            answerLength++
            answerArray.push(stateObj.question[i][1][j])
            }
    }
    
    

    function handleKeyDown(e) {
        if(e.keyCode >= 65 && e.keyCode <= 90 && !stateObj.won) {
            setStateObj(prev => (
                {
                lettersEntered: ( prev.lettersEntered.length < answerLength ? [...prev.lettersEntered, e.key] : [...prev.lettersEntered]),
                bounceIndex: (prev.bounceIndex !== answerLength ? prev.bounceIndex + 1 : prev.bounceIndex),
                won: prev.won,
                aniIndex: 1,
                question: prev.question,
                qIndex: prev.qIndex,
                showStats: prev.showStats
            }))
        }
        else if (e.keyCode === 8 && !stateObj.won){
            setStateObj(prev => (
                {
                lettersEntered: prev.lettersEntered.slice(0, prev.lettersEntered.length-1),
                bounceIndex: (prev.bounceIndex !== 0 ? prev.bounceIndex - 1 : 0),
                won: prev.won,
                aniIndex: 1,
                question: prev.question,
                qIndex: prev.qIndex,
                showStats: prev.showStats
            }))
        }
        else if (e.keyCode === 13 && !stateObj.won) {

                setStateObj(prev => (
                    {
                    lettersEntered: prev.lettersEntered,
                    bounceIndex: prev.bounceIndex,
                    won: (JSON.stringify(prev.lettersEntered) === (JSON.stringify(answerArray))),
                    aniIndex: (JSON.stringify(prev.lettersEntered) === (JSON.stringify(answerArray)) ? 1 : 0),
                    question: prev.question,
                    qIndex: prev.qIndex,
                    showStats: prev.showStats
                }))

        }
        
    }
    useEffect(() => {
        // on component mount
            document.addEventListener("keydown", handleKeyDown)
        
      
        // on component unmount
        return () => {
                document.removeEventListener("keydown", handleKeyDown)
        }

      }, [stateObj.won])
    
  return (
    <>
    <div className="heading">
        <h1>INITIAL RESPONSE</h1>
    </div>
    <div className="game_box">
        {!stateObj.showStats ? <>
            {stateObj.question.map((word, i) => <Line setter = {setStateObj} aniIndex = {stateObj.aniIndex} hint = {word[0]} won = {stateObj.won} bounceIndex = {stateObj.bounceIndex} rowNum = {i} startingIndexes = {startingIndexes} lettersEntered = {stateObj.lettersEntered} word = {stateObj.question[i][1]}/>)}
            <Keyboard answerArray = {answerArray} answerLength = {answerLength} setter = {setStateObj}/>
        </> : <h1>YOU WIN</h1>}
    </div>
    </>
        
  )
}

export default Game