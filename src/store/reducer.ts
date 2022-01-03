import Command from "../models/Command";
import ConnectionSettings from "../models/ConnectionSettings";
import WidgetSetting from "../models/WidgetSetting";
// import { TwitchStatus } from "../services/TwitchChatService";
import { Action, ACTIONS } from "./actions";

export interface RootState {
    commands : Array<Command>,
    widgetSettings : Array<WidgetSetting>,
    connectionSettings : ConnectionSettings,
}

const INITIAL_STATE : RootState = {
    commands : [],
    widgetSettings: [],
    connectionSettings : {
        status : null
    }
}

const reducer = (state : RootState = INITIAL_STATE, action : Action) => {
    switch(action.type) {
        case ACTIONS.GET_COMMANDS:
            return {...state, commands : action.payload}
        case ACTIONS.CHANGE_TWITCH_STATUS:
            return {...state, connectionSettings : {...state.connectionSettings, status: action.payload}}
        default:
            return state;
    }
}
export default reducer;