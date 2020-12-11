import React from 'react';
import { listContains } from '../../utils';
import Square from '../square';
import "./style.css"

type TBoard = {
    board: (string|number)[],
    winPattern: number[],
    canMove: boolean
}

const Board:React.FC<TBoard> = (props) => {
    const {board, winPattern, canMove} = props
    let values = []
    for(let i=1; i <= 9; i++){
        values.push(i)
    }
    return (
        <div className = "board">
            {
            values
            .map(index => <Square canMove={canMove} backgroundColor={listContains(winPattern, index-1)?"#ffeaa7":"#E5E5E5"} sign={String(board[index-1])} index={index} key={Math.random()}/>)
            }
        </div>
    );
};

export default Board;

// #E5E5E5
// #ffeaa7