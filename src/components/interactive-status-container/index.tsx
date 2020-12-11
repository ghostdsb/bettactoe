import React, { ChangeEvent, useState } from 'react';
import { NOTICE_BOARD_STATUS, MESSAGE_TYPE } from '../../enums';
import "./style.css"
import lang from "../../lang.json"

type TInteractiveStatusContainer = {
    boardType: NOTICE_BOARD_STATUS,
    message: MESSAGE_TYPE,
    handlePlaceBetValueInput: (event: ChangeEvent<HTMLInputElement>) => void
    placeBet: () => void
    canClick: boolean
}

const InteractiveStatusContainer:React.FC<TInteractiveStatusContainer> = (props) => {
    const {boardType, message, canClick, handlePlaceBetValueInput, placeBet} = props
    let inputBoardStyle = {width: "212px", display: "block"}
    let noticeBoardStyle = {width: "0px", display: "none"}
    let btnStyle = {width: "50px", display: "block"}
    let btnColorStyle = canClick?{backgroundColor: "rgb(255, 211, 105)"}:{backgroundColor: "#8395a7"}
    let btnText = boardType===NOTICE_BOARD_STATUS.GAMEOVER?"GO":"BET"
    if(boardType===NOTICE_BOARD_STATUS.BETTING){
        inputBoardStyle = {width: "212px", display: "block"}
        noticeBoardStyle = {width: "0px", display: "none"}
        btnStyle = {width: "50px", display: "block"}
    }else if(boardType===NOTICE_BOARD_STATUS.NOTICE){
        inputBoardStyle = {width: "0px", display: "none"}
        noticeBoardStyle = {width: "262px", display: "flex"}
        btnStyle = {width: "0px", display: "none"}
    }else if(boardType===NOTICE_BOARD_STATUS.GAMEOVER){
        inputBoardStyle = {width: "0px", display: "none"}
        noticeBoardStyle = {width: "212px", display: "flex"}
        btnStyle = {width: "50px", display: "block"}
    }

    let msg = ""
    if(message===MESSAGE_TYPE.WAITING_FOR_OPPONENT_BET){
        msg = lang.en.waiting_for_op_bet
    }else if(message === MESSAGE_TYPE.YOUR_MOVE){
        msg = lang.en.move
    }else if(message === MESSAGE_TYPE.OPPONENT_MOVE){
        msg = lang.en.waiting_for_op_move
    }else if(message === MESSAGE_TYPE.YOU_WON){
        msg = lang.en.you_won
    }else if(message === MESSAGE_TYPE.YOU_LOST){
        msg = lang.en.you_lost
    }

    return (
        <div className="status-board">
            <div className="bet-input" style={inputBoardStyle}>
                <input className="bet-input" style={{width: "100%"}} placeholder={"place your bet"} type="number" id="betval" name="betval" min={0} onChange={handlePlaceBetValueInput} spellCheck="false"/>
            </div>
            <div className="notice-board" style={noticeBoardStyle}>
                <div>
                    {msg}
                </div>
            </div>
            <div className="bet-btn" style={btnStyle}>
                <button className="bet-btn" onClick={canClick?placeBet:()=>{}} style={{backgroundColor: btnColorStyle.backgroundColor, width: "100%"}}>{btnText}</button>
            </div>
        </div>
    );
};

export default InteractiveStatusContainer;