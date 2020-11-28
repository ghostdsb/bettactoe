import React from 'react';

import "./style.css"

type TPlayerHud = {
    balance: number,
    bet: number,
    lid?: boolean,
    name: string
}
const PlayerHud = (props: TPlayerHud) => {
    return (
        <div className="player-hud">
            <div className="name">{props.name}</div>
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