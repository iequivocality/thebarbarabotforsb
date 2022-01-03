import Constants from "./Constants";

export type RAW_VALUE = 'text';
export type ESCAPED_VALUE = 'name';
export type UNESCAPED_VALUE = '&';
export type SECTION = '#';
export type INVERTED = '^';
export type COMMENT = '!';
export type PARTIAL = '>';
export type EQUAL = '=';

export type TemplateSpanType = RAW_VALUE | ESCAPED_VALUE | SECTION | UNESCAPED_VALUE | INVERTED | COMMENT | PARTIAL | EQUAL;

export type TemplateSpans = Array<
    | [TemplateSpanType, string, number, number]
    | [TemplateSpanType, string, number, number, TemplateSpans, number]
    | [TemplateSpanType, string, number, number, string, number, boolean]
>;

export default class TemplateConstants {
    public static ADD_COMMAND = Constants.COMMAND_PREFIX + 'addcommand';
}