import { useEffect } from 'react';
import { Row, Col, Container, Table, Button } from 'react-bootstrap';
import {  BsFillPlusCircleFill } from "react-icons/bs";

const CommandCenter = () => {
    // let commandsService = useRef(CommandsService.getInstance());
    // let [ commands, setCommands ] = useState(commandsService.current.getCommands());

    // let [ commandForEdit, setCommandForEdit ] = useState(null);
    // let [ editModalVisible, setEditModalVisible ] = useState(false);

    useEffect(() => {
        // let commandsServiceCurrent = commandsService.current;
        // commandsServiceCurrent.setCommandCenterListener((commands : Command[]) => {
        //     setCommands(commands);
        // });
        // return () => { commandsServiceCurrent.clearCommandCenterListener(); }
    }, []);

    return (
        <Row>
            <Container>
                <Row>
                    <h4 style={{marginTop: 20, marginBottom: 20}}>Command Center</h4>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Response</th>
                                    <th>Enabled</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {commands.map((command) => {
                                    return (
                                        <tr key={command.name}>
                                            <td>{command.name}</td>
                                            <td>{command.response}</td>
                                            <td>{command.enabled ? <BsToggleOn/> : <BsToggleOff/>}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button variant="info" onClick={() => { clickEdit(command) }}><BsWrench/></Button>
                                                    <Button variant="danger"><BsXCircleFill/></Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    );
                                })}  */}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={4}>
                                        <Button><BsFillPlusCircleFill/> Add</Button>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    </Col>
                </Row>
            </Container>
            {/* {commandForEdit && <EditCommandModal onHide={hideEditModal} visible={editModalVisible} command={commandForEdit}/>} */}
        </Row>
    );
}
export default CommandCenter;