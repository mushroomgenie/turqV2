import React from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from "prop-types";

const GoalRing = ({currentFunding}) => {

  let barColor = 'rgba(205, 127, 50, .7)'
  if (currentFunding/100 < 100) { 
    barColor = 'rgba(205, 127, 50, .7)'
  } else if (currentFunding/100 < 200) { 
    barColor = 'rgba(192,192,192, .7)'
  } else {
    barColor = 'rgba(255,215,0, .7)'
  }


  return (
  <CircularProgressbar value={currentFunding/100} text={Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(currentFunding/100)}
  strokeWidth={14}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.5,
 
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
 
    // Text size
    textSize: '10px',
 
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,
 
    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',
 
    // Colors
    pathColor: barColor,
    textColor: 'rgba(0, 0, 0, 0.54)',
    trailColor: '#fafafa',
    backgroundColor: '#000',
  })}
  />
)}

export default GoalRing

GoalRing.propTypes = {
  currentFunding: PropTypes.number
}

GoalRing.defaultProps = {
  currentFunding: 0
}