import React, {useEffect, useState} from 'react'
import './letter.css'
import {motion, useAnimationControls} from 'framer-motion'

const questions = [
  [
    ["There are 52", "cards"],
    ["in a", "deck"],
  ],
  
  [
    ["There are 7", "days"],
    ["in a", "week"]
  ],

  [
    ["There are 24", "hours"],
    ["in a", "day"]
  ],
  [
    ["", ""],
    ["", ""]
  ]
]

const Letter = (props) => {


    const [ind, setInd] = useState(0)
    const controls = useAnimationControls()

    function Bounce(props) {
            controls.start({scale:[1,1.1,1]})
    }
    function Won(props) {
        controls.start({y:[0,-20, 0], backgroundColor: ["rgb(240, 240, 240)", "rgb(177, 240, 173)", "rgb(240, 240, 240)"], ease: "linear", transition: {duration: 0.3, delay: (props.order * 0.1)}})
}

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    useEffect(() => {
      if (props.aniIndex === 0) {
        controls.start({backgroundColor: ['rgb(250,250,250)', 'rgb(252, 83, 97)', 'rgb(252, 83, 97)', 'rgb(252, 83, 97)','rgb(252, 83, 97)', 'rgb(252, 83, 97)', 'rgb(250,250,250)'], x: [0, -30, 30, -30, 30, -30, 0], transition: {duration: 0.7}})
        sleep(10000).then(props.setter(prev => (
          {
          lettersEntered: [],
          bounceIndex: 0,
          won: false,
          aniIndex: 1,
          question: prev.question,
          qIndex: prev.qIndex,
          showStats: prev.showStats
      })))
      } 
      if (props.won) {
        controls.start({y:[0,-10, 0], backgroundColor: ["rgb(240, 240, 240)", "rgb(177, 240, 173)", "rgb(240, 240, 240)"], transition: {duration: 1, delay: (props.order * 0.1)}})
        setInd(prev => prev + 1)
        props.setter(prev => (
          {
          lettersEntered: [],
          bounceIndex: 0,
          won: false,
          aniIndex: 1,
          question: questions[ind + 1],
          qIndex: prev.qIndex + 1,
          showStats: (ind + 1 === 3 ? true : prev.showStats)
        }))

      }
      if (props.bounceMe && !props.won) {
        Bounce()
      }

    }, [Bounce, Won, props, props.bounceMe, props.qNum, props.won, props.order, props.next, controls, sleep])
    

        

  return (
    <motion.div animate = {controls} transition={{ ease: "easeOut", duration: 0.2 }} className="letter_box">
        <h1 style = {props.num === 0 && props.char === "" ? {color: 'lightgrey'} : {color: 'black'}}>{ props.num === 0 && props.char === "" ? props.correct.toUpperCase() : props.char.toUpperCase() }</h1>
    </motion.div>
  )
}

export default Letter