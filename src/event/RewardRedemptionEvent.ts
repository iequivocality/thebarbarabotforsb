export interface Reward {
    id : number
    title : string
    cost : number
    prompt : string
}

export default interface RewardRedemptionEvent {
    id : number
    broadcasterUserId: string
    broadcasterUserLogin: string
    broadcasterUserName: string
    userId: string
    userLogin: string
    userName: string
    userInput: string
    status: string
    reward: Reward;
    redeemedAt: Date
}