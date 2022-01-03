import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { BsWifi } from "react-icons/bs";
import './TwitchConnectCard.css';

const TwitchConnectCard = () => {
    let color = '#e74c3c';
    // if (connectionStatus === TwitchStatus.CONNECTED) {
    //     color = '#2ecc71'
    //     btnVariant = 'danger'
    //     btnText = 'Disconnnect';
    // }
    // else if (connectionStatus === TwitchStatus.CONNECTING || connectionStatus === TwitchStatus.DISCONNECTING) {
    //     color = '#7f8c8d';
    //     btnVariant = 'secondary';
    //     btnText = connectionStatus === TwitchStatus.CONNECTING ? 'Connecting' : 'Disconnecting';
    // }


    return (
        <Card>
            <Card.Body>
                <Card.Title>Twitch Connection</Card.Title>
                <Card.Body>
                    <Row>
                        <BsWifi color={color} style={{ marginRight: '10px' }}></BsWifi>
                    </Row>
                    <Row>
                        {/* <Button variant={btnVariant}onClick={changeStatusPress} disabled={connectionStatus === TwitchStatus.CONNECTING}>
                            <FaTwitch  style={{ marginRight: '10px' }}></FaTwitch>
                            {btnText}
                        </Button> */}
                    </Row>
                </Card.Body>
            </Card.Body>
        </Card>
    );
}

export default TwitchConnectCard;