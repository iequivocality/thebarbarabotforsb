import _ from 'lodash';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
// import WidgetsService from '../../services/WidgetsService';
import SetlistSettings from '../setlist/SetlistSettings';
import SetlistSongInput from './SetlistSongInput';

interface SetlistTabProps {
    widgetSetting : SetlistSettings
}

const SetlistTab = (props : SetlistTabProps) => {
    let { widgetSetting } = props;
    let {top, left, zIndex, visible, name, songs} = widgetSetting;

    let [visibilityChange, setVisibilityChange] = useState(visible ? "visible" : "invisible");
    let [topChange, setTopChange] = useState(top);
    let [leftChange, setLeftChange] = useState(left);
    let [zIndexChange, setZIndexChange] = useState(zIndex);
    let [songsChange, setChangeSongs] = useState(songs ? songs : []);

    let reset = () => {
        setVisibilityChange(visible ? "visible" : "invisible");
        setTopChange(top);
        setLeftChange(left);
        setZIndexChange(zIndex);
        setChangeSongs(songs);
    }

    let save = () => {
        // WidgetsService.getInstance().updateWidget<SetlistSettings>({
        //     ...widgetSetting,
        //     top: topChange,
        //     left: leftChange,
        //     zIndex: zIndexChange,
        //     visible: visibilityChange === "visible",
        //     songs : songsChange
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

    let onChangeSongs = (songName : string, songId : number) => {
        let updatedSongs = songsChange.map((song) => {
            return song.id === songId ? { ...song, name : songName } : song
        });
        setChangeSongs(updatedSongs);
    }

    let onDeleteSongs = (songId : number) => {
        let updatedSongs = songsChange.filter((s) => s.id !== songId);
        setChangeSongs(updatedSongs);
    }

    let onAddSong = () => {
        let updatedSongs = songsChange.map((song) => {
            return { ...song, visible : true }
        });
        updatedSongs.push({ id : new Date().getTime(), name : "New song here", visible : false });
        setChangeSongs(updatedSongs);
    }

    let onToggleSong = (songId : number, visible : boolean) => {
        let updatedSongs = songsChange.map((song) => {
            return song.id === songId ? { ...song, visible } : song
        });
        setChangeSongs(updatedSongs);
    }

    let onClearSongs = () => {
        setChangeSongs([]);
    }

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
                <Form.Check
                    type={'switch'}
                    id={`${name}-visible`}
                    label={`Visible`}
                    value={visibilityChange}
                    checked={visibilityChange === "visible"}
                    onChange={(e) => { setVisibilityChange(visibilityChange === "visible" ? "invisible" : "visible") }}
                />
                <SetlistSongInput 
                    songs={songsChange} 
                    onChange={onChangeSongs}
                    onDelete={onDeleteSongs}
                    onAddedSong={onAddSong}
                    toggleVisibility={onToggleSong}
                    onClearSongs={onClearSongs}
                ></SetlistSongInput>
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

export default SetlistTab;