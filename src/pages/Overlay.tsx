import React, { useEffect } from 'react';
import DrownInBits from '../components/drown-in-bits/DrownInBits';
import TeamRandomizer from '../components/genshin/team-randomizer/TeamRandomizer';
// import Setlist from '../components/setlist/Setlist';
import Shoutout from '../components/shoutout/Shoutout';
import Welcome from '../components/welcome/Welcome';
import { useQuery } from '../hooks';
import SocketProvider from '../providers/websockets';
import NotificationService from '../services/NotificationService';
import './Overlay.css';

const Overlay = () => {
    let query = useQuery();
    let connectionType = query.get('type');

    // useEffect(() => {
    //     NotificationService.getInstance().connect(connectionType).catch((err) => {});

    //     return () => {
    //         NotificationService.getInstance().disconnect();
    //     }
    // }, []);

    return (
        <SocketProvider>
            <div className={"overlay"}>
                {/* <Setlist/> */}
                <Shoutout/>
                {/* <DrownInBits/> */}
                <TeamRandomizer></TeamRandomizer>
                <Welcome></Welcome>
            </div>
        </SocketProvider>
    );
}
export default Overlay;