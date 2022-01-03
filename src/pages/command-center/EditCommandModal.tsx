import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Command from '../../models/Command';
import _ from 'lodash';

export interface EditCommandModalProps {
    visible : boolean,
    command : Command,
    onHide : () => void
}

const EditCommandModal = (props : EditCommandModalProps) => {
    let { visible, command, onHide } = props;
    // let { name, response, enabled, minimumLevel, userCooldown, globalCooldown } = command;
    let { name, response } = command;
    let [ nameEdit, setNameEdit ] = useState(name);
    let [ responseEdit, setResponseEdit ] = useState(response);

    return (
        <Modal show={visible} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {command.name} Command</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} controlId="editCommandName">
                    <Form.Label column sm={2}>Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Name" value={nameEdit} onChange={_.throttle((e) => { setNameEdit(e.target.value) }, 500)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="editCommandResponse">
                    <Form.Label column sm={2}>Response</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" type="text" placeholder="Name" value={responseEdit} onChange={_.throttle((e) => { setResponseEdit(e.target.value) }, 500)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="editCommandEnabled">
                    <Form.Label column sm={2}>Enabled</Form.Label>
                    <Col sm={10}>
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        inline
                    />
                        {/* <Form.Control as="textarea" type="text" placeholder="Name" value={responseEdit} onChange={_.throttle((e) => { setResponseEdit(e.target.value) }, 500)}/> */}
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onHide}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditCommandModal;