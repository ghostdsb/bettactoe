import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Board from "../../components/board";
import CustomButton from "../../components/custom-button";
import HUD from "../../components/hud";
import MessageBoard from "../../components/message-board";
import Result from "../../components/result";
import { NameContext } from "../../context";
import { network } from "../../services/channels";
import { PLAYER_ID } from "../../services/login";
import { connectToGameChannel } from "../../services/network";

import "./style.css";

type TGameChannelData = {
	gameChannelData: {
		match_id: string;
		players: any[];
	};
	playerName: string;
};

type TGameLocation = {
	state: TGameChannelData;
};

const Game = () => {
	const history = useHistory();
	const location: TGameLocation = useLocation();

	console.log("DSB ~ file: index.tsx ~ line 32 ~ Game ~ location", location);
	if (!location.state) {
		history.push({
			pathname: "/",
		});
		// return <div></div>;
	}

	const [opponentName, setOpponentName] = useState("OPPONENT");
	const [isGameReady, setGameReady] = useState(false);
	const [canBet, setBetStatus] = useState(true);
	const [canMove, setMoveStatus] = useState(false);
	const [isOpponentVisible, setOpponentHUDVisibility] = useState(false);
	const [betAmount, setBetAmount] = useState(0);
	const [opponentData, setOpponentData] = useState({ bet: 0, balance: 100 });
	const [playerData, setPlayerData] = useState({ bet: 0, balance: 100 });
	const [board, setBoard] = useState(["0","0","0","0","0","0","0","0","0",]);
	const [isGameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState("");
    const [isWaiting, setWaiting] = useState(true)
    const [playerState, setPlayerState] = useState("")

	useEffect(() => {
		if (location.state) {
			network.gameChannel = connectToGameChannel(
				location.state.gameChannelData,
				location.state.playerName
			);
			network.gameChannel.join().receive("ok", (resp) => {
				console.log("Joined game channel", resp);
			});

			network.gameChannel.on("start_game_event", (message) => {
				console.log("On start_game_event", message);
				if (message.gamestate.player_1.id === PLAYER_ID) {
					setOpponentName(message.gamestate.player_2.name);
				} else {
					setOpponentName(message.gamestate.player_1.name);
				}
				setPlayerState("betState")
				setGameReady(true);
			});

			network.gameChannel.on("bet_res", (message) => {
				console.log("bet_res", message);
				if (message.p1.id === PLAYER_ID) {
					setOpponentData({
						bet: message.p2.bet,
						balance: message.p2.balance,
					});
					setPlayerData({
						bet: message.p1.bet,
						balance: message.p1.balance,
					});
				} else {
					setOpponentData({
						bet: message.p1.bet,
						balance: message.p1.balance,
					});
					setPlayerData({
						bet: message.p2.bet,
						balance: message.p2.balance,
					});
				}
				
				if (message.turn.id === "continue") {
					let newBoard = message.board.map((val: any) => String(val));
					setWaiting(false)
					setBoard(newBoard);
					setBetStatus(true);
					setMoveStatus(false);
					setOpponentHUDVisibility(false);
				} else {
					if (message.turn.id === PLAYER_ID) {
						setMoveStatus(true);
						console.log("YOU CAN MOVE");
						setPlayerState("moveState")
					} else {
						setMoveStatus(false);
						console.log("YOU CAN NOT MOVE");
						setPlayerState("moveWaitState")
					}

					setOpponentHUDVisibility(true);
					setBetStatus(false);
				}
			});

			network.gameChannel.on("move_res", (message) => {
				let newBoard = message.board.map((val: any) => String(val));
				if (message.p1.id === PLAYER_ID) {
					setOpponentData({
						bet: message.p2.bet,
						balance: message.p2.balance,
					});
					setPlayerData({ bet: 0, balance: message.p1.balance });
				} else {
					setOpponentData({
						bet: message.p1.bet,
						balance: message.p1.balance,
					});
					setPlayerData({ bet: 0, balance: message.p2.balance });
				}
				setPlayerState("betState")
                setWaiting(false)
				setBoard(newBoard);
				setBetStatus(true);
				setMoveStatus(false);
				setOpponentHUDVisibility(false);
			});

			network.gameChannel.on("game_res", (message) => {
				console.log("game_res", message);
				setWinner(message.winner);
				setPlayerState("gameoverState")
				let newBoard = message.board.map((val: any) => String(val));
                setWaiting(false)
                setBoard(newBoard);
				setBetStatus(false);
				setMoveStatus(false);
				setGameOver(true);
			});
		}
	}, []);

	const goHome = () => {
		history.push({
			pathname: "/",
		});
	};

	const placeBet = () => {
		if (!canBet) return;
		console.log(betAmount);
		setPlayerState("betWaitState")
        setWaiting(true)
		setBetStatus(false);
		setMoveStatus(false);
		network.gameChannel?.push("bet", {
			betdata: { playerId: PLAYER_ID, bet: betAmount },
		});
	};

	const handleBetController = (val: number) => {
		let newBet = Math.max(
			0,
			Math.min(playerData.balance, playerData.bet + val)
			);
		// let newBalance = Math.max(
		// 	0,
		// 	Math.min(playerData.balance, playerData.balance - val)
		// );
		let newBalance = playerData.balance-val
		// setBalanceA(newBalance)
		// setBetA(newBet)
		if(newBalance>0 && newBalance<playerData.balance){
			setPlayerData({ bet: newBet, balance: newBalance });
			setBetAmount(newBet);
		}else{
			newBalance = Math.min(playerData.balance, newBalance)
			newBalance = Math.max(0, newBalance)
		}
	};

	return (
		<div className="game">
			{!isGameReady && <div className="waiting">WAITING...</div>}
			{isGameReady && (
				<div className="start-game">
					<NameContext.Provider
						value={{
							playerName: location.state.playerName,
							opponentName: opponentName,
						}}
					>
						<HUD
							canBet={canBet}
                            betWon={canMove}
                            isWaiting={isWaiting}
							setBetAmount={setBetAmount}
							isOpponentVisible={isOpponentVisible}
							opponentData={opponentData}
							playerData={playerData}
							betController={(val: number) =>
								handleBetController(val)
							}
						/>
					<div
						className="bet-confirm"
						style={{ opacity: canBet ? 1 : 0 }}
						>
						<div style={{ width: "30%" }}>
							<CustomButton
								onClick={placeBet}
								text="CONFIRM"
								backgroundColor={"#ffd369"}
								/>
						</div> 
					</div>
					<Board canMove={canMove} board={board} />
					<MessageBoard playerState={playerState} winner={winner} onClick={goHome}/>
					</NameContext.Provider>
				</div>
			)}
		</div>
	);
};

export default Game;
