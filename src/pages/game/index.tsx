import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Board from "../../components/board";
import CustomButton from "../../components/custom-button";
import HUD from "../../components/hud";
import InteractiveStatusContainer from "../../components/interactive-status-container";
import { NameContext } from "../../context";
import { GAMESTATE, NOTICE_BOARD_STATUS, MESSAGE_TYPE } from "../../enums";
import { network } from "../../services/channels";
import { GAME_NAME, PLAYER_ID } from "../../services/login";
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

	const [playerBetValue, setPlayerBetValue] = useState(0);
	const [noticeBoardStatus, setNoticeBoardStatus] = useState(
		NOTICE_BOARD_STATUS.BETTING
	);
	const [messageType, setMessageType] = useState(MESSAGE_TYPE.PLACE_BET);
	const [gameState, setGameState] = useState(GAMESTATE.BETTING);
	const [playerBalanceValue, setPlayerBalanceValue] = useState(100);
	const [canInputBet, setCanInputBet] = useState(true);
	const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

	const [opponentBetValue, setOpponentBetValue] = useState(0);
	const [opponentBalanceValue, setOpponentBalanceValue] = useState(100);
	const [opponentName, setOpponentName] = useState("");
	const [winPattern, setWinPattern] = useState([]);

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
				setBoard(message.gamestate.board);
			});

			network.gameChannel.on("bet_res", (message) => {
				console.log("bet_res", message);
				if (message.p1.id === PLAYER_ID) {
					setOpponentBalanceValue(message.p2.balance);
					setOpponentBetValue(message.p2.bet);
				} else {
					setOpponentBalanceValue(message.p1.balance);
					setOpponentBetValue(message.p1.bet);
				}

				if (message.turn.id === "continue") {
					setPlayerBetValue(0);
					setGameState(GAMESTATE.BETTING);
					setMessageType(MESSAGE_TYPE.EQUAL_BETS);
					setNoticeBoardStatus(NOTICE_BOARD_STATUS.BETTING);
				} else {
					if (message.turn.id === PLAYER_ID) {
						setGameState(GAMESTATE.MOVING);
						setMessageType(MESSAGE_TYPE.YOUR_MOVE);
					} else {
						setGameState(GAMESTATE.MOVE_WAITING);
						setMessageType(MESSAGE_TYPE.OPPONENT_MOVE);
					}
				}
			});

			network.gameChannel.on("move_res", (message) => {
				let newBoard = message.board.map((val: any) =>
					val === PLAYER_ID ? "X" : val !== 0 ? "O" : 0
				);
				setBoard(newBoard);
				setPlayerBetValue(0);
				setGameState(GAMESTATE.BETTING);
				setNoticeBoardStatus(NOTICE_BOARD_STATUS.BETTING);
				setMessageType(MESSAGE_TYPE.PLACE_BET);
				if (message.p1.id === PLAYER_ID) {
				} else {
				}
			});

			network.gameChannel.on("game_res", (message) => {
				setWinPattern(message.pattern);
				let newBoard = message.board.map((val: any) =>
					val === PLAYER_ID ? "X" : val !== 0 ? "O" : 0
				);
				setBoard(newBoard);
				setNoticeBoardStatus(NOTICE_BOARD_STATUS.GAMEOVER);
				setGameState(GAMESTATE.GAMEOVER);
				if (message.winner === PLAYER_ID) {
					setMessageType(MESSAGE_TYPE.YOU_WON);
				} else {
					setMessageType(MESSAGE_TYPE.YOU_LOST);
				}
			});
		}
	}, []);

	if (!location.state) {
		history.push({
			pathname: "/",
		});
		return <></>;
	}

	const goHome = () => {
		history.push({
			pathname: "/",
		});
	};

	const handlePlaceBetValueInput = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		event.preventDefault();
		let val = Number(event.target.value);
		console.log(val);
		let currentBalance = playerBalanceValue;
		if (val > currentBalance || val < 0) {
			setCanInputBet(false);
			return;
		}
		setCanInputBet(true);
		setPlayerBetValue(Number(val));
	};

	const placeBet = () => {
		if (gameState !== GAMESTATE.BETTING) return;
		network.gameChannel?.push("bet", {
			betdata: { playerId: PLAYER_ID, bet: playerBetValue },
		});
		setPlayerBalanceValue(playerBalanceValue - playerBetValue);
		setGameState(GAMESTATE.BET_WAITING);
		setNoticeBoardStatus(NOTICE_BOARD_STATUS.NOTICE);
		setMessageType(MESSAGE_TYPE.WAITING_FOR_OPPONENT_BET);
	};

	return (
		<div className="game">
			<div className="hud-container">
				<HUD
					name={location.state.playerName}
					bet={playerBetValue}
					balance={
						gameState === GAMESTATE.GAMEOVER
							? playerBalanceValue
							: playerBalanceValue - playerBetValue
					}
					gameState={gameState}
					style={{ backgroundColor: "#FFD369" }}
				/>
				<HUD
					name={opponentName}
					bet={
						gameState === GAMESTATE.BET_WAITING ||
						gameState === GAMESTATE.BETTING
							? "..."
							: opponentBetValue
					}
					balance={opponentBalanceValue}
					gameState={gameState}
					style={{ backgroundColor: "#FFD369" }}
				/>
			</div>
			<InteractiveStatusContainer
				boardType={noticeBoardStatus}
				canClick={canInputBet}
				message={messageType}
				handlePlaceBetValueInput={handlePlaceBetValueInput}
				placeBet={gameState === GAMESTATE.GAMEOVER ? goHome : placeBet}
			/>
			<Board
				board={board}
				winPattern={winPattern}
				canMove={gameState === GAMESTATE.MOVING}
			/>
		</div>
	);
};

export default Game;
