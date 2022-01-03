import { Dispatch } from "redux";
// import DBService from "../db/DBService";
// import { TwitchStatus } from "../services/TwitchChatService";

export interface Action {
    type: ACTIONS,
    payload: any
}

export enum ACTIONS {
    GET_COMMANDS,
    CHANGE_TWITCH_STATUS
}

export function getCommands() {
    return (dispatch : Dispatch) => {
        // DBService.getInstance().getCommands().then((commands) => {
        //     dispatch({
        //         type: ACTIONS.GET_COMMANDS,
        //         payload: commands
        //     });
        // });
    }
}

// export function changeTwitchStatus(status : TwitchStatus) {
//     return {
//         type: ACTIONS.CHANGE_TWITCH_STATUS,
//         payload: status
//     }
// }