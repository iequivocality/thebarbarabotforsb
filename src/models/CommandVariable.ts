import { TemplateSpanType } from '../util/TemplateConstants'; 

export default interface CommandVariable {
    name : string,
    type : TemplateSpanType
    subVariables : CommandVariable[]
}