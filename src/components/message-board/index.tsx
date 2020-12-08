import React, { useContext } from 'react';
import { NameContext } from '../../context';
import { messageType } from '../../enums';
import { PLAYER_ID } from '../../services/login';
import CustomButton from '../custom-button';
import "./style.css"

type TMessageBoard = {
    playerState: string, 
    winner: string,
    onClick: () => void
}

const MessageBoard:React.FC<TMessageBoard> = ({playerState, winner, onClick}) => {
    let message = "" 
    const userNamesContext = useContext(NameContext)
    let boardMessageType: messageType = messageType.NONE
    const isGameover = !!winner
    if(playerState==="betState"){
        boardMessageType = messageType.PLACE_BET
    }else if(playerState==="betWaitState"){
        boardMessageType = messageType.WAITING_FOR_OPPONENT_BET
    }else if(playerState==="moveState"){
        boardMessageType = messageType.YOUR_MOVE
    }else if(playerState==="moveWaitState"){
        boardMessageType = messageType.OPPONENT_MOVE
    }
    else if(winner!==""){
        if(winner===PLAYER_ID){
            boardMessageType = messageType.YOU_WON
        }else{
            boardMessageType = messageType.YOU_LOST
        }
    }
    
    switch(boardMessageType){
        case messageType.PLACE_BET:
            message = "PLACE YOU BET"
            break
        case messageType.WAITING_FOR_OPPONENT_BET:
            message = `WAITING FOR ${(userNamesContext.opponentName).toLocaleUpperCase()}'s BET`
            break
        case messageType.YOUR_MOVE:
            message = `YOU WON THE BET! MAKE YOUR MOVE`
            break
        case messageType.OPPONENT_MOVE:
            message = `WAIT FOR ${(userNamesContext.opponentName).toLocaleUpperCase()}'s MOVE`
            break
        case messageType.YOU_WON:
            message = `CONGRATULATIONS! YOU WON`
            break
        case messageType.YOU_LOST:
            message = `YOU LOST`
            break
            
    }
    return (
        <div className="message-board">
            <div className="message-board-text" style={{backgroundColor: "#fcbf49", width: isGameover?"200px":"300px"}}>
                <div>{message}</div>
            </div>
            <div className="message-button" style={{backgroundColor: "#eae2b7", width: isGameover?"100px":"0px"}} onClick={onClick}>
                {
                    isGameover &&
                    <div>AGAIN?</div>
                }
            </div>
        </div>
    );
};

export default MessageBoard;