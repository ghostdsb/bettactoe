import React from 'react';
import { network } from '../../services/channels';
import "./style.css"

type TSquare = {
    sign: string,
    index: number,
    canMove: boolean
    backgroundColor: string
}

const Square:React.FC<TSquare> = (props) => {
    const {sign, index, canMove, backgroundColor} = props
    
    const sendMove = () => {
        canMove && network.gameChannel?.push("move",{movedata: { pos: index}})
    }
    return (
        <div className="square" onClick={sendMove} style={{backgroundColor: backgroundColor}}>
            <div className="sign">
            {sign!=="0"?sign:""}
            </div>
        </div>
    );
};

export default Square;