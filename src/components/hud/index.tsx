import React from 'react';
import { GAMESTATE } from '../../enums';
import "./style.css"

type THUD = {
    name: string,
    balance: number,
    bet: number|string,
    style: {backgroundColor: string},
    gameState: GAMESTATE
}

const HUD:React.FC<THUD> = (props) => {
    const {name, balance, bet, gameState, style} = props
    let balanceStyle = gameState === GAMESTATE.BETTING || gameState === GAMESTATE.GAMEOVER?{display: "block"}:{display: "none"}
    return (
        <div className="hud" style={style}>
            <div className="name">{name.toLocaleUpperCase()}</div>
            <div className="balance" style={balanceStyle}>BALANCE: {String(balance).padStart(3,"0")}</div>
            <div className="bet">{String(bet).padStart(2,"0")}</div>
        </div>
    );
};

export default HUD;