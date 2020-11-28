import React, { useState } from "react";
import MenuButton from "../menu-button";
import "./style.css";

type TMenuButtonContainer = {
	onSubmit: () => void;
	handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	roomName: string;
	handleModeChange: (gameMode: string) => void;
};

const MenuButtonContainer: React.FC<TMenuButtonContainer> = (props) => {
    const [index, toggleIndex] = useState(0);
    
	const setGameMode = (idx: number, mode: string) => {
    console.log("DSB ~ file: index.tsx ~ line 16 ~ setGameMode ~ mode", mode);
		props.handleModeChange(mode);
		toggleIndex(idx);
	};

	return (
		<div className="menu-button-container">
			<div style={{ width: "262px" }}>
				<div onClick={() => setGameMode(1, "create")}>
					<MenuButton
						onClick={props.onSubmit}
						text={"CREATE ROOM"}
						animate
						shouldResetWidth={index !== 1}
						handleOnChange={props.handleOnChange}
						roomName={props.roomName}
					/>
				</div>
				<div onClick={() => setGameMode(2, "join")}>
					<MenuButton
						onClick={props.onSubmit}
						text={"JOIN ROOM"}
						animate
						shouldResetWidth={index !== 2}
						handleOnChange={props.handleOnChange}
						roomName={props.roomName}
					/>
				</div>
				<div onClick={() => setGameMode(3, "default")}>
					<MenuButton
						onClick={props.onSubmit}
						text={"RANDOM"}
						shouldResetWidth={index !== 3}
						handleOnChange={props.handleOnChange}
                        roomName={props.roomName}
                        confirm
					/>
				</div>
			</div>
		</div>
	);
};

export default MenuButtonContainer;
