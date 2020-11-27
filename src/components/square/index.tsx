import React from 'react';
import { preProcessFile } from 'typescript';
import { network } from '../../services/channels';
import { PLAYER_ID } from '../../services/login';
import "./style.css"

type TSquare = {
    value: string,
    pos: number,
    canMove: boolean,
}

const Square = (props: TSquare) => {
    const {value} = props

    const sendMove = () => {
        if(!props.canMove) return
        network.gameChannel?.push("move",{movedata: { pos: props.pos}})
    }
    return (
        <button className="square" onClick={sendMove}>
		    {value === "0" && ""}
		    {value === PLAYER_ID && "X"}
		    {value !== PLAYER_ID && value !== "0"  && "O"}

        </button>
    );
};

export default Square;