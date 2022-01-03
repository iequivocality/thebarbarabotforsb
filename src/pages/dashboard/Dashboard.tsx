import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import NotificationTester from '../../components/notification-tester/NotificationTester';
import TwitchConnectCard from '../../components/twitch-connect/TwitchConnectCard';

const Dashboard = () => {
    return (
        <Row>
            <Container>
                <h4 style={{marginTop: 20, marginBottom: 20}}>Dashboard</h4>
                <Row>
                    <Col>
                        <TwitchConnectCard></TwitchConnectCard>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                        <NotificationTester></NotificationTester>
                    </Col>
                </Row>
            </Container>
        </Row>
    );
}
export default Dashboard;