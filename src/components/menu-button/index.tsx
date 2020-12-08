import React, { useState } from "react";
import CustomButton from "../custom-button";
import "./style.css";

type TMenuButton = {
	text: string;
	onClick: () => void;
    animate?: boolean;
    confirm?:boolean
	shouldResetWidth: boolean;
	handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	roomName: string;
};

const MenuButton: React.FC<TMenuButton> = (props) => {
	const placeholderText: string = "Enter room name";

	return (
		<div className="menu-button">
			<div
				className="input-component"
				style={{
					width: !props.animate
						? "0%"
						: props.shouldResetWidth
						? "0%"
						: "70%",
                }}
                
			>
				<input
					className="rname-input-field"
					type="text"
					id={props.text}
					placeholder={placeholderText}
					value={props.roomName}
					onChange={props.handleOnChange}
					spellCheck="false"
                    required
				/>
			</div>
			<div
				className="btn-component"
				style={{
					width: !props.animate
						? "100%"
						: props.shouldResetWidth
						? "100%"
						: "30%",
				}}
			>
				<CustomButton
					text={
						!props.animate
							?  props.shouldResetWidth? props.text:"CONFIRM ?"
							: props.shouldResetWidth
							? props.text
							: "GO"
					}

                    onClick={ props.shouldResetWidth
							? () => {}
							: props.onClick
					}
					backgroundColor={
						props.shouldResetWidth
						? ""
						: "#ffd369"}
				/>
			</div>
		</div>
	);
};

export default MenuButton;
