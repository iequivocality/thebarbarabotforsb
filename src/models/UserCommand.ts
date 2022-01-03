import Command from "./Command";

export default interface UserCommand {
    user : string,
    command : Command,
    onCooldown: boolean,

    userIntervalId: NodeJS.Timeout
}