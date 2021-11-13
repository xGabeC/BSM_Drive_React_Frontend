import React, { useState } from "react";
import './ControlPage.css';

import KeyController from "../components/controllers/KeyController";

const ControlPage = (props) => {
    // eslint-disable-next-line
    const [controller, setController] = useState('key');

    return (
        <div className='controller'>
            {{
                'key': <KeyController socket={props.socket} />
            }[controller]}
        </div>
    )
} 


export default ControlPage;