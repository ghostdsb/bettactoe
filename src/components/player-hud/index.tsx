import React from 'react';

import "./style.css"

type TPlayerHud = {
    balance: number,
    bet: number,
    lid?: boolean
}
const PlayerHud = (props: TPlayerHud) => {
    return (
        <div className="player-hud">
            {
                props.lid ? 
                <div className="waiting-lig">WAITING</div>:
                <>
                <div className="balance">{props.balance}</div>
                <div className="bet">{props.bet}</div>
                </>
            }
        </div>
    );
};

export default PlayerHud;