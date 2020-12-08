import React, { FormEvent } from "react";
import "./style.css";

type TCustomButton = {
    text: string;
    onClick: () => void;
    backgroundColor?: string
};

const CustomButton: React.FC<TCustomButton> = (props) => {
    return (
        <div className="custom-button">
            <button className="btn" onClick={props.onClick} style={{backgroundColor: props.backgroundColor||"#e5e5e5"}}>
                {props.text}{" "}
            </button>
        </div>
    );
};

export default CustomButton;
