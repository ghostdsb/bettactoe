import React from 'react';
import { useLoading, Grid } from '@agney/react-loading';
import "./style.css"

type TPlayerHud = {
    balance: number,
    bet: number,
    lid?: boolean,
    name: string,
    betWon: boolean
}
const PlayerHud = (props: TPlayerHud) => {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        //@ts-ignore
        indicator: <Grid width="30"/>,
      });
    return (
        <div className="player-hud">
            <div className="player-name">
                
                {props.name}
                </div>
                    {/* <div className="wallet-container" style={{backgroundColor:"transparent"}}> */}
                    <div className="wallet-container" style={{backgroundColor: "white"}}>
                        <div className="wallet">
                            <div className="balance">
                                <div className="balance-text">
                                    BALANCE
                                </div>
                                <div className="balance-amount">
                                {props.balance}
                                </div>
                            </div>
                            <div className="bet">
                                    <div className="bet-text">
                                            BET
                                        </div>
                                        {
                                            props.lid?
                                            <div className="hud-spinner" style={{backgroundColor: "#fcbf49"}}>
                                        {/* WAITING */}
                                        <div>
                                        {indicatorEl}
                                    </div>
                                    </div>:
                                        <div className="bet-amount">
                                        {props.bet}
                                        </div>
                                        }
                            </div>
                        </div>
                    </div>
        </div>
    );
};

export default PlayerHud;