export class DuplicateChatMessage extends Error {
    constructor() {
        super('Duplicate chat message');
    }
}