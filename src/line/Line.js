import React from 'react'
import Letter from '../letter/Letter'
import './line.css'
const Line = (props) => {
  return (
    <>
        <div className="word_line">
            <div className="hint">
                <h1>{props.hint}</h1>
            </div>
            <div className="ans">
                {props.word.split('').map((letter, i) => <Letter num = {i} correct = {letter} setter = {props.setter} aniIndex = {props.aniIndex} won = {props.won} bounceMe = {i + 1 + props.startingIndexes[props.rowNum] === props.bounceIndex} order = {i + props.startingIndexes[props.rowNum]} char = { props.startingIndexes[props.rowNum] + i < props.lettersEntered.length ? props.lettersEntered[i + props.startingIndexes[props.rowNum]] : ""}/>)}

            </div>

        </div>
        
    </>
  )
}

export default Line