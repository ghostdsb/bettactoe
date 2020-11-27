import React from 'react';
import { PLAYER_ID } from '../../services/login';
import "./style.css"

type TResult = {
    winner: string
}

const Result:React.FC<TResult> = ({winner}) => {
    let resultMessage = ""
    let resultStatus = ""
    if(winner === PLAYER_ID){
        resultStatus = "won"
        resultMessage = "CONGRATULATIONS! YOU WON"
    }else{
        resultStatus = "lost"
        resultMessage = "BETTER LUCK NEXT TIME!"
    }
    return (
        <div className="result-comp">
            {resultMessage}
        </div>
    );
};

export default Result;