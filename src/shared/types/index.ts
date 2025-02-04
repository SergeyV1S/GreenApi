export interface IInstance {
  idInstance: string;
  apiTokenInstance: string;
}

export interface IMessage {
  chatId: string;
  message: string;
}

export interface ISender {
  chatId: string;
  sender: string;
  senderName: string;
  senderContactName: string;
}

export interface IIncomingMessageReceived {
  typeWebhook: string;
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
  idMessage: string;
  senderData: ISender;
  messageData: ITextMessage;
}

export enum EMessageType {
  imageMessage,
  textMessage,
  reactionMessage,
  locationMessage,
  contactMessage,
  extendedTextMessage,
  pollMessage,
  pollUpdateMessage,
  quotedMessage
}

export enum EMessageStatus {
  INCOMING = "incoming",
  OUTGOING = "outgoing"
}

export interface IBaseMassage extends ISender {
  type: EMessageStatus;
  idMessage: string;
  timestamp: number;
  typeMessage: EMessageType;
}

export interface ITextMessage extends IBaseMassage {
  textMessage: "Привет";
}

export interface IContactInfo {
  avatar: string;
  name: string;
  contactName: string;
  email: string;
  category: string;
  description: string;
  products: [];
  chatId: string;
  lastSeen: string | null;
  isArchive: boolean;
  isDisappearing: boolean;
  isMute: boolean;
  muteExpiration: number | null;
  isBusiness: boolean;
}
