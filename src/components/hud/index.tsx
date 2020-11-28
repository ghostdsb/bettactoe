import React, { useContext, useState } from 'react';
import { NameContext } from '../../context';
import BetController from '../bet-controller';
import PlayerHud from '../player-hud';
import "./style.css"

type THud = {
    canBet: boolean,
    setBetAmount: (amount: number)=> void,
    isOpponentVisible: boolean,
    opponentData: {bet: number, balance: number},
    playerData: {bet: number, balance: number},
    betController: (val: number) => void
}

const HUD:React.FC<THud> = ({canBet, setBetAmount, isOpponentVisible, opponentData, playerData, betController}) => {
    const playerNames = useContext(NameContext)
    return (
        <div className="hud">
            <PlayerHud balance={playerData.balance} bet={playerData.bet} name={playerNames.playerName}/>
            <BetController canBet={canBet} onClick={(val:number) => betController(val) }/>
            <PlayerHud balance={opponentData.balance} bet={opponentData.bet} lid={!isOpponentVisible} name={playerNames.opponentName}/>
        </div>
    );
};

export default HUD;