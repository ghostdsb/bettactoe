import React from 'react';
import "./style.css"
import lang from "../../lang.json"
import { useHistory } from 'react-router';
import Logo from '../../components/logo';

const HowToPlay = () => {
    const history = useHistory();
    const goToMenu = () => {
		history.push({
			pathname: "/",
		});
	}

    return (
        <div className="how-to-play">
            <div className="htp-btn-container">
				<button className="arrow-button title" onClick={goToMenu}>{lang.en.how_to_play} &gt;</button>
			</div>
            <div className="how-to-play-contents">
                <div className="question">Matchmaking : </div>
                <div className="answer">
                <ul>
                    <li>
                        <span>CREATE ROOM</span><br/>
                        Enter any room name and share with your friend to join.
                    </li>
                    <li>
                        <span>JOIN ROOM</span><br/>
                        Join a room that is already created by your friend.

                    </li>
                    <li>
                        <span>RANDOM ROOM</span><br/>
                        Randomly match with someone.

                    </li>
                </ul>
                
                </div>
            </div>
            <div className="how-to-play-contents">
                <div className="question">Gameplay : </div>
                <div className="answer">
                    <ul>
                        <li>
                            Both players place a bet for the turn.
                        </li>
                        <li>
                            After placing bets, the one with the highest bet gets to move.
                        </li>
                        <li>
                            In case of draw, one with lower total balance gets the chance.
                        </li>
                        <li>
                            If draw persists, betting is done again.
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    );
};

export default HowToPlay;