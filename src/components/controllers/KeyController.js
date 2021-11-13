import React, { useEffect } from "react";
import './KeyController.css';

const KeyController = (props) => {

    useEffect(() => {

        let keys = [];

        const sendMotorUpdate = (leftDir, leftFrontDutyCycle, leftBackDutyCycle, rightDir, rightFrontDutyCycle, rightBackDutyCycle) => {
            props.socket.emit('motorUpdate', {leftDir, leftFrontDutyCycle, leftBackDutyCycle, rightDir, rightFrontDutyCycle, rightBackDutyCycle});
        }

        const updateMotors = () => {
            if (keys.includes('w') && keys.includes('s')) {
                sendMotorUpdate(true, 0, 0, false, 0, 0);
            } else if (keys.includes('d') && keys.includes('a')) {
                sendMotorUpdate(true, 0, 0, false, 0, 0);
            } else if (keys.includes('w')) {
                sendMotorUpdate(true, 255, 255, false, 255, 255);
            } else if (keys.includes('s')) {
                sendMotorUpdate(false, 255, 255, true, 255, 255);
            } else if (keys.includes('a')) {
                sendMotorUpdate(true, 255, 255, true, 255, 255);
            } else if (keys.includes('d')) {
                sendMotorUpdate(false, 255, 255, false, 255, 255);
            }else {
                sendMotorUpdate(true, 0,  0, false, 0, 0);
            }
        }

        const keyUpHandler = (event) => {
            keys.pop(event.key);
            updateMotors();
        };

        const keyDownHandler = (event) => {
            if (!keys.includes(event.key)) {
                keys.push(event.key);
                updateMotors();
            }
        }

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);

        return () => {
            window.removeEventListener('keyup', keyUpHandler);
            window.removeEventListener('keydown', keyDownHandler);
        }

    }, [props.socket]);


    return (
        <div className='key-controller'>
            <h1>Key Control</h1>
        </div>
    )
}

export default KeyController;