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

export interface ITextMessage {
  typeMessage: string;
  textMessageData: {
    textMessage: string;
  };
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
