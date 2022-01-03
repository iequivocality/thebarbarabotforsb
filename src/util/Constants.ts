export default class Constants {
    static RAW_VALUE = 'text';
    static ESCAPED_VALUE = 'name';
    static UNESCAPED_VALUE = '&';
    static SECTION = '#';
    static INVERTED = '^';
    static COMMENT = '!';
    static PARTIAL = '>';
    static EQUAL = '=';

    static BOT_NAMES = ['fossabot', 'nightbot', 'streamelements', 'streamlabs'];

    static COMMAND_PREFIX = '!';

    static USERNAME = 'ambidere';
}

export enum ConnectionType {
    MANAGER = 'manager',
    OVERLAY = 'overlay',
    TEST = 'test'
}