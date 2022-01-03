export class DuplicateCommand extends Error {
    constructor() {
        super('Duplicate bot command');
    }
}