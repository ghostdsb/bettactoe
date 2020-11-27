import { Channel, Socket } from "phoenix";
import { GAME_NAME, PLAYER_ID } from "./login";

export type TMatchmakerChannelOptions = {
    playerCount: number,
    roomName: string,
    matchId: string,
    gameMode: string
}

export type TMatchData = {
    playerCount: number,
    roomName: string,
    gameMode: string
}

console.log("connecting to btt server ....")
// const socket: Socket = new Socket("ws://localhost:4000/socket", {
const socket: Socket = new Socket("wss://still-plains-97814.herokuapp.com/socket", {
    params: { playerId: PLAYER_ID },
});
socket.connect();

// const channel: Channel = socket.channel("room:home", {});

const connectToMatchmakerChannel = (gameData: TMatchData) => {
    let matchmakerChannelName: string = "";
    let maxPlayer = gameData.playerCount;
    let matchId:string = ""
    let gameName: string = GAME_NAME
    switch (gameData.gameMode){
        case "default":
          if (gameData.roomName) {
            matchmakerChannelName = `garuda_matchmaker:${gameData.roomName}:${gameName}:${maxPlayer}` ;
            matchId = gameData.roomName;
          } else {
            matchmakerChannelName = `garuda_matchmaker:${gameName}:${maxPlayer}` ;
            matchId = "";
          }
          break
        case "create":
          matchmakerChannelName = `garuda_matchmaker:${gameData.roomName}:${gameName}:createjoin` ;
          matchId = gameData.roomName;
          break
        case "join":
          matchmakerChannelName = `garuda_matchmaker:${gameData.roomName}:${gameName}:createjoin` ;
          matchId = gameData.roomName;
          maxPlayer = -1
          break
        default:
          break
  
      }
    let matchData: TMatchmakerChannelOptions = {
        roomName: matchmakerChannelName, 
        playerCount: maxPlayer,
        matchId: gameData.roomName,
        gameMode: gameData.gameMode
    }

    let channel = socket.channel(matchmakerChannelName, {
        player_count: matchData.playerCount,
        room_name: matchData.roomName,
        match_id: matchData.matchId,
        mode: matchData.gameMode
    });
    return channel
}

const connectToGameChannel = (matchmakerChannelMessage: any) => {
    let matchId = matchmakerChannelMessage["match_id"];
    let gameName = GAME_NAME
    let gameChannel = socket.channel(`${gameName}:${matchId}`);
    return gameChannel
}

export { socket, connectToMatchmakerChannel, connectToGameChannel } 