import React from 'react';
import Square from '../square';
import "./style.css"

type TBoard = {
    canMove: boolean,
    board: string[],
}


const Board:React.FC<TBoard> = ({canMove, board}) => {
    let values = []
    for(let i=1; i <= 9; i++){
        values.push(i)
    }    
    return (
        <div className="board">
            {values.map(value => 
                <Square value={board[value-1]} key={value} pos={value} canMove={canMove}/>
            )}
        </div>
    );
};

export default Board;