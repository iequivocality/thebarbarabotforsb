import Command from "./Command"

export default interface Timer {
    name: string,
    command: string,
    attachedCommand : Command,
    channel : string,
    interval: number,
    minimumChatLines: number,
    timeout : number,
    createdBy : string,
    createdOn : number
}