import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLoading, Bars } from "@agney/react-loading";

import InputPlayername from "../../components/input-playername";
import Logo from "../../components/logo";
import MenuButtonContainer from "../../components/menu-button-container";
import { PLAYER_ID } from "../../services/login";
import {
	connectToGameLobbyChannel,
	connectToMatchmakerChannel,
	TMatchData,
} from "../../services/network";

import "./style.css";
import CustomButton from "../../components/custom-button";
import { Channel } from "phoenix";
import { network } from "../../services/channels";

const Menu = () => {
	const history = useHistory();
	const [gameMode, setGameMode] = useState("");
	const [roomName, setRoomName] = useState("");
	const [searching, setSearching] = useState(false);
	const [playerCount, setPlayerCount] = useState(2);
	const [name, setName] = useState(localStorage.getItem("btt-name") || String(PLAYER_ID));
	const [matchmakerChannel, setMatchmakerChannel] = useState<Channel>();
	const [lobbyChannel, setLobbyChannel] = useState<Channel>();
	const [onlineCount, setOnlineCount] = useState(0);
	let players:{ [index: string]: any } = {}
	const [playersList, setPlayersList] = useState<string[]>([])
	useEffect(()=>{
		let lobby = connectToGameLobbyChannel()
		lobby.join().receive("ok", (resp) => {
			console.log("Joined Lobby", resp);
			return "ok";
		});
		
		lobby.on("presence_game_state", (message) => {
			// console.log("ONLINE", message);
			let onlinePlayers = Object.keys(message)
			for(let i=0;i<onlinePlayers.length;i++){
				players[onlinePlayers[i]] = 1
				setPlayersList(Object.keys(players))
			}
		});
		lobby.on("presence_diff", (message) => {
			// console.log("DIFF", message);
			let joinees = Object.keys(message.joins)
			let leftees = Object.keys(message.leaves)

			for(let i=0; i<joinees.length;i++){
				if(players[joinees[i]]){

				}else{
					players[joinees[i]] = 1
				}
			}

			for(let i=0; i<leftees.length;i++){
				if(players[leftees[i]]){
					let key = leftees[i]
                    // console.log("DSB ~ file: index.tsx ~ line 59 ~ lobby.on ~ key", key);
					delete players[key]
				}else{
				}
			}
			setPlayersList(Object.keys(players))
			console.log("DSB ~ file: index.tsx ~ line 62 ~ lobby.on ~ Object.keys(players)", Object.keys(players));
			// console.log("ONLINE COUNT:", onlineCount)
		});
		lobby.on("presence_state", (message) => {
			console.log("STATE", message);
		});
		setLobbyChannel(lobby)
	},[])

	const { containerProps, indicatorEl } = useLoading({
		loading: true,
		//@ts-ignore
		indicator: <Bars width="20" />,
	});

	const goToGame = (gameChannelData: any) => {
		history.push({
			pathname: "/game",
			state: { gameChannelData, playerName: name },
		});
	};

	const onSetGameMode = (mode?: string) => {
		setRoomName("");
		setPlayerCount(2);
		setGameMode(mode ? mode : "default");
	};

	const handleRoomNameChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void = (e) => {
		e.preventDefault();
		setRoomName(e.target.value);
	};

	const handlePlayerNameChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void = (e) => {
		setName(e.target.value);
		localStorage.setItem("btt-name", e.target.value);
	};

	const onCancelMatchmaking = () => {
		matchmakerChannel?.leave()
		setSearching(false);
	}

	const requestStartGame = () => {
		let gameData: TMatchData = {
			roomName,
			playerCount,
			gameMode: gameMode || "default",
		};

		if (gameData.gameMode !== "default" && !roomName) {
			return;
		}

		setSearching(true);

		let matchmakerChannel = connectToMatchmakerChannel(gameData);
		matchmakerChannel.join().receive("ok", (resp) => {
			console.log("Joined matchmaker", resp);
			return "ok";
		});

		matchmakerChannel.on("match_maker_event", (message) => {
			console.log("On match maker event", message);
			matchmakerChannel.leave();
			goToGame(message);
		});
		setMatchmakerChannel(matchmakerChannel)
	};

	return (
		<div className="menu">
			
			<Logo backgroundColor={"#ffd369"} foregroundColor={"#393e46"} />

			<InputPlayername
				value={name}
				handleChange={handlePlayerNameChange}
			/>
			{searching ? (
				<div className="searching">
					<div className="searching-text">
						SEARCHING
						{/* <div>{indicatorEl}</div> */}
						<div className="loading"></div>
						{/* <div>{indicatorEl}</div> */}
					</div>
					<div
					className="btn-component" style={{width: "100%"}}>
					<CustomButton
						text={"CANCEL MATCHMAKING"}

						onClick={onCancelMatchmaking}
						backgroundColor={"#fefefe"}
					/>
					</div>
				</div>
			) : (
				<div>
					<div className="online-count">
						<span className="logged-in">●</span>
						<div className="online-txt">
							online {playersList.length}
						</div>
					</div>	
					<MenuButtonContainer
						onSubmit={requestStartGame}
						handleModeChange={onSetGameMode}
						roomName={roomName}
						handleOnChange={handleRoomNameChange}
					/>
				</div>
			)}
		</div>
	);
};

export default Menu;
