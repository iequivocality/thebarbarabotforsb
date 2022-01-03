import { io, Socket } from "socket.io-client";

export enum NotificationServiceTopics {
    GENERAL = 'GENERAL',
    OVERLAY = 'OVERLAY',
    REGISTER_TOKEN = 'REGISTER_TOKEN'
}

export type NotificationListener = (event : string, payload : any) => void;
export interface NotificationListenerItem {
    id : number,
    name : string,
    listener : NotificationListener
}

export interface MessageEvent {
    type : string,
    event : any
}

export default class NotificationService {
    private static instance : NotificationService;

    private messageToken : string;

    private notificationListeners : NotificationListenerItem[];

    private socket : Socket;

    public static getInstance() {
        return this.instance || (this.instance = new this());
    }

    constructor() {
        this.messageToken = '';
        this.notificationListeners = [];
    }

    connect(connectionType : string) {
        console.log('notif connect', `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/verify/${process.env.REACT_APP_TEMPORARY_UID}`);
        return new Promise<void>((resolve, reject) => {
            fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/verify/${process.env.REACT_APP_TEMPORARY_UID}`, {
                method: 'GET'
            })
            .then((response) => response.json())
            .then((data) => {

                this.socket = io(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`, { reconnection: true, rejectUnauthorized: false, auth: {
                    uid : process.env.REACT_APP_TEMPORARY_UID,
                    connectionType : connectionType ? connectionType : 'test'
                }});

                this.socket.on('connection', () => {
                    console.log(`I'm connected with the back-end`);
                });

                this.socket.on('notification', (message : MessageEvent) => {
                    console.log("notification received", message);
                    this.fireNotificationListeners(message.type, message.event);
                });

                console.log("token response", data);
                resolve();
    
            }).catch((err) => {
                console.log("token err", err);
                reject(err);
            });
        });
    }

    sendMessage(type: string, event: any) {
        this.fireNotificationListeners(type, event);
    }

    disconnect() {
        return new Promise<void>((resolve, reject) => {
            if (this.socket && this.socket.connected) {
                this.socket.disconnect();
            }
        });
    }

    fireNotificationListeners(eventType : string, payload : any) {
        this.notificationListeners.forEach((nl) => {
            nl.listener(eventType, payload);
        })
    }

    getToken() {
        return this.messageToken;
    }

    public addNotificationListener(name : string, listener : NotificationListener) : () => void {
        const id = new Date().getTime();
        const dupCheck = this.notificationListeners.find(item => item.id === id);
        if (dupCheck === undefined) {
            const notifListenerItem : NotificationListenerItem = {id, name, listener};
            this.notificationListeners.push(notifListenerItem);
            const removeListener = () => {
                this.notificationListeners.forEach((item , index) => {
                    if (item.id === id ) {
                        this.notificationListeners.splice(index, 1);
                    }
                });
            }
            return removeListener;
        }
        else {
            return this.addNotificationListener(name, listener);
        }
    }
}