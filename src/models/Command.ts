import UserLevel from "./UserLevel";

export default interface Command {
    createdBy: string
    createdOn: number
    enabled: boolean
    globalCooldown: number
    minimumLevel: UserLevel
    name: string
    response: string
    userCooldown: number

    onCooldown: boolean
    globalIntervalId: number
}

