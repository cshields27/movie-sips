import React from "react"

export default function GameRules(props) {
    return (
      <div className="game-rules">
        <h2 className="game-rules-heading">Let's Play!</h2>
        
        <p className="game-rules-label">Take a sip...</p>
        <div>
            {props.rules.sip.map((rule, index) => (
                <p key={index} className="game-rules-text">
                {rule}
                </p>
            ))}
        </div>

        <p className="game-rules-label">Take a shot...</p>
        <div>
            {props.rules.shot.map((rule, index) => (
                <p key={index} className="game-rules-text">
                {rule}
                </p>
            ))}
        </div>

        <p className="game-rules-label">Finish your drink...</p>
        <div>
            {props.rules.finish.map((rule, index) => (
                <p key={index} className="game-rules-text">
                {rule}
                </p>
            ))}
        </div>
    
      </div>
    )
}