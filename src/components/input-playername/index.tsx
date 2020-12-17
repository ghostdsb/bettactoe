import React, { ChangeEvent } from 'react';
import "./style.css"

type TInputPlayername = {
    value: string,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputPlayername:React.FC<TInputPlayername> = (props) => {
    return (
        <div className="input-playername">
            <label className="name-label" htmlFor="fname">name</label>
            <input className="pname-input-field" placeholder={"your name"} type="text" id="fname" name="fname" value={props.value} onChange={props.handleChange} spellCheck="false"/>
        </div>
    );
};

export default InputPlayername;