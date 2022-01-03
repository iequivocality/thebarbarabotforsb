import React, { useCallback, useEffect, useRef, useState } from 'react';
import Sound from 'react-sound';
import anime from 'animejs';
import CHARACTER_DATA, { Character } from './TeamRandomizerCharacters';

import './TeamRandomizer.css';
import NotificationService from '../../../services/NotificationService';
import TeamCard from './TeamCard';
import Util from '../../../util/Util';
import TwitchNotificationType from '../../../models/TwitchNotificationType';
import _ from 'lodash';

const NO_CHARACTERS = [ 'albedo', 'eula', 'ganyu', 'kazuha', 'klee', 'kokomi', 'mona', 'tartaglia', 'venti', 'xiao', 'yoimiya' ];

const socket = new WebSocket('ws://localhost:8081');

const TeamRandomizer = () => {
    let [ sender, setSender ] = useState('');
    // let [ broadcaster, setBroadcaster ] = useState('');
    let [ selectedCharacters, setSelectedCharacters ] = useState([]);
    let [ show, setShow ] = useState(false);
    let [ playing, setPlaying ] = useState(false);
    let [ looped, setLooped ] = useState(true);

    let filteredCharacters = useRef(CHARACTER_DATA.filter(char => {
        return !NO_CHARACTERS.includes(char.name);
    }));

    useEffect(() => {
        socket.onopen = function (event) {
            console.log("connected to SB socket");
        };

        socket.onmessage = function (msgEvent) {
            console.log("on message event", msgEvent);
            const msg = JSON.parse(msgEvent.data);
	        console.log('Message from server: ', msg);
            let { type, payload } = msg;
            let { userName, reward, broadcasterUserName } = payload;
            if (type !== TwitchNotificationType.CHANNEL_POINT_REDEEM || reward.title !== "Genshin Roulette" ) {
                return;
            }

            setSender(userName);
            // setBroadcaster(broadcasterUserName);
            // //show container
            setShow(true);
            setLooped(true);
            setPlaying(true);
            setSelectedCharacters([]);
        }
    });

    useEffect(() => {
        if (show) {
            anime({targets: '.team-randomizer-container', scale : 1, easing: 'easeOutElastic(1, .6)', delay: 500});
        }
    }, [show])

    let sendResults = (characters : string[]) => {
        if (characters.length === 4) {
            socket.send(JSON.stringify({
                request: "RunAction",
                data: {
                    name: "Send Message to Twitch",
                    text: `I'll be playing ${characters.map((c) => _.capitalize(c)).join(', ')} for the rest of the stream!`
                }
            }));

            anime({
                targets: '.team-randomizer-container', 
                scale : 0, 
                easing: 'easeInElastic(1, .6)', 
                delay: 500,
                complete: () => {
                    setSelectedCharacters([]);
                    setShow(false);
                    setLooped(false);
                }
            });
            // console.log("sendResults", characters)
            // fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/randomizeteam`, {
            //     method: 'POST',
            //     headers: Util.getHeaders(),
            //     body: JSON.stringify({
            //         "sender" : sender,
            //         "characters" : characters
            //     })
            // }).then((response) => {
            //     console.log('send randomized team success');
            //     anime({
            //         targets: '.team-randomizer-container', 
            //         scale : 0, 
            //         easing: 'easeInElastic(1, .6)', 
            //         delay: 500,
            //         complete: () => {
            //             setSelectedCharacters([]);
            //             setShow(false);
            //         }
            //     });
                
            // }).catch((err) => {
            //     console.log('send randomized team success', err);
            // });
            setTimeout(() => {
                anime({targets: '.team-randomizer-container', scale : 0, easing: 'easeOutElastic(1, .6)'});
                setSelectedCharacters([]);
                //hide the container here
            }, 3000);
        }
    };

    let finalizeCharacter = (character : Character, isFourthSlot : boolean) => {
        let newSelected = [...selectedCharacters, character.name];
        console.log("randomizer finalize", newSelected)
        if (isFourthSlot) {
            //send to server
            setLooped(false);
            sendResults(newSelected);
            // setSelectedCharacters([])
        } else {
            setSelectedCharacters(newSelected);
        }
    }

    let onFinishedPlaying = () => {
        console.log("onFinishedPlaying")
        setPlaying(false);
    }

    // console.log("randomizer rerender", excludedCharacters)


    return (
        <div className={show ? "team-randomizer-background" : "team-randomizer-background-hidden"}>
            {
                show ? (
                    <div className="team-randomizer-container">
                        {/* <div className="title">
                            {sender} chooses {broadcaster}'s Genshin team for the day
                        </div> */}
                        <div className="team-randomizer">
                            <TeamCard shuffleTime={3598} characterList={filteredCharacters.current} selectedCharacters={selectedCharacters} finalizeCharacter={finalizeCharacter}></TeamCard>
                            <TeamCard shuffleTime={4598 + 3598} characterList={filteredCharacters.current} selectedCharacters={selectedCharacters} finalizeCharacter={finalizeCharacter}></TeamCard>
                            <TeamCard shuffleTime={(4598 * 2) + 3598} characterList={filteredCharacters.current} selectedCharacters={selectedCharacters} finalizeCharacter={finalizeCharacter}></TeamCard>
                            <TeamCard shuffleTime={(4598 * 3) + 3598} characterList={filteredCharacters.current} selectedCharacters={selectedCharacters} finalizeCharacter={finalizeCharacter} isFourthSlot></TeamCard>
                        </div>
                        <div className="credits">
                            Images owned by Mihoyo
                        </div>
                    </div>
                ) : null
            }
            {
                <Sound url={`${process.env.PUBLIC_URL}/sounds/itembox sound effect.mp3`} loop={looped} playStatus={playing ? "PLAYING" : "STOPPED"} onFinishedPlaying={onFinishedPlaying}></Sound>
            }
        </div>
    );
}

export default TeamRandomizer;