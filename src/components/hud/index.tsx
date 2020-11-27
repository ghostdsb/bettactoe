import React, { useState } from 'react';
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
    // const [balanceA, setBalanceA] = useState(playerData.balance)
    // const [betA, setBetA] = useState(playerData.bet)

    // const handleBetController = (val:number) => {
    //     let newBalance = Math.max(0,Math.min(playerData.balance,balanceA-val))
    //     let newBet = Math.max(0,Math.min(playerData.balance,betA+val))
    //     setBalanceA(newBalance)
    //     setBetA(newBet)
    //     setBetAmount(newBet)
    // }

    return (
        <div className="hud">
            <PlayerHud balance={playerData.balance} bet={playerData.bet}/>
            <BetController canBet={canBet} onClick={(val:number) => betController(val) }/>
            <PlayerHud balance={opponentData.balance} bet={opponentData.bet} lid={!isOpponentVisible}/>
        </div>
    );
};

export default HUD;