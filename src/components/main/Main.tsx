import { Col, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router"
import {
    Switch,
    Route,
  } from 'react-router-dom';
import CommandCenter from "../../pages/command-center/CommandCenter";
import Dashboard from "../../pages/dashboard/Dashboard";
import Overlay from "../../pages/Overlay";
import Settings from "../../pages/Settings";
import WidgetsCenter from "../../pages/WidgetsCenter";
import Navbar from "../navbar/Navbar";
import './Main.css';

const Main = ({ location }) => {
    console.log("MAIN LOCATION", location)
    return (
        <Container fluid>
            <Row>
                {location.pathname !== '/overlay' && <Col xs lg="1"><Navbar/></Col>}
                <Col className="main-container">
                    <Switch>
                        <Route path="/commands">
                            <CommandCenter/>
                        </Route>
                        <Route path="/overlay">
                            <Overlay/>
                        </Route>
                        <Route path="/widgets">
                            <WidgetsCenter/>
                        </Route>
                        <Route path="/settings">
                            <Settings/>
                        </Route>
                        <Route path="/">
                            <Dashboard/>
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(Main);