import React from 'react';
import CustomButton from '../custom-button';
import "./style.css"

type TBetController = {
    onClick: (val:number)=> void,
    canBet: boolean
}

const BetController = (props: TBetController) => {
    
    const fireBetUp = () => {
        if(!props.canBet) return
        props.onClick(1)
    }

    const fireBetDown = () => {
        if(!props.canBet) return
        props.onClick(-1)
    }
    
    return (
        <div className="bet-controller" style={{opacity: props.canBet?1:0}}>
            <div className="up" onClick={fireBetUp}>
                <CustomButton text={"↑"} onClick={fireBetUp}/>
            </div>
            <div className="down" onClick={fireBetDown}>
                <CustomButton text={"↓"} onClick={fireBetDown}/>
            </div>
        </div>
    );
};

export default BetController;