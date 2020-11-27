import { Channel } from 'phoenix';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PLAYER_ID } from '../../services/login';
import { connectToGameChannel, connectToMatchmakerChannel, TMatchData } from '../../services/network';

import "./style.css"

const Menu = () => {
    const history = useHistory();
    const [gameMode, setGameMode] = useState("")
    const [roomName, setRoomName] = useState("")
    const [playerCount, setPlayerCount] = useState(2)

    const goToGame = ( gameChannelData: any) => {
		history.push({
			pathname: "/game",
			state: {gameChannelData},
		});
	};

    const onSetGameMode = (mode: string) => {
        setRoomName("")
        setPlayerCount(2)
        setGameMode(mode)
    }

    const handleRoomNameChange:((event: React.ChangeEvent<HTMLInputElement>) => void) = (e) => {
        setRoomName(e.target.value)
    }
    
    const handlePlayerCountChange:((event: React.ChangeEvent<HTMLInputElement>) => void) = (e) => {
        let playerCount = parseInt(e.target.value) || 2
        setPlayerCount(Math.max(2,playerCount))
    }
    
    const onFormSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) = (e) => {
        e.preventDefault()

        let gameData: TMatchData = {
            roomName, 
            playerCount,
            gameMode
        }

        let matchmakerChannel = connectToMatchmakerChannel(gameData)
        matchmakerChannel.join()
        .receive("ok", resp => {console.log("Joined matchmaker", resp); return "ok"})

        matchmakerChannel.on("match_maker_event", (message) => {
            console.log("On match maker event", message);
            matchmakerChannel.leave()
            goToGame(message)

            // gameChannel = connectToGameChannel(message)
            // gameChannel.join()
            // .receive("ok", resp => {console.log("Joined matchmaker", resp)})
        });
        console.log(gameData)
    }

    return (
        <div className="menu" >
            <div className="title">
                Menu
            </div>
            <div className="player-id">
                PLAYER ID: {PLAYER_ID}
            </div>
            <div className="button-container">
                <button className="btn-mode" onClick={() => onSetGameMode("create")}>CREATE ROOM</button>
                <button className="btn-mode" onClick={() => onSetGameMode("join")}>JOIN ROOM</button>
                <button className="btn-mode" onClick={() => onSetGameMode("default")}>RANDOM</button>
            </div>
            <div className="mode-input-container">
                {
                    gameMode==="create" && 
                    <form onSubmit={onFormSubmit}>
                        <label>
                        Room name:
                        <input type="text" placeholder="Enter room name" value={roomName} onChange={handleRoomNameChange} />
                        </label>
                        <label>
                        Player count:
                        <input type="text" placeholder="Enter number" value={playerCount} onChange={handlePlayerCountChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                }
                {
                    gameMode==="join" && 
                    <form onSubmit={onFormSubmit}>
                        <label>
                        Room name:
                        <input type="text" placeholder="Enter room name" value={roomName} onChange={handleRoomNameChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                }
                {
                    gameMode==="default" && 
                    <form onSubmit={onFormSubmit}>
                        <label>
                        Room name:
                        <input type="text" placeholder="Optional" value={roomName} onChange={handleRoomNameChange} />
                        </label>
                        <label>
                        Player count:
                        <input type="text" placeholder="Enter number" value={playerCount} onChange={handlePlayerCountChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                }
            </div>
        </div>
    );
};

export default Menu;