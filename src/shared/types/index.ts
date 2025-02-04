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

export interface IBaseMassage extends ISender {
  type: string;
  idMessage: string;
  timestamp: number;
  typeMessage: EMessageType;
}

export interface ITextMessage extends IBaseMassage {
  textMessage: "Привет";
}
