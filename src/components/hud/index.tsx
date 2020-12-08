import React, { createRef, useContext, useRef, useState } from "react";
import { NameContext } from "../../context";
import BetController from "../bet-controller";
import PlayerHud from "../player-hud";
import "./style.css";

type THud = {
	canBet: boolean;
	betWon: boolean;
	setBetAmount: (amount: number) => void;
	isOpponentVisible: boolean;
	opponentData: { bet: number; balance: number };
	playerData: { bet: number; balance: number };
    betController: (val: number) => void;
    isWaiting: boolean
};

const HUD: React.FC<THud> = ({
	canBet,
	betWon,
	setBetAmount,
	isOpponentVisible,
	opponentData,
	playerData,
    betController,
    isWaiting
}) => {
	const playerNames = useContext(NameContext);
	return (
		<div className="hud">
			<PlayerHud
				balance={playerData.balance}
				bet={playerData.bet}
				name={(playerNames.playerName).substr(0,10)}
				betWon={!canBet && betWon}
			/>
			{/* <BetController
				canBet={canBet}
				onClick={(val: number) => betController(val)}
			/> */}
			<PlayerHud
				balance={opponentData.balance}
				bet={opponentData.bet}
				lid={!isOpponentVisible}
				name={(playerNames.opponentName.substr(0,9))}
				betWon={!canBet&&!betWon&&!isWaiting}
			/>
		</div>
	);
};

export default HUD;
