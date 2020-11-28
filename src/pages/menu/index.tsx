import { Channel } from "phoenix";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLoading, Grid } from '@agney/react-loading';

import CustomButton from "../../components/custom-button";
import InputPlayername from "../../components/input-playername";
import Logo from "../../components/logo";
import MenuButton from "../../components/menu-button";
import MenuButtonContainer from "../../components/menu-button-container";
import { PLAYER_ID } from "../../services/login";
import {
	connectToGameChannel,
	connectToMatchmakerChannel,
	TMatchData,
} from "../../services/network";

import "./style.css";

const Menu = () => {
	const history = useHistory();
	const [gameMode, setGameMode] = useState("");
	const [roomName, setRoomName] = useState("");
	const [playerCount, setPlayerCount] = useState(2);
    const [name, setName] = useState(String(PLAYER_ID));
    
    const [searching, setSearching] = useState(false)

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        //@ts-ignore
        indicator: <Grid width="50"/>,
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
		console.log("GAME MODE ", mode ? mode : "default");
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
		console.log(e.target.value);
		setName(e.target.value);
	};

	const requestStartGame = () => {

            
        let gameData: TMatchData = {
            roomName,
            playerCount,
            gameMode: gameMode||"default",
        };
        
        if(gameData.gameMode !== "default" && !roomName){
            return
        }
        
        setSearching(true)

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
	};

	return (
		<div className="menu">
			<Logo backgroundColor={"#ffd369"} foregroundColor={"#393e46"} />

			<InputPlayername
				value={name}
				handleChange={handlePlayerNameChange}
			/>
            {
                searching?
                <div className="searching">
                    <div>
                        {indicatorEl}
                    </div>
                    {/* SEARCHING... */}
                </div>:
                <MenuButtonContainer
                    onSubmit={requestStartGame}
                    // onSubmit={()=>{}}
                    handleModeChange={onSetGameMode}
                    roomName={roomName}
                    handleOnChange={handleRoomNameChange}
                />
            }
		</div>
	);
};

export default Menu;
