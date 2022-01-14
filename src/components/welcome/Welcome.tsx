import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useSocketSubscribe } from '../../providers/websockets';

import './Welcome.css';

const ALERT_VARIATIONS = [
    'videos/ALERT (Ganyu Variation).webm',
    'videos/ALERT (Keqing Variation).webm',
    'videos/ALERT (Barbara Variation).webm'
]

const Welcome : React.FC = () => {
    const [ alertVariation, setAlertVariation ] = useState(ALERT_VARIATIONS[Math.floor(Math.random() * 3)]);
    const [ isPlaying, setPlaying ] = useState(false);
    const [ eventName, setEventName ] = useState("");
    const [ eventDetail, setEventDetail ] = useState("");

    useSocketSubscribe('message', (msgEvent) => {
        console.log("Welcome - on message event", msgEvent);
        const msg = JSON.parse(msgEvent.data);
        console.log('Welcome - Message from server: ', msg);

        let { event, data } = msg;
        if ( !event ) {
            return;
        }

        let { type } = event;
        if ( type === "FirstWord" ) {
            console.log("FirstWord", data);
            setEventName(`WELCOME TO THE STREAM!`);
            setEventDetail(`${data.name}`)
            setPlaying(true);
        } else {
            setEventName(`WELCOME TO THE STREAM!`);
            setPlaying(true);
        }
        setAlertVariation(ALERT_VARIATIONS[Math.floor(Math.random() * 3)]);
    });

    let handleEnded = () => {
        console.log('onEnded')
        setPlaying(false);
    }

    let txtContainer = (
        <div className='text-container'>
            { eventName.length > 0 ? (<div className='title'>{eventName}</div>) : null }
            { eventDetail.length > 0 ? (<div className='detail'>{eventDetail}</div>) : null }
        </div>
    );

    // let txtContainer = (
    //     <div className='text-container'>
    //         <div className='title'>TEST TITLE</div>
    //         <div className='detail'>TEST DETAIL</div>
    //     </div>
    // );

    return (
        <div className='welcome-container'>
            <ReactPlayer className='image-container' playing={isPlaying} url={alertVariation} width='100%' height='100%'
                onEnded={handleEnded}></ReactPlayer>
            {isPlaying ? txtContainer : null}
        </div>
    );
}

export default Welcome;