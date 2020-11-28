import React from 'react';
import "./style.css"

type TLogo = {
    backgroundColor: string,
    foregroundColor: string
}

const Logo:React.FC<TLogo> = (props) => {
    return (
        <div className="logo">
            <div className="background" style={{backgroundColor: props.backgroundColor}}>
                <div className="foreground"  style={{color: props.foregroundColor}}>
                    <div className="logo-square top left">B</div>
                    <div className="logo-square top c">E</div>
                    <div className="logo-square top right">T</div>

                    <div className="logo-square m left">T</div>
                    <div className="logo-square m c">A</div>
                    <div className="logo-square m right">C</div>

                    <div className="logo-square bottom left">T</div>
                    <div className="logo-square bottom c">O</div>
                    <div className="logo-square bottom right">E</div>
                </div>

            </div>

        </div>
    );
};

export default Logo;