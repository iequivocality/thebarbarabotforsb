import { forwardRef, Ref, useCallback, useEffect, useRef, useState } from "react";
import { useInterval } from "../../../hooks";
import { Character } from "./TeamRandomizerCharacters";

export interface TeamCardProps {
    finalizeCharacter : (character : Character, isFourthSlot : boolean) => void,
    shuffleTime : number,
    characterList : Character[],
    selectedCharacters : string[],
    isFourthSlot? : boolean
}

export interface TeamCardType {
    resetTimer : () => void
}

const TeamCard = (props : TeamCardProps, ref : Ref<TeamCardType>) => {
    let [qualified, setQualified] = useState(props.characterList.filter(c => !props.selectedCharacters.includes(c.name)));
    let [selected, setSelected] = useState(qualified[Math.floor(Math.random() * qualified.length)].name);
    let [stopped, setStopped] = useState(false);
    // let [remainingTime, setRemainingTime] = useState(props.shuffleTime);
    let remainingTime = useRef(props.shuffleTime);
    let { selectedCharacters, characterList, finalizeCharacter, isFourthSlot } = props;

    const resetTimer = () => {
        remainingTime.current = props.shuffleTime;
        setStopped(false);
    };

    let tick = () => {
        if (remainingTime.current > 0) {
            // props.finalizeCharacter(qualified[index]);
            remainingTime.current = remainingTime.current - 100;
            setSelected(qualified[Math.floor(Math.random() * qualified.length)].name);
        } else {
            setStopped(true);
        }
    };

    useEffect(() => {
        setQualified(characterList.filter(c => !selectedCharacters.includes(c.name)));
        if (selectedCharacters.length === 0) {
            resetTimer();
        }
    }, [selectedCharacters]);

    useEffect(() => {
        if (stopped) {
            finalizeCharacter(characterList.find(c => c.name === selected), isFourthSlot);
        }
    }, [stopped]);

    useInterval(() => {
        tick();
    }, stopped ? null : 100);

    let selectedCharacter = selected.length > 0 ? props.characterList.find(c => c.name === selected) : null;

    return (
        <div className="team-card" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/genshin/background.png'})` }}>
            {
                selected.length > 0 ?
                <img src={process.env.PUBLIC_URL + selectedCharacter.imageLink} alt=""></img>
                : null
            }
            
        </div>
    );
}

export default forwardRef(TeamCard);

