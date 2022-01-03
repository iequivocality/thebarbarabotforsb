import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import NotificationService from '../../services/NotificationService';
import './Shoutout.css';

const Shoutout = () => {
    let [name, setName] = useState('');
    useEffect(() => {
        let removeNotifListener = NotificationService.getInstance().addNotificationListener('shoutout', (type : string, payload : any) => {
            if (type === 'shoutout') {
                console.log('received shoutout notification');
                setName(payload.user);
                anime({
                    targets: '#shoutout',
                    scale: 1,
                    duration: 600,
                    easing: "easeInOutElastic",
                });

                setTimeout(() => {
                    anime({
                        targets: '.shoutout-title',
                        opacity: 0,
                        duration: 300,
                        easing: "easeInOutElastic"
                    });

                    anime({
                        targets: '.shoutout-text',
                        opacity: 1,
                        duration: 300,
                        easing: "easeInOutElastic"
                    });
                }, 2000);

                setTimeout(() => {
                    anime({
                        targets: '#shoutout',
                        scale: 0,
                        duration: 600,
                        easing: "easeInOutElastic",
                        complete: () => {
                            anime({
                                targets: '.shoutout-title',
                                opacity: 1,
                                duration: 600,
                                easing: "easeInOutElastic"
                            });
        
                            anime({
                                targets: '.shoutout-text',
                                opacity: 0,
                                duration: 0,
                                easing: "easeInOutElastic"
                            });
                        }
                    });
                }, 5000);
            }
        });

        return () => {
            removeNotifListener();
        }
    }, []);

    return (
        <div className={"shoutout-container"}>
            <div id={"shoutout"}>
                <div className={"shoutout-title"}>
                    Shout-out
                </div>
                <div className={"shoutout-text"}>
                    {name}
                </div>
            </div>
        </div>)
}

export default Shoutout;