import React, { ChangeEvent } from 'react';
import _ from 'lodash';
import { Button, Col, Form, FormControl, InputGroup } from 'react-bootstrap';
import SetlistSong from '../setlist/SetlistSong';

interface SetlistSongInputProps {
    songs : SetlistSong[];
    onChange : (songName : string, songId : number) => void;
    onDelete : (songId : number) => void;
    onAddedSong : () => void;
    onClearSongs : () => void;
    toggleVisibility : (songId : number, visible : boolean) => void;
}

const SetlistSongInput = (props : SetlistSongInputProps) => {
    let { songs, onChange, onDelete, onAddedSong, toggleVisibility, onClearSongs } = props;
    let songChanged = (e : ChangeEvent<any>, id : number) => {
        onChange(e.target.value, id);
    }

    return (
        <Form.Group>
            <Form.Label>Songs</Form.Label>
            {
                songs.map((song) => {
                    return (
                        <Form.Row key={song.id}>
                            <InputGroup className="mb-3" key={song.id}>
                                <InputGroup.Prepend>
                                    <InputGroup.Checkbox aria-label="Checkbox for visibility"
                                        value={song.visible ? "visible" : "invisible"}
                                        checked={song.visible}
                                        onChange={() => { toggleVisibility(song.id, song.visible ? false : true) }}/>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Song"
                                    aria-label="Song"
                                    value={song.name}
                                    onChange={_.throttle((e) => { songChanged(e, song.id) }, 500)}
                                />
                                <InputGroup.Append>
                                <Button variant="danger" onClick={() => { onDelete(song.id) }}> x </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Row>
                        
                    );
                })
            }
            <Form.Row>
                <Col>
                    <Button block variant="primary" onClick={_.throttle(onAddedSong, 500)}>
                        Add 
                    </Button>
                </Col>
                <Col>
                    { songs.length > 0 && (<Button block variant="primary" onClick={onClearSongs}>
                        Clear 
                    </Button>)}
                </Col>
            </Form.Row>
            
            
        </Form.Group>
    );
}

export default SetlistSongInput;