import React from 'react';
import "./style.css"

type TBetController = {
    onClick: (val:number)=> void,
    canBet: boolean
}

const BetController = (props: TBetController) => {
    
    const handleBetController = (val:number) => {
        if(!props.canBet) return
        props.onClick(val)
    }
    
    return (
        <div className="bet-controller" style={{opacity: props.canBet?1:0}}>
            <div className="up" onClick={()=>handleBetController(1)}>U</div>
            <div className="down" onClick={()=>handleBetController(-1)}>D</div>
        </div>
    );
};

export default BetController;