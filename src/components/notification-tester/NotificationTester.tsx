import React, { useState } from 'react';
import _ from 'lodash';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Util from '../../util/Util';
import NotificationService from '../../services/NotificationService';
import { ConnectionType } from '../../util/Constants';

const CheerTester = () => {
    let [cheers, setCheers] = useState(1);

    let handleCheer = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/testevent`, {
            method: 'POST',
            headers: Util.getHeaders(),
            body: JSON.stringify({
                type: 'cheer',
                connectionType: ConnectionType.TEST,
                event: {
                    "is_anonymous": false,
                    "user_id": "1234",
                    "user_login": "cool_user",
                    "user_name": "Cool_User",
                    "broadcaster_user_id": "1337",
                    "broadcaster_user_login": "cooler_user",
                    "broadcaster_user_name": "Cooler_User",
                    "message": "pogchamp",
                    "bits": cheers
                }
            })
        }).then((response) => {
            console.log('test bits success');
        }).catch((err) => {
            console.log('test bits error', err);
        });
    }

    return (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                Cheer
            </Form.Label>
            <Col sm={5}>
                <Form.Control type="number" value={cheers} onChange={_.throttle((e) => { setCheers(parseInt(e.target.value)) }, 500)}/>
            </Col>
            <Col sm={5}>
                <Button block onClick={() => { handleCheer() }}>Cheer</Button>
            </Col>
        </Form.Group>
    );
}

const ShoutoutTester = () => {
    let [shoutoutUser, setShoutoutUser] = useState('ambidere');

    let handleShoutout = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/testevent`, {
            method: 'POST',
            headers: Util.getHeaders(),
            body: JSON.stringify({
                type: 'shoutout',
                connectionType: ConnectionType.TEST,
                event: {
                    user: 'ambidere',
                    game: {
                        id: '513181',
                        name: 'Genshin Impact',
                        box_art_url: 'https://static-cdn.jtvnw.net/ttv-boxart/Genshin%20Impact-{width}x{height}.jpg'
                    },
                    clip: {
                        id: 'AnnoyingDeliciousScallionFreakinStinkin-9CmQ1Zph9YVQ4sgL',
                        url: 'https://clips.twitch.tv/AnnoyingDeliciousScallionFreakinStinkin-9CmQ1Zph9YVQ4sgL',
                        embed_url: 'https://clips.twitch.tv/embed?clip=AnnoyingDeliciousScallionFreakinStinkin-9CmQ1Zph9YVQ4sgL',
                        broadcaster_id: '171369294',
                        broadcaster_name: 'ambidere',
                        creator_id: '90310823',
                        creator_name: 'clarkieeBoy',
                        video_id: '',
                        game_id: '27471',
                        language: 'en',
                        title: 'RIP Ambi Axe',
                        view_count: 203,
                        created_at: '2021-02-26T04:44:01Z',
                        thumbnail_url: 'https://clips-media-assets2.twitch.tv/40759374493-offset-8154-preview-480x272.jpg',
                        duration: 29
                    },
                    channel: 'https://www.twitch.tv/ambidere'
                }
            })
        }).then((response) => {
            console.log('test shoutout success');
        }).catch((err) => {
            console.log('test shoutout error', err);
        });
    }

    return (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                SO
            </Form.Label>
            <Col sm={5}>
                <Form.Control type="text" value={shoutoutUser} onChange={_.throttle((e) => { setShoutoutUser(e.target.value) }, 500)}/>
            </Col>
            <Col sm={5}>
                <Button block onClick={() => { handleShoutout() }}>Shoutout</Button>
            </Col>
        </Form.Group>
    );
}

const NotificationTester = () => {

    let handleRandomizeMyTeam = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/testevent`, {
            method: 'POST',
            headers: Util.getHeaders(),
            body: JSON.stringify({
                type: 'RewardRedemption',
                connectionType: ConnectionType.TEST,
                event: {
                    "id": "1234",
                    "broadcaster_user_id": "1337",
                    "broadcaster_user_login": "ambidere",
                    "broadcaster_user_name": "ambidere",
                    "user_id": "9001",
                    "user_login": "test_user",
                    "user_name": "test_user",
                    "user_input": "pogchamp",
                    "status": "unfulfilled",
                    "title": "Randomize my Team",
                    "redeemed_at": "2020-07-15T17:16:03.17106713Z"
                }
            })
        }).then((response) => {
            console.log('test shoutout success');
        }).catch((err) => {
            console.log('test shoutout error', err);
        });
    }

    return (
        <Container>
            <Form>
                <CheerTester/>
                <ShoutoutTester/>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={12}>
                        <Button block onClick={() => { handleRandomizeMyTeam() }}>Randomize My Team</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default NotificationTester;