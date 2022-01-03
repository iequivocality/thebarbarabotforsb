import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import _ from 'lodash';
import ShoutoutSettings from '../shoutout/ShoutoutSettings';

export interface ShoutoutTabProps {
    widgetSetting : ShoutoutSettings
}

const ShoutoutTab = (props : ShoutoutTabProps) => {
    let { widgetSetting } = props;
    let {top, left, zIndex, visible, name, shoutoutName} = widgetSetting;

    let [visibilityChange, setVisibilityChange] = useState(visible ? "visible" : "invisible");
    let [topChange, setTopChange] = useState(top);
    let [leftChange, setLeftChange] = useState(left);
    let [zIndexChange, setZIndexChange] = useState(zIndex);
    let [shoutoutNameChange, setShoutoutNameChange] = useState(shoutoutName);

    let reset = () => {
        setVisibilityChange(visible ? "visible" : "invisible");
        setTopChange(top);
        setLeftChange(left);
        setZIndexChange(zIndex);
    }

    let save = () => {
        // WidgetsService.getInstance().updateWidget<ShoutoutSettings>({
        //     ...widgetSetting,
        //     top: topChange,
        //     left: leftChange,
        //     zIndex: zIndexChange,
        //     visible: visibilityChange === "visible",
        //     shoutoutName: shoutoutNameChange
        // });
    }

    let onChange = ((e : ChangeEvent<any>, stateAction : Dispatch<SetStateAction<any>>) => {
        let value = parseInt(e.target.value);
        if (_.isNaN(value)) {
            stateAction(0);
        }
        else {
            stateAction(value)
        }
    });

    let onShoutoutChange = ((e : ChangeEvent<any>) => {
        let value = e.target.value;
        setShoutoutNameChange(value)
    });

    return (
        <div>
            <Form style={{ width: 300 }}>
                <Form.Group controlId="formGroupTop">
                    <Form.Label>Top</Form.Label>
                    <Form.Control type="text" placeholder="Top" value={topChange} onChange={(e) => { onChange(e, setTopChange) }}/>
                </Form.Group>
                <Form.Group controlId="formGroupLeft">
                    <Form.Label>Left</Form.Label>
                    <Form.Control type="text" placeholder="Left" value={leftChange} onChange={(e) => { onChange(e, setLeftChange) }}/>
                </Form.Group>
                <Form.Group controlId="formGroupLeft">
                    <Form.Label>Z Index</Form.Label>
                    <Form.Control type="text" placeholder="Z Index" value={zIndexChange} onChange={(e) => { onChange(e, setZIndexChange) }}/>
                </Form.Group>
                <Form.Group controlId="formGroupLeft">
                    <Form.Label>Shoutout</Form.Label>
                    <Form.Control type="text" placeholder="Shoutout" value={shoutoutNameChange} onChange={_.throttle((e) => { onShoutoutChange(e) }, 500)}/>
                </Form.Group>
                <Form.Check
                    type={'switch'}
                    id={`${name}-visible`}
                    label={`Visible`}
                    value={visibilityChange}
                    checked={visibilityChange === "visible"}
                    onChange={(e) => { setVisibilityChange(visibilityChange === "visible" ? "invisible" : "visible") }}
                />
                <Form.Row>
                    <Col>
                        <Button block variant="primary" onClick={save}>
                            Save
                        </Button>
                    </Col>
                    <Col>
                        <Button block variant="primary" onClick={reset}>
                            Reset
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
        </div>
    );
}

export default ShoutoutTab;