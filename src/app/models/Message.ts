export interface Message{
    $key?:string;
    createdDate?:string;
    createdTime?:string;
    messageTo?:string;
    messageFrom?:string;
    subject?:string;
    message?:string;
    readStatus?:string;
    mDeleted?:string;
}