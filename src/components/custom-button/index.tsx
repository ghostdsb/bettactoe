import React, { FormEvent } from "react";
import "./style.css";

type TCustomButton = {
    text: string;
    onClick: () => void;
};

const CustomButton: React.FC<TCustomButton> = (props) => {
    return (
        <div className="custom-button">
            <button className="btn" onClick={props.onClick}>
                {props.text}{" "}
            </button>
        </div>
    );
};

export default CustomButton;
