import Command from "./Command";

export default interface GlobalCommand {
    command : Command,
    onCooldown: boolean
}