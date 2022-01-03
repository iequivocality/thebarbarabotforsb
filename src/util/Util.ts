// import crypto from 'crypto';

export default class Util {
    public static getSecondWord(str : string) {
        return this.getNTHWord(str, 1);
    }

    public static getNTHWord(str : string, nth : number) {
        let removedExcessSpaces = str.replace(/\s+/g, ' ');
        let nthWord = removedExcessSpaces.split(' ')[nth];
        return nthWord;
    }

    public static getHeaders() {
        return {
            'Barbarabot-Username-Id' : process.env.REACT_APP_TEMPORARY_UID,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}