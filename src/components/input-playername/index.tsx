import React, { ChangeEvent } from 'react';
import "./style.css"

type TInputPlayername = {
    value: string,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputPlayername:React.FC<TInputPlayername> = (props) => {
    return (
        <div className="input-playername">
            {<input className="pname-input-field" type="text" id="fname" name="fname" value={props.value} onChange={props.handleChange}/>}
        </div>
    );
};

export default InputPlayername;